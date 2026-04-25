'use client';

import { useState, useEffect } from 'react';
import { useMockAuth } from '@/components/providers/MockAuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gift, Search, Plus, Copy, CheckCircle, XCircle, Calendar, DollarSign, QrCode, Mail, MoreVertical, TrendingUp, Package } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GiftCard {
  id: string;
  code: string;
  amount: number;
  balance: number;
  recipientName: string;
  recipientEmail?: string;
  senderName?: string;
  message?: string;
  status: 'ACTIVE' | 'REDEEMED' | 'EXPIRED' | 'CANCELLED';
  createdAt: Date;
  expiresAt: Date;
  redeemedAt?: Date;
}

const DEFAULT_GIFT_CARDS: GiftCard[] = [
  {
    id: '1',
    code: 'WAX-2024-001',
    amount: 75,
    balance: 75,
    recipientName: 'Ana Martinez',
    recipientEmail: 'ana@email.com',
    senderName: 'Carlos Martinez',
    message: 'Feliz cumpleaños! Disfruta tu día de spa.',
    status: 'ACTIVE',
    createdAt: new Date('2024-01-01'),
    expiresAt: new Date('2025-01-01'),
  },
  {
    id: '2',
    code: 'WAX-2024-002',
    amount: 200,
    balance: 0,
    recipientName: 'Laura Gomez',
    recipientEmail: 'laura@email.com',
    senderName: 'Pedro Gomez',
    status: 'REDEEMED',
    createdAt: new Date('2023-12-15'),
    expiresAt: new Date('2024-12-15'),
    redeemedAt: new Date('2024-01-05'),
  },
  {
    id: '3',
    code: 'WAX-2024-003',
    amount: 50,
    balance: 50,
    recipientName: 'Sofia Rodriguez',
    status: 'ACTIVE',
    createdAt: new Date('2024-01-10'),
    expiresAt: new Date('2025-01-10'),
  },
];

const PREDEFINED_AMOUNTS = [25, 50, 75, 100, 150, 200, 250, 500];

