
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const CategoryShowcase = () => {
  const categories = [
    {
      name: 'Shoes',
      description: 'Performance footwear for every terrain',
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1000',
      path: '/category/shoes',
    },
    {
      name: 'Clothing',
      description: 'Engineered apparel for optimal movement',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1000',
      path: '/category/clothing',
    },
    {
      name: 'Accessories',
      description: 'Essential gear to complete your kit',
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1000',
      path: '/category/accessories',
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold mb-10 text-center">Shop By Category</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={category.path}
              className="group relative overflow-hidden rounded-lg aspect-[4/5]"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80"></div>
              </div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-heading font-bold mb-2">{category.name}</h3>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <div>
                  <Button variant="outline" className="border-white/50 bg-background/30 backdrop-blur-sm hover:bg-background/50 transition-all">
                    Explore {category.name}
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
