
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const BlogPreview = () => {
  const articles = [
    {
      title: 'The Future of Athletic Footwear',
      excerpt: 'Discover how technology is revolutionizing performance shoes and what to expect in the coming years.',
      image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=1000',
      date: 'May 8, 2025',
      author: 'Elena Rodriguez',
      slug: '/blog/future-athletic-footwear'
    },
    {
      title: 'Sustainable Fashion: Beyond the Buzzword',
      excerpt: 'How ethical manufacturing practices are shaping the future of clothing production and consumer choices.',
      image: 'https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?q=80&w=1000',
      date: 'May 2, 2025',
      author: 'Michael Chang',
      slug: '/blog/sustainable-fashion'
    },
    {
      title: 'Accessorizing for the Digital Age',
      excerpt: 'The intersection of fashion and technology in modern accessories that enhance both style and functionality.',
      image: 'https://images.unsplash.com/photo-1619382104595-df2530d2235c?q=80&w=1000',
      date: 'April 28, 2025',
      author: 'Zoe Washington',
      slug: '/blog/digital-age-accessories'
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-heading font-bold mb-2">Latest Articles</h2>
            <p className="text-muted-foreground">Trends, insights, and innovation from the world of fashion</p>
          </div>
          <Button variant="outline" asChild className="mt-4 md:mt-0">
            <Link to="/blog">View All Articles</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <Card key={index} className="border border-border/40 bg-card/40 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-all duration-300">
              <AspectRatio ratio={16/9}>
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
              <CardContent className="pt-6">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <span>{article.date}</span>
                  <span className="mx-2">•</span>
                  <span>By {article.author}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-muted-foreground line-clamp-3">{article.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="px-0 hover:bg-transparent hover:text-primary" asChild>
                  <Link to={article.slug}>Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
