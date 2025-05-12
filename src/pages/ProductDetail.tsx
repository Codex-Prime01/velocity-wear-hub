
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { products } from '@/data/products';
import { Heart, Minus, Plus, ShoppingBag, Star, Truck } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import { toast } from '@/components/ui/sonner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const product = products.find(p => p.id === id);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState(product?.images[0] || '');
  
  if (!product) {
    // Product not found
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center">
          <h1 className="text-2xl font-medium mb-4">Product not found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    
    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }
    
    addItem(product, quantity, selectedSize, selectedColor);
  };

  return (
    <>
      <Helmet>
        <title>{product.name} - VELOCITY</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Images */}
              <div>
                {/* Main Image */}
                <div className="aspect-square bg-secondary/20 rounded-lg overflow-hidden mb-4">
                  <img 
                    src={mainImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button 
                      key={index}
                      className={`aspect-square bg-secondary/20 rounded border-2 ${
                        mainImage === image ? 'border-primary' : 'border-transparent'
                      } overflow-hidden`}
                      onClick={() => setMainImage(image)}
                    >
                      <img 
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Product Info */}
              <div>
                {/* Product badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {product.isNew && (
                    <span className="badge">New</span>
                  )}
                  {product.isFeatured && (
                    <span className="badge bg-primary">Featured</span>
                  )}
                </div>
                
                {/* Product details */}
                <h1 className="text-3xl font-heading font-bold mb-2">{product.name}</h1>
                
                <div className="flex items-center mb-4">
                  {/* Rating */}
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        className={index < Math.floor(product.rating || 0) ? "text-yellow-500 fill-yellow-500" : "text-muted"}
                      />
                    ))}
                    <span className="ml-2 text-sm">{product.rating}</span>
                  </div>
                </div>
                
                <div className="text-2xl font-bold mb-6">${product.price.toFixed(2)}</div>
                
                <p className="text-muted-foreground mb-8">{product.description}</p>
                
                {/* Size Selection */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Size</h3>
                    <button className="text-sm text-primary">Size Guide</button>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className={`py-2 border rounded-md transition-colors ${
                          selectedSize === size 
                            ? 'bg-primary text-primary-foreground border-primary' 
                            : 'bg-card border-border hover:border-primary'
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Color Selection */}
                <div className="mb-8">
                  <h3 className="font-medium mb-2">Color</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        className={`w-10 h-10 rounded-full border-2 ${
                          selectedColor === color 
                            ? 'border-primary ring-2 ring-primary/30' 
                            : 'border-border hover:border-primary/50'
                        } transition`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                        aria-label={`Select ${color} color`}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Add to Cart */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  {/* Quantity Selector */}
                  <div className="flex border border-border rounded-md">
                    <button 
                      className="px-4 py-2 border-r border-border"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus size={18} />
                    </button>
                    <span className="flex items-center justify-center px-6">{quantity}</span>
                    <button 
                      className="px-4 py-2 border-l border-border"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <Button className="flex-1" onClick={handleAddToCart}>
                    <ShoppingBag size={18} className="mr-2" />
                    Add to Cart
                  </Button>
                  
                  {/* Wishlist Button */}
                  <Button variant="outline" size="icon">
                    <Heart size={18} />
                  </Button>
                </div>
                
                {/* Shipping Info */}
                <div className="bg-secondary/10 rounded-lg p-4 flex items-start space-x-3">
                  <Truck size={20} className="text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Free Shipping</h4>
                    <p className="text-sm text-muted-foreground">
                      Free standard shipping on orders over $100. Delivery within 3-5 business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product Tabs */}
            <div className="mt-16">
              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="p-6">
                  <div className="prose prose-invert max-w-none">
                    <p>
                      The {product.name} is crafted with premium materials for maximum durability and comfort. 
                      Designed for performance in various conditions, it features:
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li>Premium quality construction</li>
                      <li>Ergonomic design for maximum comfort</li>
                      <li>Durable materials that stand up to daily use</li>
                      <li>Modern aesthetic that complements any style</li>
                      <li>Lightweight yet sturdy construction</li>
                    </ul>
                    <p className="mt-4">
                      Care instructions: Hand wash or machine wash cold. Air dry only. Do not bleach.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="features" className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Key Features</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="inline-flex items-center justify-center rounded-full bg-primary/20 p-1 mr-2">
                            <CheckIcon className="h-4 w-4 text-primary" />
                          </span>
                          <span>Advanced breathability technology</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-flex items-center justify-center rounded-full bg-primary/20 p-1 mr-2">
                            <CheckIcon className="h-4 w-4 text-primary" />
                          </span>
                          <span>Moisture-wicking fabric</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-flex items-center justify-center rounded-full bg-primary/20 p-1 mr-2">
                            <CheckIcon className="h-4 w-4 text-primary" />
                          </span>
                          <span>Reinforced stress points</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-flex items-center justify-center rounded-full bg-primary/20 p-1 mr-2">
                            <CheckIcon className="h-4 w-4 text-primary" />
                          </span>
                          <span>UV protection</span>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Technical Specs</h3>
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2 py-1 border-b border-border/40">
                          <span className="text-muted-foreground">Material</span>
                          <span>Premium synthetic blend</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 py-1 border-b border-border/40">
                          <span className="text-muted-foreground">Weight</span>
                          <span>Ultra-lightweight</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 py-1 border-b border-border/40">
                          <span className="text-muted-foreground">Warranty</span>
                          <span>1 year limited</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 py-1 border-b border-border/40">
                          <span className="text-muted-foreground">Origin</span>
                          <span>Ethically manufactured</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="reviews" className="p-6">
                  <div className="flex flex-col items-center py-8">
                    <h3 className="text-lg font-medium mb-2">Customer Reviews</h3>
                    <div className="flex items-center mb-6">
                      <div className="flex mr-2">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            size={20}
                            className={index < Math.floor(product.rating || 0) ? "text-yellow-500 fill-yellow-500" : "text-muted"}
                          />
                        ))}
                      </div>
                      <span className="text-xl font-medium">{product.rating}</span>
                      <span className="text-muted-foreground ml-2">(24 reviews)</span>
                    </div>
                    <p className="text-muted-foreground text-center max-w-md mb-6">
                      Reviews for this product will be shown here. Be the first to leave a review!
                    </p>
                    <Button>Write a Review</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className="mt-20">
                <h2 className="text-2xl font-heading font-bold mb-8">You May Also Like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

// Helper component for the features tab
const CheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default ProductDetail;
