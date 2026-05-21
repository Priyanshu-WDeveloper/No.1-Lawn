import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { AppLayout } from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-[#16610E]">404</h1>
          <p className="mt-4 text-xl text-[#6b7280]">Page not found</p>
          <p className="mt-2 text-sm text-[#9ca3af]">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button
            onClick={() => navigate(-1)}
            className="mt-6 h-10 gap-2 rounded-xl bg-[#16610E] text-white hover:bg-[#1a7a12]"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