export default function GiftCardsPage() {
  const { user } = useMockAuth();
  const [giftCards, setGiftCards] = useState<GiftCard[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const [formData, setFormData] = useState({
    amount: 75,
    recipientName: '',
    recipientEmail: '',
    senderName: '',
    message: '',
  });

  useEffect(() => {
    if (user?.studioId) {
      const stored = localStorage.getItem(`mock_giftcards_${user.studioId}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        setGiftCards(parsed.map((g: any) => ({
          ...g,
          createdAt: new Date(g.createdAt),
          expiresAt: new Date(g.expiresAt),
          redeemedAt: g.redeemedAt ? new Date(g.redeemedAt) : undefined,
        })));
      } else {
        setGiftCards(DEFAULT_GIFT_CARDS);
        localStorage.setItem(`mock_giftcards_${user.studioId}`, JSON.stringify(DEFAULT_GIFT_CARDS));
      }
    }
  }, [user?.studioId]);

  const saveGiftCards = (updated: GiftCard[]) => {
    setGiftCards(updated);
    if (user?.studioId) {
      localStorage.setItem(`mock_giftcards_${user.studioId}`, JSON.stringify(updated));
    }
  };

  const generateCode = () => {
    const prefix = 'WAX';
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    return `${prefix}-${year}-${random}`;
  };

  const handleCreateGiftCard = () => {
    const newGiftCard: GiftCard = {
      id: Date.now().toString(),
      code: generateCode(),
      amount: formData.amount,
      balance: formData.amount,
      recipientName: formData.recipientName,
      recipientEmail: formData.recipientEmail || undefined,
      senderName: formData.senderName || undefined,
      message: formData.message || undefined,
      status: 'ACTIVE',
      createdAt: new Date(),
      expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    };
    saveGiftCards([...giftCards, newGiftCard]);
    setIsDialogOpen(false);
    setFormData({
      amount: 75,
      recipientName: '',
      recipientEmail: '',
      senderName: '',
      message: '',
    });
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleRedeem = (id: string) => {
    const updated = giftCards.map(g =>
      g.id === id ? { ...g, status: 'REDEEMED' as const, redeemedAt: new Date(), balance: 0 } : g
    );
    saveGiftCards(updated);
  };

  const handleCancel = (id: string) => {
    const updated = giftCards.map(g =>
      g.id === id ? { ...g, status: 'CANCELLED' as const } : g
    );
    saveGiftCards(updated);
  };

  const filteredGiftCards = giftCards.filter(card => {
    const matchesSearch =
      card.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (card.recipientEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

    const matchesTab = activeTab === 'all' ? true :
                      activeTab === 'active' ? card.status === 'ACTIVE' :
                      activeTab === 'redeemed' ? card.status === 'REDEEMED' :
                      activeTab === 'expired' ? card.status === 'EXPIRED' :
                      true;

    return matchesSearch && matchesTab;
  });

  const stats = {
    total: giftCards.length,
    active: giftCards.filter(g => g.status === 'ACTIVE').length,
    redeemed: giftCards.filter(g => g.status === 'REDEEMED').length,
    totalValue: giftCards.reduce((sum, g) => sum + g.amount, 0),
    totalRedeemed: giftCards.filter(g => g.status === 'REDEEMED').reduce((sum, g) => sum + g.amount, 0),
  };

  const getStatusBadge = (status: GiftCard['status']) => {
    const variants: Record<string, { className: string; label: string }> = {
      ACTIVE: { className: 'bg-green-100 text-green-700', label: 'Activa' },
      REDEEMED: { className: 'bg-blue-100 text-blue-700', label: 'Canjeada' },
      EXPIRED: { className: 'bg-red-100 text-red-700', label: 'Expirada' },
      CANCELLED: { className: 'bg-gray-100 text-gray-700', label: 'Cancelada' },
    };
    const variant = variants[status];
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold mb-2">Gift Cards</h1>
        <p className="text-gray-500">Gestiona las tarjetas de regalo de tu estudio</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center">
                <Gift className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-gray-500">Total Gift Cards</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.active}</p>
                <p className="text-xs text-gray-500">Activas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">${stats.totalValue}</p>
                <p className="text-xs text-gray-500">Valor Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <Package className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">${stats.totalRedeemed}</p>
                <p className="text-xs text-gray-500">Canjeado</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Buscar por código o destinatario..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Nueva Gift Card
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="active">Activas</TabsTrigger>
          <TabsTrigger value="redeemed">Canjeadas</TabsTrigger>
          <TabsTrigger value="expired">Expiradas</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Gift Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGiftCards.map((card) => (
          <Card key={card.id} className={card.status !== 'ACTIVE' ? 'opacity-70' : ''}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-4">
                {getStatusBadge(card.status)}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {card.status === 'ACTIVE' && (
                      <DropdownMenuItem onClick={() => handleRedeem(card.id)}>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Marcar como Canjeada
                      </DropdownMenuItem>
                    )}
                    {card.status === 'ACTIVE' && (
                      <DropdownMenuItem onClick={() => handleCancel(card.id)}>
                        <XCircle className="w-4 h-4 mr-2" />
                        Cancelar
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => handleCopyCode(card.code)}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar Código
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="text-center mb-4">
                <p className="text-4xl font-bold text-pink-600">${card.amount}</p>
                <p className="text-sm text-gray-500">Gift Card</p>
              </div>

              <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between">
                  <code className="text-sm font-mono text-pink-700">{card.code}</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopyCode(card.code)}
                    className="h-8"
                  >
                    {copiedCode === card.code ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{card.recipientName}</span>
                </div>
                {card.recipientEmail && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{card.recipientEmail}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">
                    Expira: {new Date(card.expiresAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {card.balance !== card.amount && card.status === 'ACTIVE' && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-500">
                    Balance restante: <span className="font-semibold">${card.balance}</span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Gift Card Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Nueva Gift Card</DialogTitle>
            <DialogDescription>Crea una nueva tarjeta de regalo</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Monto</label>
              <div className="grid grid-cols-4 gap-2">
                {PREDEFINED_AMOUNTS.map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    variant={formData.amount === amount ? 'default' : 'outline'}
                    onClick={() => setFormData({ ...formData, amount })}
                    className="w-full"
                  >
                    ${amount}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Nombre del Destinatario *</label>
              <Input
                value={formData.recipientName}
                onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                placeholder="Ej: Ana Martínez"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email del Destinatario</label>
              <Input
                type="email"
                value={formData.recipientEmail}
                onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
                placeholder="ana@email.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tu Nombre (Remitente)</label>
              <Input
                value={formData.senderName}
                onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                placeholder="Ej: Carlos Martínez"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Mensaje Personal</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Escribe un mensaje personal..."
                className="w-full px-3 py-2 border rounded-md min-h-[80px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleCreateGiftCard}
              disabled={!formData.recipientName}
            >
              Crear Gift Card
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
