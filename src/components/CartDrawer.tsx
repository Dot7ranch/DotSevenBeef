import { useState, useEffect, useCallback } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, note, isLoading, isSyncing, updateQuantity, removeItem, updateNote, getCheckoutUrl, syncCart } = useCartStore();
  const [localNote, setLocalNote] = useState(note);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);

  useEffect(() => { setLocalNote(note); }, [note]);
  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, syncCart]);

  const handleNoteBlur = useCallback(() => {
    if (localNote !== note) updateNote(localNote);
  }, [localNote, note, updateNote]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
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
                <div className="flex justify-between items-center">
                  <span className="font-display text-lg uppercase tracking-wider">Total</span>
                  <span className="font-display text-xl font-bold text-barn-red">${totalPrice.toFixed(2)}</span>
                </div>
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
