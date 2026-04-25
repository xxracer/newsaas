'use client';

import { useState } from 'react';
import { MoreVertical, Pencil, Copy, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface MenuItem {
  label: string;
  href?: string;
  action?: string;
  data?: any;
  destructive?: boolean;
}

interface MoreActionsProps {
  items: MenuItem[];
  onAction: (action: string, data: any) => void;
}

export function MoreActions({ items, onAction }: MoreActionsProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleClick = async (item: MenuItem) => {
    if (item.href) {
      window.location.href = item.href;
      return;
    }

    if (item.action) {
      setLoading(item.action);
      try {
        await onAction(item.action, item.data);
      } finally {
        setLoading(null);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {items.map((item, index) => (
          <div key={index}>
            {item.label === 'Delete' || item.destructive ? (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleClick(item)}
                  className="text-red-600 focus:text-red-600 cursor-pointer"
                  disabled={loading !== null}
                >
                  {loading === item.action ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="mr-2 h-4 w-4" />
                  )}
                  {item.label}
                </DropdownMenuItem>
              </>
            ) : item.label === 'Edit' ? (
              <DropdownMenuItem onClick={() => handleClick(item)} className="cursor-pointer">
                <Pencil className="mr-2 h-4 w-4" />
                {item.label}
              </DropdownMenuItem>
            ) : item.label === 'Duplicate' ? (
              <DropdownMenuItem onClick={() => handleClick(item)} className="cursor-pointer">
                <Copy className="mr-2 h-4 w-4" />
                {item.label}
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => handleClick(item)} className="cursor-pointer">
                {item.label}
              </DropdownMenuItem>
            )}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
