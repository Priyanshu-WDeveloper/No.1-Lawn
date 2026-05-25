import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import { ROUTES } from '@/constants';
import { useSuperAdminChangePasswordMutation } from '@/API/api';

export default function SuperAdminChangePasswordPage() {
  const navigate = useNavigate();
  const [changePassword, { isLoading }] =
    useSuperAdminChangePasswordMutation();
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.oldPassword ||
      !form.newPassword ||
      !form.confirmPassword
    ) {
      toast.error('All fields are required');
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (form.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    try {
      await changePassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      }).unwrap();
      toast.success('Password changed successfully');
      navigate(ROUTES.SUPER_ADMIN_DASHBOARD);
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to change password');
    }
  };

  return (
    <div className="max-h-full h-screen bg-[#eef5df] flex flex-col px-6 pt-6 pb-3">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full h-full max-w-8xl bg-[#f8f8f4] rounded-[28px] shadow-xl overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <div className="h-full grid lg:grid-cols-2">
              {/* Left Section */}
              <div className="relative overflow-hidden hidden lg:block">
                <img
                  src="/bg.jpg"
                  alt="Nature"
                  className="absolute inset-0 h-full w-full object-fill"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-[#ffffffd9] via-[#ffffff80] to-[#00000030]" />

                <div className="relative z-10 flex flex-col h-full p-10 lg:p-14">
                  {/* Logo */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary shrink-0 flex items-center justify-center p-[2px]">
                      <img
                        src="/image.png"
                        alt="Logo"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>

                    <h1 className="text-3xl font-bold text-primary">
                      Super Admin
                    </h1>
                  </div>

                  <div className="mt-20">
                    <h2 className="text-5xl font-bold text-primary leading-tight">
                      Admin Control
                    </h2>

                    <p className="mt-5 text-xl text-gray-700 max-w-md leading-9">
                      Access the control panel to manage all
                      administrators
                    </p>

                    {/* Divider */}
                    <div className="flex items-center gap-4 mt-8">
                      <div className="h-[1px] w-20 bg-primary/30" />

                      <Shield className="w-5 h-5 text-primary" />

                      <div className="h-[1px] w-20 bg-primary/30" />
                    </div>

                    {/* Quote Card */}
                    <div className="mt-10 bg-white/70 backdrop-blur-md border border-white/40 shadow-lg rounded-2xl p-5 max-w-sm">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary overflow-hidden shrink-0 flex items-center justify-center">
                          <Shield className="text-white w-6 h-6" />
                        </div>

                        <p className="text-gray-700 leading-7">
                          Secure access to manage all admin users and
                          system settings.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1" />
                </div>
              </div>

              {/* Right Section */}
              <div className="bg-[#f8f8f4] flex items-center justify-center p-8 lg:px-12 lg:py-4">
                <div>
                  <div className="w-full max-w-2xl bg-white rounded-[28px] shadow-lg border border-gray-100 p-8">
                    <div className="text-center">
                      <h2 className="text-4xl font-bold text-primary">
                        Change Password
                      </h2>

                      <p className="text-gray-500 mt-3 text-lg">
                        Enter your current password and a new password
                      </p>
                    </div>

                    {/* Form */}
                    <form
                      onSubmit={handleSubmit}
                      className="mt-10 space-y-6"
                    >
                      {/* Current Password */}
                      <div>
                        <label className="text-gray-700 font-medium">
                          Current Password
                        </label>

                        <div className="mt-2 relative">
                          <input
                            type={showOld ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={form.oldPassword}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                oldPassword: e.target.value,
                              })
                            }
                            className="h-12 w-full rounded-xl border border-border bg-background px-4 pr-12 text-sm outline-none transition-colors focus:border-primary"
                          />
                          <button
                            type="button"
                            onClick={() => setShowOld(!showOld)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showOld ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* New Password */}
                      <div>
                        <label className="text-gray-700 font-medium">
                          New Password
                        </label>

                        <div className="mt-2 relative">
                          <input
                            type={showNew ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={form.newPassword}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                newPassword: e.target.value,
                              })
                            }
                            className="h-12 w-full rounded-xl border border-border bg-background px-4 pr-12 text-sm outline-none transition-colors focus:border-primary"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNew(!showNew)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showNew ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Confirm New Password */}
                      <div>
                        <label className="text-gray-700 font-medium">
                          Confirm New Password
                        </label>

                        <div className="mt-2 relative">
                          <input
                            type={showConfirm ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={form.confirmPassword}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                confirmPassword: e.target.value,
                              })
                            }
                            className="h-12 w-full rounded-xl border border-border bg-background px-4 pr-12 text-sm outline-none transition-colors focus:border-primary"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirm(!showConfirm)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showConfirm ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => navigate(-1)}
                          className="h-12 flex-1 rounded-xl border border-border text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="h-12 flex-1 rounded-xl bg-[var(--sidebar-bg-from)] text-sm font-medium text-white transition-colors hover:bg-[var(--sidebar-bg-to)] disabled:opacity-50"
                        >
                          {isLoading
                            ? 'Updating...'
                            : 'Update Password'}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Bottom Info */}
                  <div className="border-t border-gray-200 px-1 pt-4 pb-3 flex lg:flex-row items-center justify-between gap-6">
                    {/* <div className="flex flex-wrap items-center justify-center gap-8"> */}
                    {/* <div className="flex flex-row items-center justify-center gap-10 flex-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Shield className="w-5 h-5 text-primary" />
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-700">
                            Secure Access
                          </h4>
                          <p className="text-sm text-gray-500">
                            Protected management
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Shield className="w-5 h-5 text-primary" />
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-700">
                            Full Control
                          </h4>
                          <p className="text-sm text-gray-500">
                            Admin user management
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Shield className="w-5 h-5 text-primary" />
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-700">
                            System Settings
                          </h4>
                          <p className="text-sm text-gray-500">
                            Configure & manage
                          </p>
                        </div>
                      </div>
                    </div> */}
                    <div className=" pt-1 flex flex-row items-center justify-center gap-10 flex-nowrap">
                      <div className="flex items-center gap-3 min-w-fit">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Shield className="w-5 h-5 text-primary" />
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-700 whitespace-nowrap">
                            Secure Access
                          </h4>

                          <p className="text-sm text-gray-500 whitespace-nowrap">
                            Protected management
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 min-w-fit">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Shield className="w-5 h-5 text-primary" />
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-700 whitespace-nowrap">
                            Full Control
                          </h4>

                          <p className="text-sm text-gray-500 whitespace-nowrap">
                            Admin user management
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 min-w-fit">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Shield className="w-5 h-5 text-primary" />
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-700 whitespace-nowrap">
                            System Settings
                          </h4>

                          <p className="text-sm text-gray-500 whitespace-nowrap">
                            Configure & manage
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Footer */}
      <div className="w-full px-10 pt-5">
        <div className="flex flex-wrap items-center justify-center gap-4 text-[15px] text-[#6d6d6d]">
          <span>© 2026 No. 1 Lawns. All rights reserved.</span>

          <span className="text-[#bdbdbd]">|</span>

          <button className="hover:text-primary transition">
            Privacy Policy
          </button>

          <span className="text-[#bdbdbd]">|</span>

          <button className="hover:text-primary transition">
            Terms of Service
          </button>
        </div>
      </div>
    </div>
  );
}
