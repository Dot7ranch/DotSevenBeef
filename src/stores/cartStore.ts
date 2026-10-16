import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  type ShopifyProduct,
  storefrontApiRequest,
  CART_QUERY,
  createShopifyCart,
  addLineToShopifyCart,
  updateShopifyCartLine,
  removeLineFromShopifyCart,
  updateShopifyCartNote,
  type CartCodes,
  parseCartCodes,
  updateShopifyDiscountCodes,
  addShopifyGiftCardCode,
  removeShopifyGiftCard,
} from '@/lib/shopify';
import { trackAddToCart } from '@/lib/analytics';

export interface CartItem {
  lineId: string | null;
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: { amount: string; currencyCode: string };
  quantity: number;
  selectedOptions: Array<{ name: string; value: string }>;
}

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  note: string;
  isLoading: boolean;
  isSyncing: boolean;
  addItem: (item: Omit<CartItem, 'lineId'>) => Promise<void>;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (variantId: string) => Promise<void>;
  updateNote: (note: string) => Promise<void>;
  clearCart: () => void;
  syncCart: () => Promise<void>;
  getCheckoutUrl: () => string | null;
  codes: CartCodes;
  applyCode: (code: string) => Promise<{ ok: boolean; message: string }>;
  removeDiscountCode: (code: string) => Promise<void>;
  removeGiftCard: (giftCardId: string) => Promise<void>;
}

