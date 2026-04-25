import HeroSection from '@/components/sections/HeroSection';
import FeaturedServicesSection from '@/components/sections/FeaturedServicesSection';
import TrainingPromoSection from '@/components/sections/TrainingPromoSection';
import GiftCardSection from '@/components/sections/GiftCardSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import SponsorsSection from '@/components/sections/SponsorsSection';
import AboutSection from '@/components/sections/AboutSection';
import CallToActionSection from '@/components/sections/CallToActionSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedServicesSection />
      <TrainingPromoSection />
      <GiftCardSection />
      <TestimonialsSection />
      <SponsorsSection />
      <CallToActionSection />
    </>
  );
}
