import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CompleteJobDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (receivePrice?: number) => Promise<void>;
}

export function CompleteJobDialog({
  open,
  onOpenChange,
  onConfirm,
}: CompleteJobDialogProps) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm(amount ? Number(amount) : undefined);
      setAmount('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-24px)] sm:max-w-md rounded-3xl border-0 p-0 overflow-hidden shadow-2xl bg-white">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-transparent" />

          <div className="relative px-6 pt-8 sm:px-8">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900">
                Complete Job
              </DialogTitle>
            </DialogHeader>

            <p className="text-sm text-zinc-500 mt-2 mb-6">
              Enter the amount received from the customer (optional).
            </p>

            <div className="pb-6">
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                Received Amount ($)
              </label>
              <Input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={loading}
                className="[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield] h-12 rounded-xl"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 px-6 pb-6 pt-4 bg-zinc-50/80 border-t border-zinc-200/60">
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              setAmount('');
            }}
            disabled={loading}
            className="h-12 flex-1 rounded-2xl border-zinc-300 text-base font-medium"
          >
            Cancel
          </Button>
          <Button
            className="h-12 flex-1 rounded-2xl bg-green-600 hover:bg-green-700 text-white text-base font-medium shadow-lg"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Mark Complete'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
