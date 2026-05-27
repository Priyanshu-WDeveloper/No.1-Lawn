import { useState } from 'react';
import { z } from 'zod';
import toast from 'react-hot-toast';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  ShieldCheck,
  LockKeyhole,
  Eye,
  EyeOff,
  CheckCircle2,
  Loader2,
  X,
} from 'lucide-react';
import { useSuperAdminChangePasswordMutation } from '@/API/api';

const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, 'Current password is required'),

    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Must contain at least one number')
      .regex(
        /[^A-Za-z0-9]/,
        'Must contain at least one special character',
      ),

    confirmPassword: z
      .string()
      .min(1, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChangeSuperAdminPasswordDialog({
  open,
  onOpenChange,
}: ChangePasswordDialogProps) {
  const [loading, setLoading] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [changePassword, { isLoading }] =
    useSuperAdminChangePasswordMutation();

  const handleSubmit = async () => {
    setSubmitted(true);

    const result = changePasswordSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        currentPassword: fieldErrors.currentPassword?.[0],
        newPassword: fieldErrors.newPassword?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
      });

      // toast.error(
      //   result.error.issues[0]?.message || 'Validation failed',
      // );

      return;
    }

    setErrors({});

    setLoading(true);

    try {
      // await onConfirm({
      //   currentPassword: form.currentPassword,
      //   newPassword: form.newPassword,
      // });
      await changePassword({
        oldPassword: form.currentPassword,
        newPassword: form.newPassword,
      }).unwrap();

      toast.success('Password updated successfully');

      setForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });

      setSubmitted(false);

      onOpenChange(false);
    } catch (error: any) {
      toast.error(
        error?.data?.message || 'Failed to update password',
      );
    } finally {
      setLoading(false);
    }
  };

  // const passwordRules = [
  //   {
  //     valid: form.newPassword.length >= 8,
  //     label: 'At least 8 characters long',
  //   },
  //   {
  //     valid: /[A-Z]/.test(form.newPassword),
  //     label: 'Contains uppercase letters (A-Z)',
  //   },
  //   {
  //     valid: /[0-9]/.test(form.newPassword),
  //     label: 'Contains numbers (0-9)',
  //   },
  //   {
  //     valid: /[^A-Za-z0-9]/.test(form.newPassword),
  //     label: 'Contains special characters (!@#$...)',
  //   },
  // ];

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        onOpenChange(value);

        if (!value) {
          setErrors({});
          setSubmitted(false);

          setForm({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          });
        }
      }}
    >
      <DialogContent className="[&>button]:hidden w-[calc(100%-20px)] sm:max-w-xl overflow-hidden rounded-[36px] border-0 bg-transparent p-0 shadow-[0_30px_90px_rgba(0,0,0,0.22)]">
        <div className="overflow-hidden rounded-[36px] bg-white">
        {/* Header */}
          <div className="relative rounded-t-[36px] bg-gradient-to-br from-green-600 to-green-700 px-5 pt-6 pb-4 sm:px-8 sm:pt-8 sm:pb-18">
          {/* Background circles */}
          <div className="hidden sm:block absolute inset-0 opacity-10">
            <div className="absolute top-6 right-8 h-28 w-28 rounded-full bg-white" />
            <div className="absolute top-20 right-24 h-16 w-16 rounded-full bg-white" />
          </div>

          {/* Close Button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white/80 backdrop-blur-md transition-all hover:bg-white/25 hover:text-white sm:right-5 sm:top-5 sm:h-11 sm:w-11"
          >
            <X className="h-5 w-5" />
          </button>

          <DialogHeader className="relative z-10">
            <DialogTitle className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Change Password
            </DialogTitle>

            <p className="mt-2 hidden text-sm leading-relaxed text-green-50/90 sm:block">
              Keep your account secure
            </p>
          </DialogHeader>

          {/* Center Icon */}
          <div className="absolute left-1/2 bottom-0 hidden sm:flex h-24 w-24 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full border-8 border-white bg-white shadow-xl">
            <ShieldCheck className="h-10 w-10 text-green-600" />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white px-5 pb-5 pt-10 sm:px-8 sm:pb-7 sm:pt-24">
          <div className="space-y-4 sm:space-y-5">
            {/* Current Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-green-700">
                Current Password
              </label>

              <div className="relative">
                <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-green-600" />

                <Input
                  type={showCurrent ? 'text' : 'password'}
                  placeholder="Enter current password"
                  value={form.currentPassword}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      currentPassword: e.target.value,
                    });

                    if (submitted && errors.currentPassword) {
                      setErrors((prev) => ({
                        ...prev,
                        currentPassword: undefined,
                      }));
                    }
                  }}
                  disabled={loading}
                  className={`h-14 rounded-2xl border bg-[#f4fbf4] pl-12 pr-12 focus-visible:ring-green-500 ${
                    submitted && errors.currentPassword
                      ? 'border-red-400 focus-visible:ring-red-400'
                      : 'border-green-200'
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600"
                >
                  {showCurrent ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {submitted && errors.currentPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.currentPassword}
                </p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-green-700">
                New Password
              </label>

              <div className="relative">
                <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-green-600" />

                <Input
                  type={showNew ? 'text' : 'password'}
                  placeholder="Enter new password"
                  value={form.newPassword}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      newPassword: e.target.value,
                    });

                    if (submitted && errors.newPassword) {
                      setErrors((prev) => ({
                        ...prev,
                        newPassword: undefined,
                      }));
                    }
                  }}
                  disabled={loading}
                  className={`h-14 rounded-2xl border bg-[#f4fbf4] pl-12 pr-12 focus-visible:ring-green-500 ${
                    submitted && errors.newPassword
                      ? 'border-red-400 focus-visible:ring-red-400'
                      : 'border-green-200'
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600"
                >
                  {showNew ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {submitted && errors.newPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.newPassword}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-green-700">
                Confirm Password
              </label>

              <div className="relative">
                <CheckCircle2 className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-green-600" />

                <Input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Re-enter new password"
                  value={form.confirmPassword}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      confirmPassword: e.target.value,
                    });

                    if (submitted && errors.confirmPassword) {
                      setErrors((prev) => ({
                        ...prev,
                        confirmPassword: undefined,
                      }));
                    }
                  }}
                  disabled={loading}
                  className={`h-14 rounded-2xl border bg-[#f4fbf4] pl-12 pr-12 focus-visible:ring-green-500 ${
                    submitted && errors.confirmPassword
                      ? 'border-red-400 focus-visible:ring-red-400'
                      : 'border-green-200'
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600"
                >
                  {showConfirm ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {submitted && errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Password Tips */}
            {/* <div className="rounded-2xl border border-green-200 bg-[#f4fbf4] p-5">
              <div className="mb-4 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-green-600" />

                <h4 className="font-semibold text-green-700">
                  Password Tips
                </h4>
              </div>

              <div className="space-y-2 text-sm">
                {passwordRules.map((rule) => (
                  <div
                    key={rule.label}
                    className={`flex items-center gap-2 ${
                      rule.valid ? 'text-green-700' : 'text-gray-500'
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" />

                    <span>{rule.label}</span>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                type="button"
                variant="outline"
                disabled={loading}
                onClick={() => onOpenChange(false)}
                className="h-12 flex-1 rounded-xl border-green-500 text-green-700 hover:bg-green-50"
              >
                Cancel
              </Button>

              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="h-12 flex-1 rounded-xl bg-green-600 text-white hover:bg-green-700"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  'Update Password'
                )}
              </Button>
            </div>
          </div>
        </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
