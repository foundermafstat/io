'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, MapPin, Bed, Bath, Square, Euro, Star, Eye, Mic, Phone, Mail, Share2, Heart } from 'lucide-react';
import Image from 'next/image';
import { Property } from '@/types/property';
import { useTranslations, TranslationsProvider } from '@/components/translations-context';
import { toast } from 'sonner';

function PropertyDetailPage() {
  const { t } = useTranslations();
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const propertyId = params.id as string;

  useEffect(() => {
    const fetchProperty = async () => {
      if (!propertyId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/properties/${propertyId}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Property not found');
          } else {
            setError('Failed to load property');
          }
          return;
        }

        const data = await response.json();
        
        if (data.success && data.data) {
          setProperty(data.data);
        } else {
          setError(data.error || 'Failed to load property');
        }
      } catch (err) {
        console.error('Error fetching property:', err);
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const handleBack = () => {
    router.back();
  };

  const handleContact = () => {
    toast.success('Contact information sent', {
      description: 'We will contact you soon about this property'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.title,
        text: `Check out this property: ${property?.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  const handleFavorite = () => {
    toast.success('Added to favorites', {
      description: 'Property saved to your favorites'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Skeleton className="h-8 w-32 mb-4" />
            <Skeleton className="h-4 w-64" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Skeleton className="h-96 w-full rounded-lg" />
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full rounded" />
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Property Not Found</CardTitle>
            <CardDescription>
              {error || 'The property you are looking for does not exist.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={handleBack} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const price = property.operationType === 'RENT' 
    ? property.rentPrice 
    : property.salePrice;
  
  const priceLabel = property.operationType === 'RENT' ? t('quiz.properties.perMonth') : '';

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={handleBack}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('quiz.navigation.prev')}
          </Button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                <span>
                  {[property.city, property.state, property.country]
                    .filter(Boolean)
                    .join(', ')}
                </span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={handleFavorite}>
                <Heart className="w-4 h-4 mr-1" />
                Save
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative h-96 bg-muted rounded-lg overflow-hidden">
              {!imageError ? (
                <Image
                  src={Array.isArray(property.images) && property.images.length > 0 ? property.images[0] : "/placeholder.svg"}
                  alt={property.title}
                  fill
                  className={`object-cover ${imageLoading ? 'animate-pulse' : ''}`}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSIxMjAwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjEyMDAiIGZpbGw9IiNFQUVBRUEiIHJ4PSIzIi8+PC9zdmc+"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground bg-muted">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Image not available</p>
                  </div>
                </div>
              )}
              
              {imageLoading && (
                <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              
              {/* Status badges */}
              <div className="absolute top-4 left-4 flex gap-2">
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
              <div className="absolute top-4 right-4">
                <Badge variant={property.operationType === 'RENT' ? 'default' : 'outline'}>
                  {property.operationType === 'RENT' ? t('quiz.properties.rent') : t('quiz.properties.sale')}
                </Badge>
              </div>
            </div>
            
            {/* Thumbnail images */}
            <div className="grid grid-cols-4 gap-2">
              {Array.isArray(property.images) && property.images.length > 0 ? (
                property.images.slice(0, 4).map((image, i) => (
                  <div key={i} className="relative h-20 bg-muted rounded overflow-hidden">
                    <Image
                      src={image}
                      alt={`${property.title} ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))
              ) : (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="relative h-20 bg-muted rounded overflow-hidden">
                    <Image
                      src="/placeholder.svg"
                      alt={`${property.title} ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Property Details */}
          <div className="space-y-6">
            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Euro className="w-6 h-6 mr-2" />
                <span className="text-3xl font-bold">
                  {price?.toLocaleString()}
                </span>
                {priceLabel && (
                  <span className="text-lg text-muted-foreground ml-2">
                    {priceLabel}
                  </span>
                )}
              </div>
            </div>

            {/* Property specs */}
            <div className="grid grid-cols-3 gap-4">
              {property.bedrooms && (
                <div className="text-center p-4 border rounded-lg">
                  <Bed className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <div className="text-2xl font-semibold">{property.bedrooms}</div>
                  <div className="text-sm text-muted-foreground">Bedrooms</div>
                </div>
              )}
              {property.bathrooms && (
                <div className="text-center p-4 border rounded-lg">
                  <Bath className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <div className="text-2xl font-semibold">{property.bathrooms}</div>
                  <div className="text-sm text-muted-foreground">Bathrooms</div>
                </div>
              )}
              {property.area && (
                <div className="text-center p-4 border rounded-lg">
                  <Square className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <div className="text-2xl font-semibold">{property.area}</div>
                  <div className="text-sm text-muted-foreground">m²</div>
                </div>
              )}
            </div>

            {/* Features */}
            {property.features && Array.isArray(property.features) && property.features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {property.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {property.description || 'No description available for this property.'}
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
              <span>{property.views || 0} {t('quiz.properties.views')}</span>
              <span>{Array.isArray(property.reviews) ? property.reviews.length : 0} {t('quiz.properties.reviews')}</span>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-4">
              <Button onClick={handleContact} className="flex-1">
                <Phone className="w-4 h-4 mr-2" />
                Contact Agent
              </Button>
              <Button variant="outline" onClick={handleContact}>
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PropertyPage() {
  return (
    <TranslationsProvider>
      <PropertyDetailPage />
    </TranslationsProvider>
  );
}