const EMPTY_CODES: CartCodes = { discountCodes: [], giftCards: [], subtotal: null, total: null };

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      note: '',
      isLoading: false,
      isSyncing: false,
      codes: EMPTY_CODES,

      addItem: async (item) => {
        const { items, cartId, clearCart } = get();
        const existingItem = items.find(i => i.variantId === item.variantId);

        let added = false;
        set({ isLoading: true });
        try {
          if (!cartId) {
            const result = await createShopifyCart({ variantId: item.variantId, quantity: item.quantity });
            if (result) {
              set({
                cartId: result.cartId,
                checkoutUrl: result.checkoutUrl,
                items: [{ ...item, lineId: result.lineId }],
              });
              added = true;
            }
          } else if (existingItem) {
            const newQuantity = existingItem.quantity + item.quantity;
            if (!existingItem.lineId) return;
            const result = await updateShopifyCartLine(cartId, existingItem.lineId, newQuantity);
            if (result.success) {
              const currentItems = get().items;
              set({ items: currentItems.map(i => i.variantId === item.variantId ? { ...i, quantity: newQuantity } : i) });
              added = true;
            } else if (result.cartNotFound) {
              clearCart();
            }
          } else {
            const result = await addLineToShopifyCart(cartId, { variantId: item.variantId, quantity: item.quantity });
            if (result.success) {
              const currentItems = get().items;
              set({ items: [...currentItems, { ...item, lineId: result.lineId ?? null }] });
              added = true;
            } else if (result.cartNotFound) {
              clearCart();
            }
          }
        } catch (error) {
          console.error('Failed to add item:', error);
        } finally {
          set({ isLoading: false });
        }
        if (added) {
          trackAddToCart({
            productId: item.product.node.id,
            variantId: item.variantId,
            title: item.product.node.title,
            price: parseFloat(item.price.amount),
            currency: item.price.currencyCode,
            quantity: item.quantity,
          });
        }
      },

      updateQuantity: async (variantId, quantity) => {
        if (quantity <= 0) {
          await get().removeItem(variantId);
          return;
        }

        const { items, cartId, clearCart } = get();
        const item = items.find(i => i.variantId === variantId);
        if (!item?.lineId || !cartId) return;

        set({ isLoading: true });
        try {
          const result = await updateShopifyCartLine(cartId, item.lineId, quantity);
          if (result.success) {
            const currentItems = get().items;
            set({ items: currentItems.map(i => i.variantId === variantId ? { ...i, quantity } : i) });
          } else if (result.cartNotFound) {
            clearCart();
          }
        } catch (error) {
          console.error('Failed to update quantity:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      removeItem: async (variantId) => {
        const { items, cartId, clearCart } = get();
        const item = items.find(i => i.variantId === variantId);
        if (!item?.lineId || !cartId) return;

        set({ isLoading: true });
        try {
          const result = await removeLineFromShopifyCart(cartId, item.lineId);
          if (result.success) {
            const currentItems = get().items;
            const newItems = currentItems.filter(i => i.variantId !== variantId);
            newItems.length === 0 ? clearCart() : set({ items: newItems });
          } else if (result.cartNotFound) {
            clearCart();
          }
        } catch (error) {
          console.error('Failed to remove item:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      clearCart: () => set({ items: [], cartId: null, checkoutUrl: null, note: '', codes: EMPTY_CODES }),
      getCheckoutUrl: () => get().checkoutUrl,

      updateNote: async (note: string) => {
        const { cartId } = get();
        set({ note });
        if (!cartId) return;
        try {
          await updateShopifyCartNote(cartId, note);
        } catch (error) {
          console.error('Failed to update note:', error);
        }
      },

      // One box for both: try the code as a discount first, then as a gift card
      applyCode: async (rawCode) => {
        const code = rawCode.trim();
        const { cartId, codes, clearCart } = get();
        if (!code) return { ok: false, message: 'Enter a code first.' };
        if (!cartId) return { ok: false, message: 'Add something to your cart first.' };
        const sameCode = (c: string) => c.toLowerCase() === code.toLowerCase();
        if (codes.discountCodes.some(d => d.applicable && sameCode(d.code))) {
          return { ok: false, message: 'That code is already applied.' };
        }

        set({ isLoading: true });
        try {
          const current = codes.discountCodes.filter(d => d.applicable).map(d => d.code);
          const discount = await updateShopifyDiscountCodes(cartId, [...current, code]);
          if (discount.cartNotFound) {
            clearCart();
            return { ok: false, message: 'Your cart expired. Please add your items again.' };
          }
          if (discount.codes?.discountCodes.some(d => d.applicable && sameCode(d.code))) {
            set({ codes: discount.codes });
            return { ok: true, message: `Discount code ${code.toUpperCase()} applied.` };
          }
          // Not a usable discount code: take it back off the cart before trying it as a gift card
          if (discount.success) await updateShopifyDiscountCodes(cartId, current);

          const previousIds = new Set(codes.giftCards.map(g => g.id));
          const gift = await addShopifyGiftCardCode(cartId, code);
          const newCard = gift.codes?.giftCards.find(g => !previousIds.has(g.id));
          if (gift.codes) set({ codes: gift.codes });
          if (newCard) {
            return { ok: true, message: `Gift card ending in ${newCard.lastCharacters} applied.` };
          }
          return { ok: false, message: "We couldn't apply that code. Check the spelling, or make sure your cart meets the code's requirements." };
        } catch (error) {
          console.error('Failed to apply code:', error);
          return { ok: false, message: 'Something went wrong. Please try again.' };
        } finally {
          set({ isLoading: false });
        }
      },

      removeDiscountCode: async (code) => {
        const { cartId, codes, clearCart } = get();
        if (!cartId) return;
        set({ isLoading: true });
        try {
          const remaining = codes.discountCodes.filter(d => d.applicable && d.code !== code).map(d => d.code);
          const result = await updateShopifyDiscountCodes(cartId, remaining);
          if (result.codes) set({ codes: result.codes });
          else if (result.cartNotFound) clearCart();
        } catch (error) {
          console.error('Failed to remove discount code:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      removeGiftCard: async (giftCardId) => {
        const { cartId, clearCart } = get();
        if (!cartId) return;
        set({ isLoading: true });
        try {
          const result = await removeShopifyGiftCard(cartId, giftCardId);
          if (result.codes) set({ codes: result.codes });
          else if (result.cartNotFound) clearCart();
        } catch (error) {
          console.error('Failed to remove gift card:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      syncCart: async () => {
        const { cartId, isSyncing, clearCart } = get();
        if (!cartId || isSyncing) return;

        set({ isSyncing: true });
        try {
          const data = await storefrontApiRequest(CART_QUERY, { id: cartId });
          if (!data) return;
          const cart = data?.data?.cart;
          if (!cart || cart.totalQuantity === 0) clearCart();
          else set({ codes: parseCartCodes(cart) });
        } catch (error) {
          console.error('Failed to sync cart:', error);
        } finally {
          set({ isSyncing: false });
        }
      },
    }),
    {
      name: 'shopify-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items, cartId: state.cartId, checkoutUrl: state.checkoutUrl, note: state.note }),
    }
  )
);
