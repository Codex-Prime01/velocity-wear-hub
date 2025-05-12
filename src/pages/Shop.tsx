
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Product, Category } from '@/types';
import { CheckIcon, SlidersHorizontal, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const Shop = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [filtersVisible, setFiltersVisible] = useState(false);

  // Filter and sort products whenever filters change
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply price filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result = result.filter(product => product.isNew).concat(
          result.filter(product => !product.isNew)
        );
        break;
      case 'featured':
      default:
        result = result.filter(product => product.isFeatured).concat(
          result.filter(product => !product.isFeatured)
        );
        break;
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, priceRange, sortBy]);

  const maxPrice = Math.max(...products.map(product => product.price));
  
  const allCategories = ['all', ...new Set(products.map(product => product.category))] as (Category | 'all')[];
  
  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, maxPrice]);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="text-lg font-medium mb-4">Categories</h3>
        <div className="space-y-2">
          {allCategories.map((category) => (
            <div key={category} className="flex items-center">
              <button
                className="flex items-center w-full py-1 text-left"
                onClick={() => setSelectedCategory(category)}
              >
                <div className={`w-5 h-5 border rounded-full mr-2 flex items-center justify-center ${
                  selectedCategory === category ? 'bg-primary border-primary' : 'border-muted-foreground'
                }`}>
                  {selectedCategory === category && <CheckIcon className="w-3 h-3 text-white" />}
                </div>
                <span className="capitalize">{category}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      {/* Price Range Filter */}
      <div>
        <h3 className="text-lg font-medium mb-4">Price Range</h3>
        <Slider 
          defaultValue={priceRange} 
          min={0} 
          max={maxPrice} 
          step={10}
          onValueChange={setPriceRange}
          className="my-6"
        />
        <div className="flex items-center justify-between">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
      
      <Separator />
      
      {/* Clear Filters */}
      <Button 
        variant="outline" 
        className="w-full"
        onClick={clearFilters}
      >
        Clear Filters
      </Button>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Shop - VELOCITY</title>
        <meta name="description" content="Browse our collection of performance apparel, shoes, and accessories." />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <div className="bg-gradient-to-r from-secondary to-background py-12">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl font-heading font-bold mb-4">Shop All Products</h1>
              <p className="text-muted-foreground">
                Browse our curated collection of performance gear
              </p>
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-8">
            {/* Shop Controls - Mobile */}
            <div className="md:hidden flex justify-between items-center mb-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <SlidersHorizontal size={16} />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Shop Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Filters - Desktop */}
              <div className="hidden md:block md:col-span-3">
                <div className="sticky top-20">
                  <FilterContent />
                </div>
              </div>
              
              {/* Product Grid */}
              <div className="md:col-span-9">
                {/* Desktop Sort Controls */}
                <div className="hidden md:flex justify-between items-center mb-8">
                  <div>
                    <span className="text-muted-foreground">
                      Showing {filteredProducts.length} results
                    </span>
                  </div>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <h3 className="text-xl font-medium mb-2">No products found</h3>
                    <p className="text-muted-foreground mb-6">Try adjusting your filters to find what you're looking for.</p>
                    <Button onClick={clearFilters}>Clear Filters</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Shop;
