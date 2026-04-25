"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ServiceCard from '@/components/shared/ServiceCard';
import { Loader2, Gift } from 'lucide-react';
import Image from 'next/image';
import type { AcuityPackage } from '@/ai/flows/acuity-booking-flow';
import { useToast } from '@/hooks/use-toast';

export default function GiftCardSection() {
  const [giftCards, setGiftCards] = useState<AcuityPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();
  const iconUrl = "https://static.wixstatic.com/media/c5947c_105b98aad40c4d4c8ca7de374634e9fa~mv2.png";

  useEffect(() => {
    async function fetchGiftCards() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/packages');
        if (!res.ok) throw new Error('Failed to fetch packages');
        const packages: AcuityPackage[] = await res.json();
        setGiftCards(packages.filter(p => p.isGiftCertificate));
      } catch (error) {
        console.error("Failed to fetch gift cards:", error);
        toast({
          title: "Error",
          description: "Could not load gift cards.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchGiftCards();
  }, [toast]);

  const handleSelect = (giftCard: AcuityPackage) => {
    toast({
      title: "Buying Gift Card...",
      description: `You selected ${giftCard.name}. Redirecting to purchase.`,
    });
    router.push(`/schedule?package=${giftCard.id}`);
  };

  // No renderizar la sección si no hay gift cards y ya terminó de cargar
  if (!isLoading && giftCards.length === 0) return null;

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-headline font-semibold text-primary mb-4 flex items-center justify-center">
            <Image src={iconUrl} alt="" width={32} height={32} className="mr-3 h-8 w-8" />
            Buy Your Gift Card
            <Image src={iconUrl} alt="" width={32} height={32} className="ml-3 h-8 w-8" />
          </h2>
          <p className="text-lg text-foreground max-w-2xl mx-auto font-body">
            Give the gift of beauty! Choose from our available gift cards for your loved ones.
          </p>
        </div>
        
        {isLoading ? (
           <div className="flex justify-center items-center h-40">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {giftCards.map((giftCard) => (
              <ServiceCard 
                key={giftCard.id} 
                service={giftCard}
                onSelect={() => handleSelect(giftCard)}
                isSelected={false}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
