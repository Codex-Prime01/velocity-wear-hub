
import { motion } from 'framer-motion';
import { Folder, Section, Images, Gallery } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Folder className="w-10 h-10 text-primary" />,
      title: 'Curated Collections',
      description: 'Hand-selected products that combine forward-thinking design with exceptional quality and performance.'
    },
    {
      icon: <Section className="w-10 h-10 text-primary" />,
      title: 'Innovative Materials',
      description: 'Cutting-edge fabrics and components that enhance comfort, durability, and functionality.'
    },
    {
      icon: <Images className="w-10 h-10 text-primary" />,
      title: 'Exclusive Designs',
      description: 'Limited-edition pieces and collaborations with emerging designers pushing the boundaries of fashion.'
    },
    {
      icon: <Gallery className="w-10 h-10 text-primary" />,
      title: 'Seamless Experience',
      description: "From browsing to unboxing, we've optimized every touchpoint for a frictionless journey."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-secondary/5 to-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold mb-2 text-center">Why Choose VELOCITY</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          We're redefining the intersection of performance, style, and innovation
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card/50 backdrop-blur-sm border border-border/40 rounded-xl p-6 text-center"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
