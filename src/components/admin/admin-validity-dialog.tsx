import { useState } from 'react';
import { Calendar as CalendarIcon, Mail, Phone, User } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { useSetAdminValidityMutation } from '@/API/api';
import type { IAdminUser } from '@/types';
import toast from 'react-hot-toast';

import { getErrorMessage } from '@/lib/get-error-message';

interface AdminValidityDialogProps {
  admin: IAdminUser;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AdminValidityDialog({
  admin,
  open,
  onOpenChange,
}: AdminValidityDialogProps) {
  const [setValidity, { isLoading }] = useSetAdminValidityMutation();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    admin.validity ? new Date(admin.validity) : undefined,
  );

  const handleSubmit = async () => {
    if (!selectedDate) {
      toast.error('Please select a date');
      return;
    }
    const validity = new Date(
      Date.UTC(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
      ),
    ).toISOString();
    try {
      await setValidity({ id: admin._id, validity }).unwrap();
      toast.success('Validity updated');
      onOpenChange(false);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to update validity'));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            {admin.validity ? 'Change Admin Validity' : 'Set Admin Validity'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg border bg-gray-50 p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{admin.fullName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="h-4 w-4" />
              <span>{admin.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="h-4 w-4" />
              <span>
                {admin.countryCode} {admin.phoneNumber}
              </span>
            </div>
          </div>

          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              defaultMonth={selectedDate}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? 'Saving...' : admin.validity ? 'Update Validity' : 'Set Validity'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
