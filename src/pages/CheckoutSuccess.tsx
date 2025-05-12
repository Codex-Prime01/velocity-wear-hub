
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';

const CheckoutSuccess = () => {
  // Generate a random order number for demo purposes
  const orderNumber = `VEL-${Math.floor(10000 + Math.random() * 90000)}`;
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Order Confirmed - VELOCITY</title>
        <meta name="description" content="Your order has been successfully placed." />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-12">
          <div className="container max-w-3xl mx-auto px-4">
            <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-lg p-6 md:p-10">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <CheckCircle size={32} className="text-primary" />
                </div>
                
                <h1 className="text-3xl font-heading font-bold mb-3">Order Confirmed!</h1>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Thank you for your purchase. Your order has been successfully placed and is being processed.
                </p>
              </div>
              
              {/* Order Information */}
              <div className="grid gap-6 mb-10">
                <div className="rounded-lg bg-secondary/10 border border-border/40 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Order Number:</h3>
                    <span className="font-mono">{orderNumber}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Date:</h3>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="grid gap-4">
                  <div className="flex gap-4 items-start border border-border/40 rounded-lg p-4">
                    <div className="rounded-full bg-primary/20 p-2">
                      <Package size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Shipping & Tracking</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Your order will be processed within 1-2 business days. Once shipped, you will receive a confirmation email with tracking information.
                      </p>
                      <span className="text-xs font-medium bg-secondary/30 px-2 py-1 rounded-full">
                        Estimated delivery: 3-5 business days
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start border border-border/40 rounded-lg p-4">
                    <div className="rounded-full bg-primary/20 p-2">
                      <Mail size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Order Confirmation</h3>
                      <p className="text-sm text-muted-foreground">
                        A confirmation with your order details has been sent to your email address.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="w-full">
                  <Link to="/">
                    Continue Shopping
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/account/orders">
                    View Order Status
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default CheckoutSuccess;
