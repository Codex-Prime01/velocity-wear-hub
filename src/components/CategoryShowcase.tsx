
import { Link } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';

const CategoryShowcase = () => {
  const categories = [
    {
      name: 'Shoes',
      description: 'Performance footwear for every terrain',
      images: [
        'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1000',
        'https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1000', 
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000'
      ],
      path: '/category/shoes',
    },
    {
      name: 'Clothing',
      description: 'Engineered apparel for optimal movement',
      images: [
        'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1000',
        'https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1000',
        'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000'
      ],
      path: '/category/clothing',
    },
    {
      name: 'Accessories',
      description: 'Essential gear to complete your kit',
      images: [
        'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1000',
        'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1000',
        'https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=1000'
      ],
      path: '/category/accessories',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold mb-4 text-center">Shop By Category</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">Explore our curated collections of premium products designed for performance and style</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div key={category.name} className="group space-y-4">
              {/* Category Images Carousel */}
              <Carousel className="w-full">
                <CarouselContent>
                  {category.images.map((image, i) => (
                    <CarouselItem key={i}>
                      <div className="overflow-hidden rounded-lg aspect-[4/5] bg-black/5">
                        <AspectRatio ratio={4/5}>
                          <img
                            src={image}
                            alt={`${category.name} image ${i+1}`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </AspectRatio>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 bg-background/70 backdrop-blur-sm" />
                <CarouselNext className="right-2 bg-background/70 backdrop-blur-sm" />
              </Carousel>
              
              {/* Category Content */}
              <div className="text-center">
                <h3 className="text-2xl font-heading font-bold mb-2">{category.name}</h3>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <Button variant="outline" asChild>
                  <Link to={category.path}>
                    Explore {category.name}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
