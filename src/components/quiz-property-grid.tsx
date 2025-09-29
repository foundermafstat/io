'use client';

import React from 'react';
import { Property } from '@/types/property';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Bed, Bath, Square, Euro, Star, Eye, ChevronLeft, ChevronRight, Mic } from 'lucide-react';
import Image from 'next/image';
import { useQuiz } from '@/lib/quiz-context';
import { useTranslations } from '@/components/translations-context';

interface QuizPropertyGridProps {
  properties: Property[];
  loading: boolean;
  currentStep: number;
  className?: string;
}

export function QuizPropertyGrid({ 
  properties, 
  loading, 
  currentStep, 
  className 
}: QuizPropertyGridProps) {
  const { t } = useTranslations();
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [maxScroll, setMaxScroll] = React.useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = React.useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setScrollPosition(scrollLeft);
      setMaxScroll(scrollWidth - clientWidth);
    }
  }, []);

  const scrollToLeft = React.useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  }, []);

  const scrollToRight = React.useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  }, []);

  React.useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial call
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll, properties.length]);
  if (loading) {
    return (
      <div className={`space-y-4 ${className} animate-in fade-in-50 duration-300`}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Matching Properties</h2>
          <Skeleton className="h-6 w-20" />
        </div>
        <div className="relative">
          {/* Left gradient fade */}
          <div className="absolute left-0 top-0 bottom-0 w-8 carousel-gradient-left z-10 pointer-events-none" />
          
          {/* Right gradient fade */}
          <div className="absolute right-0 top-0 bottom-0 w-8 carousel-gradient-right z-10 pointer-events-none" />
          
          {/* Scrollable carousel */}
          <div className="overflow-x-auto scrollbar-hide carousel-container">
            <div className="flex gap-4 pb-8 property-grid property-grid-loading" style={{ width: 'max-content' }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-80">
                  <Card className="overflow-hidden animate-pulse">
                    <Skeleton className="h-48 w-full" />
                    <CardContent className="p-4 space-y-3">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-16" />
                      </div>
                      <Skeleton className="h-8 w-full" />
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className={`text-center py-8 ${className} property-grid-empty animate-in fade-in-50 duration-300`}>
        <div className="text-muted-foreground">
          <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">{t('quiz.properties.noProperties')}</h3>
          <p className="text-sm">
            {currentStep <= 2 
              ? t('quiz.properties.completeSteps')
              : t('quiz.properties.adjustPreferences')
            }
          </p>
        </div>
      </div>
    );
  }

  const getStepTitle = (step: number) => {
    switch (step) {
      case 0:
        return t('quiz.properties.allAvailable');
      case 1:
        return t('quiz.properties.byPurpose');
      case 2:
        return t('quiz.properties.byBudget');
      case 3:
        return t('quiz.properties.byType');
      case 4:
        return t('quiz.properties.byArea');
      case 5:
        return t('quiz.properties.byFeatures');
      case 6:
        return t('quiz.properties.perfectMatches');
      default:
        return t('quiz.properties.matching');
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between animate-in fade-in-50 duration-300">
        <div>
          <h2 className="text-xl font-semibold">{getStepTitle(currentStep)}</h2>
          <p className="text-sm text-muted-foreground">
            {properties.length} {properties.length === 1 ? t('quiz.properties.property') : t('quiz.properties.properties')} {t('quiz.properties.found')}
          </p>
        </div>
        <Badge variant="outline" className="text-xs">
          {t('quiz.navigation.step')} {currentStep + 1} {t('quiz.properties.found')}
        </Badge>
      </div>

      <div className="relative">
        {/* Navigation buttons */}
        {scrollPosition > 0 && (
          <Button
            variant="outline"
            size="sm"
            className="carousel-nav-button absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-background/80 backdrop-blur-sm"
            onClick={scrollToLeft}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        )}
        
        {scrollPosition < maxScroll && (
          <Button
            variant="outline"
            size="sm"
            className="carousel-nav-button absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-background/80 backdrop-blur-sm"
            onClick={scrollToRight}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
        
        {/* Left gradient fade */}
        <div className="absolute left-0 top-0 bottom-0 w-8 carousel-gradient-left z-10 pointer-events-none" />
        
        {/* Right gradient fade */}
        <div className="absolute right-0 top-0 bottom-0 w-8 carousel-gradient-right z-10 pointer-events-none" />
        
        {/* Scrollable carousel */}
        <div 
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide carousel-container"
        >
          <div className="flex gap-4 pb-8 property-grid property-grid-loaded" style={{ width: 'max-content' }}>
            {properties.map((property, index) => (
              <div
                key={property.id}
                className="property-card-enter flex-shrink-0 w-80 carousel-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Scroll indicators */}
        {maxScroll > 0 && (
          <div className="scroll-indicator">
            {Array.from({ length: Math.ceil(properties.length / 3) }).map((_, index) => {
              const isActive = scrollPosition >= index * 300 && scrollPosition < (index + 1) * 300;
              return (
                <div
                  key={index}
                  className={`scroll-dot ${isActive ? 'active' : ''}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function PropertyCard({ property }: { property: Property }) {
  const { state, selectProperty } = useQuiz();
  const { t } = useTranslations();
  const [imageLoading, setImageLoading] = React.useState(true);
  const [imageError, setImageError] = React.useState(false);
  
  const price = property.operationType === 'RENT' 
    ? property.rentPrice 
    : property.salePrice;
  
  const priceLabel = property.operationType === 'RENT' ? t('quiz.properties.perMonth') : '';
  const isSelected = state.selectedProperty === property.id;

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const handleSelect = () => {
    selectProperty(isSelected ? null : property.id);
  };

  return (
    <Card 
      className={`overflow-hidden carousel-card transition-all duration-300 cursor-pointer ${
        isSelected 
          ? 'ring-2 ring-primary shadow-lg scale-[1.02]' 
          : 'hover:shadow-lg hover:scale-[1.02]'
      }`}
      onClick={handleSelect}
    >
      {/* Image */}
      <div className="relative h-48 bg-muted">
        {!imageError ? (
          <Image
            src="/placeholder.svg"
            alt={property.title}
            fill
            className={`object-cover property-image ${imageLoading ? 'property-image-loading' : 'property-image-loaded'}`}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSIxMjAwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjEyMDAiIGZpbGw9IiNFQUVBRUEiIHJ4PSIzIi8+PC9zdmc+"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground bg-muted">
            <div className="text-center">
              <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs">Image not available</p>
            </div>
          </div>
        )}
        
        {/* Loading overlay */}
        {imageLoading && (
          <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Status badges */}
        <div className="absolute top-2 left-2 flex gap-1">
          {isSelected && (
            <Badge variant="default" className="text-xs bg-primary">
              <Mic className="w-3 h-3 mr-1" />
              {t('quiz.properties.selected')}
            </Badge>
          )}
          {property.isFeatured && (
            <Badge variant="default" className="text-xs">
              <Star className="w-3 h-3 mr-1" />
              {t('quiz.properties.featured')}
            </Badge>
          )}
          {property.isVerified && (
            <Badge variant="secondary" className="text-xs">
              {t('quiz.properties.verified')}
            </Badge>
          )}
        </div>

        {/* Operation type */}
        <div className="absolute top-2 right-2">
          <Badge variant={property.operationType === 'RENT' ? 'default' : 'outline'}>
            {property.operationType === 'RENT' ? t('quiz.properties.rent') : t('quiz.properties.sale')}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Title and location */}
        <div className="space-y-2 mb-3">
          <CardTitle className="text-lg line-clamp-1">
            {property.title}
          </CardTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="line-clamp-1">
              {[property.city, property.state, property.country]
                .filter(Boolean)
                .join(', ')}
            </span>
          </div>
        </div>

        {/* Property details */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          {property.bedrooms && (
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              {property.bedrooms}
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              {property.bathrooms}
            </div>
          )}
          {property.area && (
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-1" />
              {property.area}m²
            </div>
          )}
        </div>

        {/* Features */}
        {property.features && Array.isArray(property.features) && property.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {property.features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
            {property.features.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{property.features.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Price and actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Euro className="w-4 h-4 mr-1" />
            <span className="text-lg font-semibold">
              {price?.toLocaleString()}
            </span>
            {priceLabel && (
              <span className="text-sm text-muted-foreground ml-1">
                {priceLabel}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-1" />
              {t('quiz.properties.view')}
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-2 pt-2 border-t">
          <span>{property.views || 0} {t('quiz.properties.views')}</span>
          <span>{Array.isArray(property.reviews) ? property.reviews.length : 0} {t('quiz.properties.reviews')}</span>
        </div>
      </CardContent>
    </Card>
  );
}
