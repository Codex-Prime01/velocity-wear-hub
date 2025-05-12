
import { useState } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Category } from '@/types';

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  
  const featuredProducts = products.filter((product) => 
    product.isFeatured || product.isNew
  );
  
  const filteredProducts = activeCategory === 'all' 
    ? featuredProducts 
    : featuredProducts.filter((product) => product.category === activeCategory);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-heading font-bold">Featured Products</h2>
            <p className="text-muted-foreground mt-2">Explore our handpicked selection of premium items</p>
          </div>
          
          {/* Category Filter Tabs */}
          <div className="mt-6 md:mt-0">
            <Tabs defaultValue="all" onValueChange={(value) => setActiveCategory(value as Category | 'all')}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="shoes">Shoes</TabsTrigger>
                <TabsTrigger value="clothing">Clothing</TabsTrigger>
                <TabsTrigger value="accessories">Accessories</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/shop">
              View All Products
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
