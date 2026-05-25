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
      <h4 className="mb-4 text-sm font-medium uppercase tracking-wide text-muted-foreground">
        Upload Documents
      </h4>
      <div
        className="cursor-pointer rounded-xl border-2 border-dashed border-border p-8 text-center transition-colors hover:border-primary"
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
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Upload className="h-8 w-8 text-primary" />
        </div>
        <p className="mb-2 font-medium text-foreground">
          Click to upload or drag and drop
        </p>
        <p className="text-sm text-muted-foreground">
          PDF, PNG, JPG, DOC up to 10MB
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium text-foreground">
            Uploaded Files ({files.length})
          </p>
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border border-border bg-background p-3"
            >
              <div className="flex items-center gap-3">
                {getFileIcon(file.type)}
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onRemoveFile(index)}
                className="rounded-full p-1 transition-colors hover:bg-red-100"
              >
                <X className="h-4 w-4 text-muted-foreground hover:text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
