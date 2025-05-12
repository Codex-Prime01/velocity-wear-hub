
import { Product } from '@/types';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard = ({ product, featured = false }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, product.sizes[0], product.colors[0]);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <div className={`product-card group hover-scale ${featured ? 'aspect-[2/3]' : 'aspect-[3/4]'}`}>
        <div className="relative h-full">
          {/* Image */}
          <div className="relative h-full overflow-hidden">
            <img 
              src={product.images[0]} 
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Badges for New & Featured */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.isNew && (
                <span className="badge">New</span>
              )}
              {product.isFeatured && (
                <span className="badge bg-primary">Featured</span>
              )}
            </div>
            
            {/* Quick action buttons */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button 
                variant="secondary" 
                size="icon"
                className="rounded-full bg-background/50 backdrop-blur-sm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <Heart size={18} />
              </Button>
            </div>
            
            {/* Product info overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="font-medium text-lg">{product.name}</h3>
              <p className="text-muted-foreground">${product.price.toFixed(2)}</p>
              
              <div className="mt-4 flex justify-between items-center">
                <div className="flex space-x-2">
                  {product.colors.slice(0, 3).map((color) => (
                    <div 
                      key={color} 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  {product.colors.length > 3 && (
                    <span className="text-xs text-muted-foreground">+{product.colors.length - 3}</span>
                  )}
                </div>
                
                <Button 
                  size="sm"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag size={16} className="mr-2" />
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
