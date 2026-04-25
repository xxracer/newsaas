'use client';

import { useState, useEffect } from 'react';
import { useMockAuth } from '@/components/providers/MockAuthProvider';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CreditCard, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

interface StripeStatus {
  connected: boolean;
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
  detailsSubmitted: boolean;
  requiresInformation: boolean;
}

export default function BillingSettingsPage() {
  const { user } = useMockAuth();
  const { colors } = useTheme();
  const [stripeStatus, setStripeStatus] = useState<StripeStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user?.studioId) return;

    // Mock Stripe status - simulate not connected initially
    const storedStatus = localStorage.getItem('mock_stripe_status_' + user.studioId);
    if (storedStatus) {
      setStripeStatus(JSON.parse(storedStatus));
    } else {
      setStripeStatus({
        connected: false,
        chargesEnabled: false,
        payoutsEnabled: false,
        detailsSubmitted: false,
        requiresInformation: false,
      });
    }
    setIsLoading(false);
  }, [user?.studioId]);

  const handleConnectStripe = async () => {
    if (!user?.studioId) return;

    setIsConnecting(true);
    setError('');

    // Simulate Stripe connection after delay
    setTimeout(() => {
      const mockStatus: StripeStatus = {
        connected: true,
        chargesEnabled: true,
        payoutsEnabled: true,
        detailsSubmitted: true,
        requiresInformation: false,
      };
      setStripeStatus(mockStatus);
      localStorage.setItem('mock_stripe_status_' + user.studioId!, JSON.stringify(mockStatus));

      // Update studio data
      const studioData = JSON.parse(localStorage.getItem('mock_studio_' + user.studioId) || '{}');
      studioData.stripeConnected = true;
      studioData.stripeAccountId = 'acct_mock_123456';
      localStorage.setItem('mock_studio_' + user.studioId, JSON.stringify(studioData));

      setIsConnecting(false);
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: colors.primary }} />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold mb-2">Configuración de Pagos</h1>
        <p className="text-gray-500">
          Conecta tu cuenta de Stripe para comenzar a recibir pagos
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!stripeStatus?.connected ? (
        <Card className="shadow-luxury-soft">
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Conectar Stripe
            </CardTitle>
            <CardDescription>
              Stripe Connect te permite recibir pagos directamente en tu cuenta bancaria
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <h4 className="font-medium">Beneficios de Stripe Connect:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Acepta tarjetas de crédito y débito
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Pagos directos a tu cuenta bancaria
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Gestión automática de reembolsos
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Compatible con Apple Pay y Google Pay
                </li>
              </ul>
            </div>

            <Button
              onClick={handleConnectStripe}
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
              disabled={isConnecting}
            >
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Conectando...
                </>
              ) : (
                'Conectar mi Cuenta de Stripe'
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              (Demo: esto simula la conexión con Stripe)
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card className="shadow-luxury-soft border-green-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="font-heading">Stripe Conectado</CardTitle>
                  <CardDescription>Tu cuenta de Stripe está activa (modo demo)</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-500 mb-1">Pagos con Tarjeta</p>
                  <p className={`font-medium ${stripeStatus.chargesEnabled ? 'text-green-600' : 'text-yellow-600'}`}>
                    {stripeStatus.chargesEnabled ? 'Activado' : 'Pendiente'}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-500 mb-1">Transferencias</p>
                  <p className={`font-medium ${stripeStatus.payoutsEnabled ? 'text-green-600' : 'text-yellow-600'}`}>
                    {stripeStatus.payoutsEnabled ? 'Activado' : 'Pendiente'}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-500 mb-1">Información</p>
                  <p className={`font-medium ${stripeStatus.detailsSubmitted ? 'text-green-600' : 'text-yellow-600'}`}>
                    {stripeStatus.detailsSubmitted ? 'Completada' : 'Pendiente'}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button variant="outline" onClick={() => window.open('https://dashboard.stripe.com', '_blank')}>
                  Ir a Stripe Dashboard (Demo)
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (!user?.studioId) return;
                    localStorage.removeItem('mock_stripe_status_' + user.studioId);
                    setStripeStatus({
                      connected: false,
                      chargesEnabled: false,
                      payoutsEnabled: false,
                      detailsSubmitted: false,
                      requiresInformation: false,
                    });
                  }}
                >
                  Desconectar Stripe
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Payment Stats Placeholder */}
          <Card className="shadow-luxury-soft">
            <CardHeader>
              <CardTitle className="font-heading">Estadísticas de Pagos</CardTitle>
              <CardDescription>Resumen de tus transacciones recientes (modo demo)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-500 mb-1">Ingresos Totales</p>
                  <p className="text-2xl font-bold">$0.00</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-500 mb-1">Transacciones este Mes</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-500 mb-1">Ticket Promedio</p>
                  <p className="text-2xl font-bold">$0.00</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
