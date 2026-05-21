import { useEffect, useState } from 'react';
import { X, FileText, Image as ImageIcon, File, Download } from 'lucide-react';

interface DocumentPreviewModalProps {
  file: File | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DocumentPreviewModal({
  file,
  isOpen,
  onClose,
}: DocumentPreviewModalProps) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file && isOpen) {
      const url = URL.createObjectURL(file);
      setBlobUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setBlobUrl(null);
  }, [file, isOpen]);

  if (!isOpen || !file || !blobUrl) return null;

  const isPdf = file.type === 'application/pdf';
  const isImage = file.type.startsWith('image/');

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = file.name;
    a.click();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e5e5e5] p-4">
          <div className="flex items-center gap-3 min-w-0">
            {isPdf ? (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#fee2e2]">
                <FileText className="h-4 w-4 text-[#ef4444]" />
              </div>
            ) : isImage ? (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#dcfce7]">
                <ImageIcon className="h-4 w-4 text-[#16a34a]" />
              </div>
            ) : (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#dbeafe]">
                <File className="h-4 w-4 text-[#3b82f6]" />
              </div>
            )}
            <span className="text-sm font-medium text-[#151515] truncate">
              {file.name}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-red-50 text-[#777] hover:text-red-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-auto p-4">
          {isImage ? (
            <div className="flex items-center justify-center">
              <img
                src={blobUrl}
                alt={file.name}
                className="max-h-[70vh] object-contain rounded-lg"
              />
            </div>
          ) : isPdf ? (
            <iframe
              src={blobUrl}
              className="w-full h-[70vh] rounded-lg border border-[#e5e5e5]"
              title={file.name}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-[70vh] text-center">
              <File className="h-16 w-16 text-[#777] mb-4" />
              <p className="text-lg font-medium text-[#151515] mb-2">
                Preview not available
              </p>
              <p className="text-sm text-[#777] mb-6">
                This file type cannot be previewed in the browser
              </p>
              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#16610E] text-white hover:bg-[#0f4a09]"
              >
                <Download className="h-4 w-4" />
                Download to view
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
