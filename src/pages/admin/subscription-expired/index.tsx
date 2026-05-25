import { Lock } from 'lucide-react';

import { AppLayout } from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';

export default function SubscriptionExpiredPage() {
  return (
    <AppLayout>
      <div className="flex h-full items-center justify-center p-4">
        <div className="mx-auto w-full max-w-lg text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <Lock className="h-8 w-8 text-red-500" />
          </div>

          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Subscription Expired
          </h1>
          <p className="mt-2 text-muted-foreground">
            Your subscription has expired. Renew to regain full access to your
            dashboard and services.
          </p>

          <div className="mx-auto mt-8 max-w-sm space-y-2 rounded-xl border border-border bg-muted/30 p-4 text-left text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Expired On</span>
              <span className="font-medium text-foreground">10-05-2026</span>
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
            <Button className="h-11 w-full rounded-xl bg-[var(--sidebar-bg-from)] px-8 text-white hover:bg-[var(--sidebar-bg-to)] sm:w-auto">
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
    </AppLayout>
  );
}
