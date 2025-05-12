
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PromoBanner = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-secondary to-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Sign Up for <span className="text-primary">20% Off</span> Your First Order
            </h2>
            <p className="text-muted-foreground mb-8">
              Join our community to receive early access to new drops, exclusive offers, and performance insights.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-background/50 backdrop-blur-sm border border-border rounded-md px-4 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Email"
              />
              <Button type="submit">Subscribe</Button>
            </form>
            <p className="text-xs text-muted-foreground mt-3">
              By subscribing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
          
          {/* Image or Graphic */}
          <div className="hidden md:block relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000" 
                alt="Subscribe to newsletter" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-background/80 backdrop-blur-md border border-border/40 rounded-lg p-4 shadow-lg max-w-xs">
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-primary/20 p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Get Updates</h3>
                  <p className="text-sm text-muted-foreground">
                    Be the first to know about new releases and exclusive deals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
