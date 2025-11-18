'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TrackOrderFormProps {
  initialOrderId?: string;
  serverError?: string;
}

export const TrackOrderForm: React.FC<TrackOrderFormProps> = ({
  initialOrderId = '',
  serverError = '',
}) => {
  const [orderId, setOrderId] = useState(initialOrderId);
  const [clientError, setClientError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) {
      setClientError('Please enter an order ID');
      return;
    }

    setClientError('');

    const params = new URLSearchParams();
    params.set('orderId', orderId.trim());

    router.push(`/track-order?${params.toString()}`);
  };

  const error = clientError || serverError;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="order-id">Order ID</Label>
        <div className="flex gap-2">
          <Input
            id="order-id"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter your order ID"
            className="flex-1"
          />
          <Button type="submit">
            Track Order
          </Button>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    </form>
  );
};
