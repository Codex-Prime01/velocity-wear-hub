
import { Star } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';

const testimonials = [
  {
    name: 'Alex Johnson',
    position: 'Fitness Enthusiast',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000',
    content: 'The Velocity Pro Runners completely transformed my training routine. The responsive cushioning and lightweight design make every run feel effortless.',
    rating: 5
  },
  {
    name: 'Sophia Chen',
    position: 'Fashion Blogger',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000',
    content: 'Dressberry has become my go-to for trend-forward pieces. The Apex Tech Jacket is not just stylish but incredibly functional for my travels.',
    rating: 5
  },
  {
    name: 'Marcus Lee',
    position: 'Tech Developer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000',
    content: 'As someone who values both aesthetics and functionality, I appreciate how VELOCITY blends cutting-edge design with practical features in all their products.',
    rating: 4
  },
  {
    name: 'Jasmine Taylor',
    position: 'Professional Athlete',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000',
    content: 'The NeoTech Basketball Shoes offer incredible ankle support and grip. They've significantly improved my game performance on the court.',
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-secondary/10 to-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold mb-2 text-center">What Our Customers Say</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Don't take our word for it - hear from the community that trusts our products
        </p>

        <Carousel className="w-full">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="bg-card/80 backdrop-blur-sm border border-border/40 rounded-xl p-6 h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-4 h-4 ${i < testimonial.rating ? 'fill-primary text-primary' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground italic flex-grow">"{testimonial.content}"</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-6">
            <CarouselPrevious className="static mx-2 translate-y-0" />
            <CarouselNext className="static mx-2 translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
