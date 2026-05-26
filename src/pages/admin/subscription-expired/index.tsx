import { Lock } from 'lucide-react';

import { AppLayout } from '@/components/layout/app-layout';
import { Navbar } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { format } from 'date-fns';

export default function SubscriptionExpiredPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const validityMissing = !user?.validity;

  return (
    <AppLayout>
      <main className="flex-1 h-full px-4 pt-9">
        <Navbar
          title={validityMissing ? 'Validity Not Configured' : 'Subscription Expired'}
          subtitle={
            validityMissing
              ? 'Your subscription validity has not been configured yet.'
              : 'Your subscription has expired. Please renew to continue using the dashboard.'
          }
          showWelcome={false}
        />
        <div className="flex items-center justify-center p-4">
        <div className="mx-auto w-full max-w-lg text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <Lock className="h-8 w-8 text-red-500" />
          </div>

          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            {validityMissing ? 'Validity Not Configured' : 'Subscription Expired'}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {validityMissing
              ? 'Your subscription validity has not been configured yet. Please contact support or update your profile.'
              : 'Your subscription has expired. Renew to regain full access to your dashboard and services.'}
          </p>

          <div className="mx-auto mt-8 max-w-sm space-y-2 rounded-xl border border-border bg-muted/30 p-4 text-left text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Expired On</span>
              <span className="font-medium text-foreground">
                {validityMissing
                  ? 'Not Configured'
                  : format(new Date(user!.validity), 'MMM dd, yyyy')}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Support</span>
              <a
                href="mailto:contact@no1lawns.com"
                className="font-medium text-primary hover:underline"
              >
                contact@no1lawns.com
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button className="h-11 w-full rounded-xl bg-green-600 px-8 text-white hover:bg-green-700 sm:w-auto">
              Renew Subscription
            </Button>
            <Button
              variant="outline"
              className="h-11 w-full rounded-xl border-border px-8 sm:w-auto"
            >
              Contact Support
            </Button>
          </div>

          <p className="mt-12 text-xs text-muted-foreground">
            &copy; 2026 No. 1 Lawns. All rights reserved.
          </p>
        </div>
      </div>
    </main>
    </AppLayout>
  );
}
