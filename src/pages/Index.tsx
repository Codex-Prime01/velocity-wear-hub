
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import CategoryShowcase from '@/components/CategoryShowcase';
import PromoBanner from '@/components/PromoBanner';
import AboutUs from '@/components/AboutUs';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>VELOCITY - Future-Forward Apparel & Footwear</title>
        <meta name="description" content="Discover cutting-edge apparel, shoes, and accessories designed for performance and style at VELOCITY." />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <HeroSection />
          <FeaturedProducts />
          <CategoryShowcase />
          <PromoBanner />
          <AboutUs />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
