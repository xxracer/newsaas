'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Redirect to home page
export default function StudioDomainPage({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = React.use(params);
  const router = useRouter();

  useEffect(() => {
    // Redirect to the home page of the studio
    router.push(`/studio/${domain}/home`);
  }, [domain, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Redireccionando...</p>
      </div>
    </div>
  );
}
