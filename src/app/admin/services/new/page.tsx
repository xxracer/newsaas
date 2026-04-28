'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  gender: string;
  businessType: string;
}

interface ServiceFormData {
  name: string;
  slug: string;
  description: string;
  price: string;
  duration: string;
  categoryId: string;
  gender: string;
  imageUrl: string;
  bufferBefore: string;
  bufferAfter: string;
  isActive: boolean;
  sortOrder: string;
}

const businessTypeLabels: Record<string, string> = {
  waxing: 'Waxing',
  barber: 'Barber Shop',
  nails: 'Nail Salon',
  hair: 'Hair Salon',
  tattoo: 'Tattoo Studio',
  massage: 'Massage Spa',
  skincare: 'Skin Care',
  'brow-lash': 'Brow & Lash',
  tanning: 'Tanning Salon',
  default: 'Beauty',
};

export default function NewServicePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [businessType, setBusinessType] = useState('waxing');
  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    slug: '',
    description: '',
    price: '',
    duration: '30',
    categoryId: '',
    gender: 'FEMALE',
    imageUrl: '',
    bufferBefore: '0',
    bufferAfter: '0',
    isActive: true,
    sortOrder: '0',
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('mock_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user?.studioId) {
          const studioData = localStorage.getItem('mock_studio_' + user.studioId);
          if (studioData) {
            const studio = JSON.parse(studioData);
            if (studio.businessType) {
              setBusinessType(studio.businessType);
            }
          }
        }
      } catch (e) {
        console.error('Error reading studio data:', e);
      }
    }
  }, []);

  useEffect(() => {
    fetch(`/api/services/categories?businessType=${encodeURIComponent(businessType)}`)
      .then((res) => res.ok ? res.json() : [])
      .then((data) => {
        setCategories(data);
        if (data.length > 0 && !formData.categoryId) {
          setFormData((prev) => ({ ...prev, categoryId: data[0].id }));
        }
      })
      .catch(() => setCategories([]));
  }, [businessType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'name') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          duration: parseInt(formData.duration),
          bufferBefore: parseInt(formData.bufferBefore),
          bufferAfter: parseInt(formData.bufferAfter),
          sortOrder: parseInt(formData.sortOrder),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create service');
      }

      router.push('/admin/services');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const label = businessTypeLabels[businessType] || businessTypeLabels.default;

  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/admin/services">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Services
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Add New Service</h1>
        <p className="text-gray-500">Create a new {label.toLowerCase()} service</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="name">Service Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={`e.g., ${businessType === 'barber' ? 'Classic Cut' : businessType === 'nails' ? 'Gel Manicure' : 'Brazilian Wax'}`}
                  required
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="slug">URL Slug *</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="service-slug"
                  required
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the service..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="price">Price ($) *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="45.00"
                  required
                />
              </div>

              <div>
                <Label htmlFor="duration">Duration (minutes) *</Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  min="5"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="categoryId">Category *</Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, categoryId: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FEMALE">Female</SelectItem>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="UNISEX">Unisex</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="bufferBefore">Buffer Before (min)</Label>
                <Input
                  id="bufferBefore"
                  name="bufferBefore"
                  type="number"
                  min="0"
                  value={formData.bufferBefore}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="bufferAfter">Buffer After (min)</Label>
                <Input
                  id="bufferAfter"
                  name="bufferAfter"
                  type="number"
                  min="0"
                  value={formData.bufferAfter}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>

              <div>
                <Label htmlFor="sortOrder">Sort Order</Label>
                <Input
                  id="sortOrder"
                  name="sortOrder"
                  type="number"
                  min="0"
                  value={formData.sortOrder}
                  onChange={handleChange}
                />
              </div>

              <div className="col-span-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))}
                  />
                  <Label htmlFor="isActive">Active (visible on booking)</Label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Service'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
