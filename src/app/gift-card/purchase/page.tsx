'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Gift, Mail, User, Heart } from 'lucide-react';
import { AlertCircle } from 'lucide-react';

const presetAmounts = [25, 50, 75, 100, 150, 200];

export default function GiftCardPurchasePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [recipientInfo, setRecipientInfo] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [purchaserInfo, setPurchaserInfo] = useState({
    name: '',
    email: '',
  });

  const amount = selectedAmount || parseFloat(customAmount) || 0;

  const handleSelectAmount = (value: number) => {
    setSelectedAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const handleSubmit = async () => {
    if (amount < 1) {
      setError('Please select or enter a valid amount');
      return;
    }

    if (!recipientInfo.name || !recipientInfo.email) {
      setError('Please fill in all required fields');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gift-cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          purchaserEmail: purchaserInfo.email,
          purchasedForName: recipientInfo.name,
          purchasedForEmail: recipientInfo.email,
          message: recipientInfo.message,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        // In production, redirect to Stripe checkout
        // For now, show success
        router.push(`/gift-card/success?code=${data.giftCard.code}`);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to create gift card');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 mb-4">
            <Gift className="h-8 w-8 text-pink-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gift Cards</h1>
          <p className="text-gray-500">Give the gift of smooth, beautiful skin</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Choose an Amount</CardTitle>
              <CardDescription>Select a gift card denomination</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                {presetAmounts.map((value) => (
                  <Button
                    key={value}
                    variant={selectedAmount === value ? 'default' : 'outline'}
                    onClick={() => handleSelectAmount(value)}
                    className={`h-20 text-lg font-semibold ${
                      selectedAmount === value ? 'bg-pink-600 hover:bg-pink-700' : ''
                    }`}
                  >
                    ${value}
                  </Button>
                ))}
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or enter custom amount</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customAmount">Custom Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="customAmount"
                    type="number"
                    min="1"
                    placeholder="0.00"
                    value={customAmount}
                    onChange={(e) => handleCustomAmount(e.target.value)}
                    className="pl-8 text-lg"
                  />
                </div>
              </div>

              <Button
                size="lg"
                className="w-full bg-pink-600 hover:bg-pink-700"
                disabled={amount < 1}
                onClick={() => setStep(2)}
              >
                Continue
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Recipient Information</CardTitle>
              <CardDescription>Who is this gift card for?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipientName">Recipient Name *</Label>
                <Input
                  id="recipientName"
                  placeholder="Jane Smith"
                  value={recipientInfo.name}
                  onChange={(e) => setRecipientInfo({ ...recipientInfo, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipientEmail">Recipient Email *</Label>
                <Input
                  id="recipientEmail"
                  type="email"
                  placeholder="jane@example.com"
                  value={recipientInfo.email}
                  onChange={(e) => setRecipientInfo({ ...recipientInfo, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Personal Message (optional)</Label>
                <textarea
                  id="message"
                  placeholder="Add a personal message..."
                  value={recipientInfo.message}
                  onChange={(e) => setRecipientInfo({ ...recipientInfo, message: e.target.value })}
                  className="w-full min-h-[100px] px-3 py-2 border rounded-md text-sm"
                />
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button
                  className="flex-1 bg-pink-600 hover:bg-pink-700"
                  disabled={!recipientInfo.name || !recipientInfo.email}
                  onClick={() => setStep(3)}
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
              <CardDescription>Complete your purchase</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="purchaserName">Your Name *</Label>
                <Input
                  id="purchaserName"
                  placeholder="Your name"
                  value={purchaserInfo.name}
                  onChange={(e) => setPurchaserInfo({ ...purchaserInfo, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purchaserEmail">Your Email *</Label>
                <Input
                  id="purchaserEmail"
                  type="email"
                  placeholder="your@email.com"
                  value={purchaserInfo.email}
                  onChange={(e) => setPurchaserInfo({ ...purchaserInfo, email: e.target.value })}
                />
              </div>

              <div className="bg-pink-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between font-medium">
                  <span>Gift Card Amount</span>
                  <span className="text-pink-600">${amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>For</span>
                  <span>{recipientInfo.name}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Back
                </Button>
                <Button
                  className="flex-1 bg-pink-600 hover:bg-pink-700"
                  disabled={!purchaserInfo.name || !purchaserInfo.email || isLoading}
                  onClick={handleSubmit}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>Purchase ${amount.toFixed(2)}</>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
