import { ArrowLeft, MoreVertical, Pencil } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface ViewPageHeaderProps {
  title: string;
  subtitle: string;
  onBack: () => void;
  onEdit?: () => void;
  deleteLabel?: string;
  onDelete?: () => void;
}

export function ViewPageHeader({
  title,
  subtitle,
  onBack,
  onEdit,
  deleteLabel,
  onDelete,
}: ViewPageHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          onClick={onBack}
          className="h-8 w-8 p-0 text-[#6b7280] hover:text-[#151515]"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold text-[#151515]">
            {title}
          </h1>
          <p className="text-sm text-[#6b7280]">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {onEdit && (
          <Button
            variant="outline"
            onClick={onEdit}
            className="h-8 gap-2 rounded-xl border-[#e5e7eb] text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#374151]"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </Button>
        )}

        {deleteLabel && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-8 w-8 rounded-full border border-[#e5e7eb] bg-white p-0 text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#374151]"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="text-red-500 focus:text-red-500"
                onClick={onDelete}
              >
                {deleteLabel}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
