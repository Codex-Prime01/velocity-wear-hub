
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background to-secondary min-h-[80vh] flex items-center">
      {/* Accent Shapes */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
      </div>

      {/* Grid overlay for the futuristic look */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 md:pr-12">
            <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4 animate-fade-in">
              NEW COLLECTION
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Future</span> Is How You Move
            </h1>
            <p className="text-lg text-foreground/80">
              Discover our cutting-edge collection of apparel and footwear designed to elevate your performance and style.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" asChild>
                <Link to="/shop">
                  Shop Collection
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/new-arrivals">
                  New Arrivals
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            {/* Hero Image */}
            <div className="aspect-[4/5] rounded-2xl overflow-hidden relative border border-border/40 shadow-xl shadow-primary/5 animate-pulse-glow">
              <img 
                src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000" 
                alt="Latest Collection" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              
              {/* Floating badges */}
              <div className="absolute bottom-6 left-6 flex items-center space-x-3">
                <div className="badge px-3 py-1 bg-primary animate-fade-in">NEW DROP</div>
                <div className="badge px-3 py-1 bg-accent animate-fade-in" style={{animationDelay: "0.2s"}}>LIMITED EDITION</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
