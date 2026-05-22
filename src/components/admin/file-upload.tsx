import { Upload, X } from 'lucide-react';

import { getFileIcon, formatFileSize } from '@/lib/file-utils';

interface FileUploadProps {
  files: File[];
  inputId: string;
  onFilesChange: (files: FileList | null) => void;
  onRemoveFile: (index: number) => void;
}

export function FileUpload({
  files,
  inputId,
  onFilesChange,
  onRemoveFile,
}: FileUploadProps) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-medium uppercase tracking-wide text-[#777]">
        Upload Documents
      </h4>
      <div
        className="cursor-pointer rounded-xl border-2 border-dashed border-[#e5e5e5] p-8 text-center transition-colors hover:border-[#16610E]"
        onClick={() => document.getElementById(inputId)?.click()}
      >
        <input
          id={inputId}
          type="file"
          className="hidden"
          multiple
          onChange={(e) => onFilesChange(e.target.files)}
          accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
        />
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#edf8e7]">
          <Upload className="h-8 w-8 text-[#16610E]" />
        </div>
        <p className="mb-2 font-medium text-[#151515]">
          Click to upload or drag and drop
        </p>
        <p className="text-sm text-[#777]">
          PDF, PNG, JPG, DOC up to 10MB
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium text-[#151515]">
            Uploaded Files ({files.length})
          </p>
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border border-[#e5e5e5] bg-[#fafaf8] p-3"
            >
              <div className="flex items-center gap-3">
                {getFileIcon(file.type)}
                <div>
                  <p className="text-sm font-medium text-[#151515]">
                    {file.name}
                  </p>
                  <p className="text-xs text-[#777]">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onRemoveFile(index)}
                className="rounded-full p-1 transition-colors hover:bg-red-100"
              >
                <X className="h-4 w-4 text-[#777] hover:text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
