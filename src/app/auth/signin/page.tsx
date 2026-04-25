'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMockAuth } from '@/components/providers/MockAuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle, Eye, EyeOff, Scissors } from 'lucide-react';

interface BusinessInfo {
  domain: string;
  businessName: string;
  logoUrl?: string;
  primaryColor: string;
}

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);
  const [showBusinessCard, setShowBusinessCard] = useState(false);
  const { signInWithEmail, signInWithGoogle } = useMockAuth();

  // Lookup business info when email changes (debounced)
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (email.includes('@') && email.includes('.')) {
        setIsLookingUp(true);
        try {
          const res = await fetch(`/api/auth/lookup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
          });
          const data = await res.json();
          if (data.exists && data.businessName) {
            setBusinessInfo({
              domain: data.domain,
              businessName: data.businessName,
              logoUrl: data.logoUrl,
              primaryColor: data.primaryColor || '#D8006E',
            });
            setShowBusinessCard(true);
          } else {
            setBusinessInfo(null);
            setShowBusinessCard(false);
          }
        } catch (err) {
          setBusinessInfo(null);
          setShowBusinessCard(false);
        } finally {
          setIsLookingUp(false);
        }
      } else {
        setBusinessInfo(null);
        setShowBusinessCard(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signInWithEmail(email, password);
      // Redirect based on role (Mock sets role to ADMIN)
      router.push('/admin/dashboard');
      router.refresh();
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      router.push('/admin/dashboard');
      router.refresh();
    } catch (err) {
      setError('Google sign in failed');
      setIsLoading(false);
    }
  };

  const defaultBg = 'from-pink-50 to-white';
  const brandColor = businessInfo?.primaryColor || '#D8006E';

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-b ${defaultBg} px-4`}>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {businessInfo ? (
            <div className="flex flex-col items-center gap-3 mb-4">
              {businessInfo.logoUrl ? (
                <img
                  src={businessInfo.logoUrl}
                  alt={businessInfo.businessName}
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <div
                  className="h-16 w-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: brandColor }}
                >
                  <Scissors className="h-8 w-8 text-white" />
                </div>
              )}
              <div>
                <CardTitle className="text-2xl font-bold" style={{ color: brandColor }}>
                  {businessInfo.businessName}
                </CardTitle>
                <CardDescription className="text-xs mt-1">
                  {businessInfo.domain}
                </CardDescription>
              </div>
            </div>
          ) : (
            <>
              <div className="h-16 w-16 rounded-full bg-pink-600 flex items-center justify-center mx-auto mb-4">
                <Scissors className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-pink-600">Welcome Back</CardTitle>
              <CardDescription>Viva La Beauty</CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading || isLookingUp}
                />
                {isLookingUp && (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
                )}
              </div>
              {showBusinessCard && businessInfo && (
                <div className="text-xs text-green-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  Business recognized: {businessInfo.businessName}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full hover:opacity-90"
              style={{ backgroundColor: brandColor }}
              disabled={isLoading || isLookingUp}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={handleGoogleSignIn}
              disabled={isLoading || isLookingUp}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center text-sm text-gray-600">
          <Link href="/auth/forgot-password" className="text-pink-600 hover:underline">
            Forgot your password?
          </Link>
          {!businessInfo && (
            <div>
              Don&apos;t have an account?{' '}
              <Link href="/auth/signup" className="text-pink-600 hover:underline">
                Sign up
              </Link>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}