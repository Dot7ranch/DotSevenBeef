import { useState, useEffect, useCallback } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2, Tag, Gift, X } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { trackInitiateCheckout } from "@/lib/analytics";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, note, codes, isLoading, isSyncing, updateQuantity, removeItem, updateNote, getCheckoutUrl, syncCart, applyCode, removeDiscountCode, removeGiftCard } = useCartStore();
  const [localNote, setLocalNote] = useState(note);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);
  const [codeInput, setCodeInput] = useState("");
  const [codeMessage, setCodeMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const appliedDiscounts = codes.discountCodes.filter(d => d.applicable);
  const hasDiscount = appliedDiscounts.length > 0 && codes.total !== null;
  const displayTotal = hasDiscount ? parseFloat(codes.total!.amount) : totalPrice;

  useEffect(() => { setLocalNote(note); }, [note]);
  // Re-sync on item changes too, so the discounted total stays current
  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, items, syncCart]);

  const handleApplyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await applyCode(codeInput);
    setCodeMessage({ ok: result.ok, text: result.message });
    if (result.ok) setCodeInput("");
  };

  const handleNoteBlur = useCallback(() => {
    if (localNote !== note) updateNote(localNote);
  }, [localNote, note, updateNote]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      trackInitiateCheckout({
        items: items.map(i => ({ productId: i.product.node.id, variantId: i.variantId, quantity: i.quantity })),
        value: totalPrice,
        currency: items[0]?.price.currencyCode ?? "USD",
      });
      window.open(checkoutUrl, '_blank');
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className="relative inline-flex items-center justify-center text-primary-foreground/80 hover:text-barn-red transition-colors"
          aria-label={`Shopping cart${totalItems > 0 ? `, ${totalItems} item${totalItems !== 1 ? 's' : ''}` : ', empty'}`}
        >
          <ShoppingCart size={20} aria-hidden="true" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-barn-red text-primary-foreground text-xs flex items-center justify-center font-body font-semibold">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full bg-cream text-charcoal">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="font-display text-2xl uppercase tracking-wider text-charcoal">Your Cart</SheetTitle>
          <SheetDescription className="font-body text-charcoal-light">
            {totalItems === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-charcoal-light mx-auto mb-4" />
                <p className="font-body text-charcoal-light">Your cart is empty</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-4 p-3 bg-cream-dark rounded-lg">
                      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-charcoal/10">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img src={item.product.node.images.edges[0].node.url} alt={item.product.node.title} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display text-sm uppercase tracking-wide truncate">{item.product.node.title}</h4>
                        {item.variantTitle !== "Default Title" && (
                          <p className="text-xs font-body text-charcoal-light">{item.selectedOptions.map(o => o.value).join(' • ')}</p>
                        )}
                        <p className="font-body font-semibold text-barn-red">${parseFloat(item.price.amount).toFixed(2)}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <button aria-label={`Remove ${item.product.node.title}`} onClick={() => removeItem(item.variantId)} className="text-charcoal-light hover:text-barn-red transition-colors">
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <div className="flex items-center gap-1">
                          <button aria-label={`Decrease quantity of ${item.product.node.title}`} onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="w-6 h-6 rounded border border-charcoal/20 flex items-center justify-center hover:bg-charcoal/10">
                            <Minus className="h-3 w-3" aria-hidden="true" />
                          </button>
                          <span className="w-8 text-center text-sm font-body" aria-label={`Quantity: ${item.quantity}`}>{item.quantity}</span>
                          <button aria-label={`Increase quantity of ${item.product.node.title}`} onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="w-6 h-6 rounded border border-charcoal/20 flex items-center justify-center hover:bg-charcoal/10">
                            <Plus className="h-3 w-3" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 space-y-4 pt-4 border-t border-charcoal/10">
                <div>
                  <label className="font-body text-sm text-charcoal-light mb-1 block">Order Notes</label>
                  <textarea
                    value={localNote}
                    onChange={(e) => setLocalNote(e.target.value)}
                    onBlur={handleNoteBlur}
                    placeholder="Special instructions, delivery notes, etc."
                    className="w-full rounded border border-charcoal/20 bg-cream px-3 py-2 font-body text-sm text-charcoal placeholder:text-charcoal-light/60 focus:outline-none focus:ring-1 focus:ring-barn-red resize-none"
                    rows={2}
                    maxLength={500}
                  />
                </div>
                <div className="rounded-lg border-2 border-dashed border-barn-red/40 bg-cream-dark p-3">
                  <label htmlFor="cart-code" className="flex items-center gap-2 font-display text-sm uppercase tracking-wider text-charcoal mb-2">
                    <Tag className="h-4 w-4 text-barn-red" aria-hidden="true" />
                    Discount Code or Gift Card
                  </label>
                  <form onSubmit={handleApplyCode} className="flex gap-2">
                    <input
                      id="cart-code"
                      value={codeInput}
                      onChange={(e) => { setCodeInput(e.target.value); setCodeMessage(null); }}
                      placeholder="Enter code"
                      autoComplete="off"
                      autoCapitalize="characters"
                      className="flex-1 min-w-0 rounded border border-charcoal/20 bg-cream px-3 py-2 font-body text-sm uppercase text-charcoal placeholder:normal-case placeholder:text-charcoal-light/60 focus:outline-none focus:ring-1 focus:ring-barn-red"
                    />
                    <button
                      type="submit"
                      disabled={!codeInput.trim() || isLoading}
                      className="rounded bg-charcoal px-4 py-2 font-body text-sm font-semibold uppercase tracking-wider text-cream hover:bg-barn-red transition-colors disabled:opacity-50"
                    >
                      Apply
                    </button>
                  </form>
                  {codeMessage && (
                    <p role="status" className={`mt-2 font-body text-xs ${codeMessage.ok ? "text-green-700" : "text-barn-red"}`}>{codeMessage.text}</p>
                  )}
                  {(appliedDiscounts.length > 0 || codes.giftCards.length > 0) && (
                    <ul className="mt-2 space-y-1">
                      {appliedDiscounts.map(d => (
                        <li key={d.code} className="flex items-center justify-between rounded bg-cream px-2 py-1 font-body text-xs">
                          <span className="flex items-center gap-1"><Tag className="h-3 w-3 text-barn-red" aria-hidden="true" />{d.code.toUpperCase()} applied</span>
                          <button aria-label={`Remove code ${d.code}`} onClick={() => removeDiscountCode(d.code)} className="text-charcoal-light hover:text-barn-red"><X className="h-3 w-3" aria-hidden="true" /></button>
                        </li>
                      ))}
                      {codes.giftCards.map(g => (
                        <li key={g.id} className="flex items-center justify-between rounded bg-cream px-2 py-1 font-body text-xs">
                          <span className="flex items-center gap-1"><Gift className="h-3 w-3 text-barn-red" aria-hidden="true" />Gift card ending in {g.lastCharacters} (${parseFloat(g.balance.amount).toFixed(2)} balance)</span>
                          <button aria-label={`Remove gift card ending in ${g.lastCharacters}`} onClick={() => removeGiftCard(g.id)} className="text-charcoal-light hover:text-barn-red"><X className="h-3 w-3" aria-hidden="true" /></button>
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className="mt-2 font-body text-xs text-charcoal-light">
                    Paying with Shop Pay, Apple Pay, PayPal, or card? Add your code here and it carries through to checkout.
                  </p>
                </div>
                {hasDiscount && (
                  <div className="flex justify-between items-center font-body text-sm text-charcoal-light">
                    <span>Subtotal</span>
                    <span className="line-through">${totalPrice.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="font-display text-lg uppercase tracking-wider">Total</span>
                  <span className="font-display text-xl font-bold text-barn-red">${displayTotal.toFixed(2)}</span>
                </div>
                {codes.giftCards.length > 0 && (
                  <p className="-mt-3 font-body text-xs text-charcoal-light text-right">Gift card balance comes off at checkout.</p>
                )}
                <button
                  onClick={handleCheckout}
                  disabled={items.length === 0 || isLoading || isSyncing}
                  className="w-full inline-flex items-center justify-center gap-2 bg-barn-red text-primary-foreground px-6 py-4 rounded font-body text-base font-semibold uppercase tracking-wider hover:bg-barn-red-dark transition-colors disabled:opacity-50"
                >
                  {isLoading || isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ExternalLink className="w-4 h-4" />Checkout</>}
                </button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
