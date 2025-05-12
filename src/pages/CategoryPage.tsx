
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { Category } from '@/types';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>() as { category: Category };
  
  const categoryProducts = products.filter(product => product.category === category);
  const featuredProducts = categoryProducts.filter(product => product.isFeatured || product.isNew);
  const regularProducts = categoryProducts.filter(product => !product.isFeatured && !product.isNew);
  
  // Capitalize first letter of category for display
  const displayCategory = category.charAt(0).toUpperCase() + category.slice(1);
  
  // Get category-specific meta information
  const getCategoryMeta = () => {
    switch(category) {
      case 'shoes':
        return {
          title: 'Performance Footwear - VELOCITY',
          description: 'Discover our collection of high-performance shoes designed for style and comfort.',
          heading: 'Performance Footwear',
          subheading: 'Step into the future with our innovative shoes collection',
          image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1000'
        };
      case 'clothing':
        return {
          title: 'Technical Apparel - VELOCITY',
          description: 'Explore our range of advanced apparel designed for performance and style.',
          heading: 'Technical Apparel',
          subheading: 'Engineered garments for optimal movement and comfort',
          image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=1000'
        };
      case 'accessories':
        return {
          title: 'Performance Accessories - VELOCITY',
          description: 'Complete your kit with our range of performance-enhancing accessories.',
          heading: 'Performance Accessories',
          subheading: 'Essential gear to complement your performance',
          image: 'https://images.unsplash.com/photo-1513116476489-7635e79feb27?q=80&w=1000'
        };
      default:
        return {
          title: `${displayCategory} - VELOCITY`,
          description: `Explore our collection of ${category} at VELOCITY.`,
          heading: displayCategory,
          subheading: `Discover our ${category} collection`,
          image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000'
        };
    }
  };
  
  const meta = getCategoryMeta();

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {/* Hero Banner */}
          <div className="relative h-80 overflow-hidden">
            <img 
              src={meta.image} 
              alt={`${displayCategory} Collection`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent flex items-center">
              <div className="container mx-auto px-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">{meta.heading}</h1>
                <p className="text-muted-foreground max-w-md">{meta.subheading}</p>
              </div>
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-12">
            {/* Featured Products Section */}
            {featuredProducts.length > 0 && (
              <div className="mb-16">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <h2 className="text-2xl font-heading font-bold">Featured {displayCategory}</h2>
                    <p className="text-muted-foreground mt-1">Our top picks from this category</p>
                  </div>
                  <Link to="/shop" className="text-primary flex items-center hover:underline">
                    View All
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {featuredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
            
            {/* All Products in Category */}
            <div>
              <h2 className="text-2xl font-heading font-bold mb-8">All {displayCategory}</h2>
              
              {categoryProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {regularProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-6">We couldn't find any products in this category.</p>
                  <Button asChild>
                    <Link to="/shop">Browse All Products</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default CategoryPage;
