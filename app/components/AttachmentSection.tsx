import { useRef } from 'react';
import { FormData } from './types';
import { formatFileSize } from './utils';

interface AttachmentSectionProps {
  formData: FormData;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeAttachment: (index: number) => void;
}

const ACCEPTED =
  '.pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mov,.zip';

const FILE_ICONS: Record<string, string> = {
  pdf: '📄',
  doc: '📝',
  docx: '📝',
  jpg: '🖼️',
  jpeg: '🖼️',
  png: '🖼️',
  gif: '🖼️',
  mp4: '🎬',
  avi: '🎬',
  mov: '🎬',
  zip: '📦',
  txt: '📃',
};

function fileIcon(name: string): string {
  const ext = name.split('.').pop()?.toLowerCase() ?? '';
  return FILE_ICONS[ext] ?? '📎';
}

export default function AttachmentSection({
  formData,
  handleFileChange,
  removeAttachment,
}: AttachmentSectionProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const remaining = 10 - formData.attachments.length;

  return (
    <div className="flex flex-col gap-4">
      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        className="group relative flex flex-col items-center justify-center gap-3 rounded-xl
          border-2 border-dashed border-[#E4E6EF] bg-[#FAFBFF] hover:border-[#FFB619]
          hover:bg-[#FFF8E7]/40 transition-all duration-200 cursor-pointer py-10 px-6"
      >
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#FFB619]/10 group-hover:bg-[#FFB619]/20 transition-colors">
          <svg
            className="w-6 h-6 text-[#FFB619]"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16v-8m0 0l-3 3m3-3l3 3M20.5 16.5A4.5 4.5 0 0016 12H14.5A6.5 6.5 0 105.5 18.5"
            />
          </svg>
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold text-[#262C59]">
            Click to upload files
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            PDF, DOC, Images, Video, ZIP — max 40 MB each
          </p>
        </div>

        <span className="text-xs text-gray-400">
          {remaining > 0
            ? `${remaining} slot${remaining !== 1 ? 's' : ''} remaining`
            : 'Maximum files reached'}
        </span>

        <input
          ref={inputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          accept={ACCEPTED}
          className="sr-only"
          disabled={remaining === 0}
        />
      </div>

      {/* File list */}
      {formData.attachments.length > 0 && (
        <ul className="flex flex-col gap-2">
          {formData.attachments.map((file, index) => (
            <li
              key={index}
              className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg border border-[#E4E6EF]
                shadow-sm animate-section-in"
            >
              <span className="text-xl flex-shrink-0">{fileIcon(file.name)}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#262C59] truncate">
                  {file.name}
                </p>
                <p className="text-xs text-gray-400">{formatFileSize(file.size)}</p>
              </div>
              <button
                type="button"
                onClick={() => removeAttachment(index)}
                aria-label={`Remove ${file.name}`}
                className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full
                  text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors duration-150"
              >
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
