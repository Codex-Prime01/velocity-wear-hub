
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SheetClose, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';

const CartDrawer = () => {
  const { items, removeItem, updateQuantity, getCartTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="h-full flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className="flex-1 flex flex-col items-center justify-center space-y-4 py-12">
          <div className="rounded-full bg-secondary p-3">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <h3 className="font-medium text-lg">Your cart is empty</h3>
          <p className="text-muted-foreground text-center max-w-xs">
            Looks like you haven't added anything to your cart yet.
          </p>
          <SheetClose asChild>
            <Button asChild>
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </SheetClose>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <SheetHeader>
        <SheetTitle>Your Cart ({items.length})</SheetTitle>
      </SheetHeader>
      <div className="flex-1 overflow-auto py-6">
        <div className="space-y-6">
          {items.map((item) => (
            <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex space-x-4">
              <div className="h-24 w-24 bg-secondary rounded overflow-hidden flex-shrink-0">
                <img 
                  src={item.product.images[0]} 
                  alt={item.product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <Link to={`/product/${item.product.id}`} className="font-medium hover:text-primary transition-colors">
                    {item.product.name}
                  </Link>
                  <div className="text-sm text-muted-foreground mt-1">
                    {item.selectedSize && <span>Size: {item.selectedSize} </span>}
                    {item.selectedColor && <span className="capitalize">Color: {item.selectedColor}</span>}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border border-border rounded-md">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-r-none"
                      onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-l-none"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                  <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => removeItem(item.product.id)}
              >
                <Trash2 size={18} className="text-muted-foreground hover:text-destructive transition-colors" />
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Separator />
        <div className="py-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Subtotal</span>
            <span className="font-medium">${getCartTotal().toFixed(2)}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Shipping and taxes calculated at checkout
          </p>
        </div>
        <SheetFooter className="flex-col space-y-2 sm:space-y-2">
          <SheetClose asChild>
            <Button className="w-full">
              <Link to="/checkout">Checkout</Link>
            </Button>
          </SheetClose>
          <Button variant="outline" className="w-full" onClick={clearCart}>
            Clear Cart
          </Button>
        </SheetFooter>
      </div>
    </div>
  );
};

// Missing ShoppingBag icon for empty cart state
import { ShoppingBag } from 'lucide-react';

export default CartDrawer;
