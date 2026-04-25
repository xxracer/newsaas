'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift, Mail } from 'lucide-react';
import { Loader2 } from 'lucide-react';

function GiftCardSuccessContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-xl text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
          <Gift className="h-10 w-10 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gift Card Purchased!</h1>
        <p className="text-gray-500 mb-8">
          Your gift card has been created and is ready to use.
        </p>

        {code && (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <p className="text-sm text-gray-500 mb-2">Your Gift Card Code</p>
              <p className="text-2xl font-mono font-bold text-pink-600 tracking-wider">{code}</p>
              <p className="text-xs text-gray-400 mt-2">
                Make sure to save this code. The recipient will also receive an email with this information.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          <div className="flex items-center gap-3 justify-center text-sm text-gray-600">
            <Mail className="h-4 w-4" />
            <span>An email has been sent to the recipient</span>
          </div>

          <div className="flex gap-4">
            <Button asChild variant="outline" className="flex-1">
              <Link href="/">
                Return Home
              </Link>
            </Button>
            <Button asChild className="flex-1 bg-pink-600 hover:bg-pink-700">
              <Link href="/book">
                Book Appointment
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12 flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
    </div>
  );
}

export default function GiftCardSuccessPage() {
  return (
    <Suspense fallback={<LoadingContent />}>
      <GiftCardSuccessContent />
    </Suspense>
  );
}