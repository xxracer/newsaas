'use client';

import { useState, useEffect } from 'react';
import { useMockAuth } from '@/components/providers/MockAuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, MoreVertical, Edit3, Trash2, Eye, EyeOff, Package, DollarSign, Image as ImageIcon, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  category: string;
  sku: string;
  inventory: number;
  image?: string;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
}

const CATEGORIES = [
  { id: 'aftercare', name: 'Cuidado Post-Depilación', icon: '🧴' },
  { id: 'skincare', name: 'Cuidado de la Piel', icon: '✨' },
  { id: 'exfoliants', name: 'Exfoliantes', icon: '🌿' },
  { id: 'accessories', name: 'Accesorios', icon: '🎀' },
  { id: 'bundles', name: 'Paquetes', icon: '🎁' },
];

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Aftercare Oil',
    description: 'Aceite hidratante post-depilación con aloe vera y vitamina E. Calma la piel y previene irritaciones.',
    price: 25.00,
    comparePrice: 30.00,
    category: 'aftercare',
    sku: 'AC-001',
    inventory: 45,
    isActive: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Exfoliating Scrub',
    description: 'Exfoliante suave con partículas de semilla de albaricoque. Previene vellos encarnados.',
    price: 30.00,
    category: 'exfoliants',
    sku: 'EX-001',
    inventory: 32,
    isActive: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Ingrown Hair Serum',
    description: 'Serum tratamiento para vellos encarnados. Ácido salicílico y árbol de té.',
    price: 35.00,
    category: 'skincare',
    sku: 'SK-001',
    inventory: 28,
    isActive: true,
    isFeatured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Soothing Gel',
    description: 'Gel calmante con menta y camomila. Refresca la piel después del waxing.',
    price: 20.00,
    category: 'aftercare',
    sku: 'AC-002',
    inventory: 50,
    isActive: true,
    isFeatured: false,
    createdAt: new Date().toISOString(),
  },
];

