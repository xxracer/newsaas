'use client';

import { useEffect } from 'react';
import { generatePageTitle, generatePageDescription, generateKeywords, generateStructuredData, FAQ_SCHEMA } from '@/lib/seo';

interface StudioMetaTagsProps {
  page: string;
  studioData: {
    businessName: string;
    tagline?: string;
    city?: string;
    address?: string;
    phone?: string;
    instagram?: string;
    facebook?: string;
  };
}

export function StudioMetaTags({ page, studioData }: StudioMetaTagsProps) {
  useEffect(() => {
    // Generate SEO data
    const title = generatePageTitle(page, studioData);
    const description = generatePageDescription(page, studioData);
    const keywords = generateKeywords(page, studioData);
    const structuredData = generateStructuredData(studioData);

    // Set document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let tag = document.querySelector(selector);

      if (!tag) {
        tag = document.createElement('meta');
        if (isProperty) {
          tag.setAttribute('property', name);
        } else {
          tag.setAttribute('name', name);
        }
        document.head.appendChild(tag);
      }

      tag.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords.join(', '));
    updateMetaTag('author', studioData.businessName);
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('canonical', window.location.href);

    // Open Graph meta tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:url', window.location.href, true);
    updateMetaTag('og:site_name', studioData.businessName, true);

    // Twitter meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);

    // Local business meta tags
    updateMetaTag('geo.region', studioData.city || '');
    updateMetaTag('geo.placename', studioData.city || '');

    // Add structured data (JSON-LD)
    let scriptTag = document.getElementById('studio-structured-data');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'studio-structured-data';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

    // Add FAQ schema for FAQ page
    if (page === 'faq') {
      let faqScriptTag = document.getElementById('faq-structured-data');
      if (!faqScriptTag) {
        faqScriptTag = document.createElement('script');
        faqScriptTag.id = 'faq-structured-data';
        faqScriptTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(faqScriptTag);
      }
      faqScriptTag.textContent = JSON.stringify(FAQ_SCHEMA);
    }

    // Cleanup on unmount
    return () => {
      // Reset title
      document.title = 'WaxingSetudios';
    };
  }, [page, studioData]);

  return null; // This component doesn't render anything visible
}
