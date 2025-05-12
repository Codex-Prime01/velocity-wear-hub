
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import { 
  CreditCard, 
  Lock,
  ShieldCheck
} from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });
  
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address) {
      toast.error('Please fill out all required fields');
      return;
    }
    
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      setLoading(false);
      navigate('/checkout/success');
      toast.success('Your order has been placed!');
    }, 1500);
  };
  
  // Calculate totals
  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-medium mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Add some items to your cart before proceeding to checkout.</p>
          <Button onClick={() => navigate('/shop')}>Browse Products</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Checkout - VELOCITY</title>
        <meta name="description" content="Complete your purchase securely." />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-heading font-bold mb-8">Checkout</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-7 xl:col-span-8">
                <form onSubmit={handleSubmit}>
                  {/* Contact Information */}
                  <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-lg p-6 mb-6">
                    <h2 className="text-lg font-medium mb-4">Contact Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Shipping Information */}
                  <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-lg p-6 mb-6">
                    <h2 className="text-lg font-medium mb-4">Shipping Address</h2>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="address">Street Address *</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State/Province *</Label>
                          <Input
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="mt-1"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="zip">ZIP/Postal Code *</Label>
                          <Input
                            id="zip"
                            name="zip"
                            value={formData.zip}
                            onChange={handleChange}
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="country">Country *</Label>
                          <Input
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="mt-1"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Payment Information */}
                  <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-lg p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-medium">Payment Information</h2>
                      <div className="flex items-center">
                        <Lock size={14} className="mr-1" />
                        <span className="text-xs text-muted-foreground">Secure Payment</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="cardName">Name on Card *</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <div className="relative">
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            className="mt-1 pl-10"
                            required
                          />
                          <CreditCard size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cardExpiry">Expiration Date (MM/YY) *</Label>
                          <Input
                            id="cardExpiry"
                            name="cardExpiry"
                            placeholder="MM/YY"
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardCvc">Security Code (CVC) *</Label>
                          <Input
                            id="cardCvc"
                            name="cardCvc"
                            placeholder="123"
                            value={formData.cardCvc}
                            onChange={handleChange}
                            className="mt-1"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Submit Button - only visible on mobile */}
                  <div className="lg:hidden">
                    <Button className="w-full" type="submit" disabled={loading}>
                      {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                    </Button>
                  </div>
                </form>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-5 xl:col-span-4">
                <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-lg p-6 sticky top-20">
                  <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                  
                  {/* Order Items */}
                  <div className="space-y-4 max-h-80 overflow-auto mb-6">
                    {items.map((item) => (
                      <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex space-x-4">
                        <div className="h-16 w-16 bg-secondary rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={item.product.images[0]} 
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-sm line-clamp-1">{item.product.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {item.selectedSize && `Size: ${item.selectedSize}`} {item.selectedColor && `, Color: ${item.selectedColor}`}
                          </p>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs">Qty: {item.quantity}</span>
                            <span className="text-sm">${(item.product.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Order Totals */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between font-medium text-base">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {/* Submit Button - desktop */}
                  <Button className="w-full mt-6 hidden lg:block" onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Processing...' : 'Complete Order'}
                  </Button>
                  
                  {/* Security Badge */}
                  <div className="mt-6 flex items-center justify-center text-xs text-muted-foreground">
                    <ShieldCheck size={14} className="mr-1" />
                    <span>Secure checkout - Your data is protected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Checkout;
