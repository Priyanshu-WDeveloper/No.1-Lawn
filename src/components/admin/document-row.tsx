import { Eye, FileText, Image as ImageIcon, File } from 'lucide-react';

import { formatFileSize } from '../../lib/file-utils';
import type { NamedDoc } from './named-document-upload';

interface DocumentRowProps {
  doc: NamedDoc;
  onPreview: (doc: NamedDoc) => void;
}

export function DocumentRow({ doc, onPreview }: DocumentRowProps) {
  if (!doc.file) return null;

  const isPdf = doc.file.type === 'application/pdf';
  const isImage = doc.file.type.startsWith('image/');

  let iconBg = 'bg-[#dbeafe]';
  let iconColor = 'text-[#3b82f6]';
  let Icon = File;

  if (isPdf) {
    iconBg = 'bg-[#fee2e2]';
    iconColor = 'text-[#ef4444]';
    Icon = FileText;
  } else if (isImage) {
    iconBg = 'bg-[#dcfce7]';
    iconColor = 'text-[#16a34a]';
    Icon = ImageIcon;
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#e5e5e5] bg-[#fafaf8] p-3">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconBg}`}>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#151515] truncate">
          {doc.name || doc.file.name}
        </p>
        <p className="text-xs text-[#777]">
          {formatFileSize(doc.file.size)} • {doc.file.type.split('/')[1]?.toUpperCase()}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onPreview(doc)}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#e5e5e5] bg-white hover:bg-[#edf8e7] hover:border-[#16610E]"
      >
        <Eye className="h-4 w-4 text-[#777]" />
      </button>
    </div>
  );
}