export default function ProductsPage() {
  const { user } = useMockAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    comparePrice: undefined,
    category: 'aftercare',
    sku: '',
    inventory: 0,
    isActive: true,
    isFeatured: false,
  });

  useEffect(() => {
    if (user?.studioId) {
      const stored = localStorage.getItem(`mock_products_${user.studioId}`);
      if (stored) {
        setProducts(JSON.parse(stored));
      } else {
        setProducts(DEFAULT_PRODUCTS);
        localStorage.setItem(`mock_products_${user.studioId}`, JSON.stringify(DEFAULT_PRODUCTS));
      }
    }
  }, [user?.studioId]);

  const saveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    if (user?.studioId) {
      localStorage.setItem(`mock_products_${user.studioId}`, JSON.stringify(updatedProducts));
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      comparePrice: undefined,
      category: 'aftercare',
      sku: '',
      inventory: 0,
      isActive: true,
      isFeatured: false,
    });
    setIsDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({ ...product });
    setIsDialogOpen(true);
  };

  const handleDeleteProduct = (productId: string) => {
    const updated = products.filter(p => p.id !== productId);
    saveProducts(updated);
  };

  const handleToggleActive = (productId: string) => {
    const updated = products.map(p =>
      p.id === productId ? { ...p, isActive: !p.isActive } : p
    );
    saveProducts(updated);
  };

  const handleToggleFeatured = (productId: string) => {
    const updated = products.map(p =>
      p.id === productId ? { ...p, isFeatured: !p.isFeatured } : p
    );
    saveProducts(updated);
  };

  const handleSaveProduct = () => {
    if (!formData.name || !formData.price) return;

    if (editingProduct) {
      const updated = products.map(p =>
        p.id === editingProduct.id
          ? { ...p, ...formData, price: Number(formData.price), inventory: Number(formData.inventory) }
          : p
      );
      saveProducts(updated);
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name || '',
        description: formData.description || '',
        price: Number(formData.price) || 0,
        comparePrice: formData.comparePrice ? Number(formData.comparePrice) : undefined,
        category: formData.category || 'aftercare',
        sku: formData.sku || `SKU-${Date.now()}`,
        inventory: Number(formData.inventory) || 0,
        isActive: formData.isActive ?? true,
        isFeatured: formData.isFeatured ?? false,
        createdAt: new Date().toISOString(),
      };
      saveProducts([...products, newProduct]);
    }
    setIsDialogOpen(false);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesTab = activeTab === 'all' ? true :
                      activeTab === 'active' ? product.isActive :
                      activeTab === 'inactive' ? !product.isActive :
                      activeTab === 'featured' ? product.isFeatured :
                      activeTab === 'low-stock' ? product.inventory < 10 : true;

    return matchesSearch && matchesCategory && matchesTab;
  });

  const stats = {
    total: products.length,
    active: products.filter(p => p.isActive).length,
    featured: products.filter(p => p.isFeatured).length,
    lowStock: products.filter(p => p.inventory < 10).length,
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold mb-2">Productos</h1>
          <p className="text-gray-500">Gestiona tu catálogo de productos</p>
        </div>
        <Button onClick={handleAddProduct} className="gap-2">
          <Plus className="w-4 h-4" />
          Agregar Producto
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-gray-500">Total Productos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.active}</p>
                <p className="text-xs text-gray-500">Activos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.featured}</p>
                <p className="text-xs text-gray-500">Destacados</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.lowStock}</p>
                <p className="text-xs text-gray-500">Stock Bajo</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {CATEGORIES.map(cat => (
              <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="active">Activos</TabsTrigger>
          <TabsTrigger value="inactive">Inactivos</TabsTrigger>
          <TabsTrigger value="featured">Destacados</TabsTrigger>
          <TabsTrigger value="low-stock">Stock Bajo</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <Card key={product.id} className={`group ${!product.isActive ? 'opacity-60' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                      <Edit3 className="w-4 h-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleToggleActive(product.id)}>
                      {product.isActive ? (
                        <>
                          <EyeOff className="w-4 h-4 mr-2" />
                          Desactivar
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 mr-2" />
                          Activar
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleToggleFeatured(product.id)}>
                      <DollarSign className="w-4 h-4 mr-2" />
                      {product.isFeatured ? 'Quitar destacado' : 'Destacar'}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold truncate">{product.name}</h3>
                  {product.isFeatured && (
                    <Badge className="bg-amber-100 text-amber-700 text-xs">Destacado</Badge>
                  )}
                </div>
                <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold">${product.price}</span>
                  {product.comparePrice && (
                    <span className="text-sm text-gray-400 line-through">${product.comparePrice}</span>
                  )}
                </div>
                <Badge variant="secondary" className="text-xs">
                  {CATEGORIES.find(c => c.id === product.category)?.name}
                </Badge>
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-400" />
                  <span className={`text-sm ${product.inventory < 10 ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                    {product.inventory} unidades
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">SKU:</span>
                  <span className="text-xs font-mono">{product.sku}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 mb-4">No se encontraron productos</p>
            <Button onClick={handleAddProduct} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Producto
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</DialogTitle>
            <DialogDescription>
              {editingProduct ? 'Actualiza la información del producto' : 'Completa los datos del nuevo producto'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Producto *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Aftercare Oil"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe el producto y sus beneficios..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Precio *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="comparePrice">Precio Comparación</Label>
                <Input
                  id="comparePrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.comparePrice || ''}
                  onChange={(e) => setFormData({ ...formData, comparePrice: e.target.value ? parseFloat(e.target.value) : undefined })}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="SKU-001"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="inventory">Inventario</Label>
              <Input
                id="inventory"
                type="number"
                min="0"
                value={formData.inventory}
                onChange={(e) => setFormData({ ...formData, inventory: parseInt(e.target.value) })}
                placeholder="0"
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-gray-500" />
                <div>
                  <Label htmlFor="isActive" className="font-medium">Producto Activo</Label>
                  <p className="text-xs text-gray-500">Visible en tu tienda</p>
                </div>
              </div>
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-amber-500" />
                <div>
                  <Label htmlFor="isFeatured" className="font-medium">Producto Destacado</Label>
                  <p className="text-xs text-gray-500">Aparece en sección de destacados</p>
                </div>
              </div>
              <Switch
                id="isFeatured"
                checked={formData.isFeatured}
                onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: checked })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveProduct} disabled={!formData.name || !formData.price}>
              {editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
