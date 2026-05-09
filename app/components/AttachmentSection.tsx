import { FormData } from './types';
import { formatFileSize } from './utils';

interface AttachmentSectionProps {
  formData: FormData;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeAttachment: (index: number) => void;
  setStatus: React.Dispatch<React.SetStateAction<{ type: 'idle' | 'loading' | 'success' | 'error'; message: string }>>;
}

export default function AttachmentSection({ formData, handleFileChange, removeAttachment, setStatus }: AttachmentSectionProps) {
  return (
    <div className="attachment-section">
      <label>Attachments (Optional)</label>
      <p className="attachment-info">You can attach up to 10 files. Maximum file size: 40MB per file.</p>
      
      <div className="file-input-container">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mov,.zip"
          className="file-input"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="file-input-label">
          Choose Files
        </label>
      </div>

      {formData.attachments.length > 0 && (
        <div className="attachments-list">
          <h4>Attached Files:</h4>
          {formData.attachments.map((file, index) => (
            <div key={index} className="attachment-item">
              <div className="attachment-info">
                <span className="attachment-name">{file.name}</span>
                <span className="attachment-size">({formatFileSize(file.size)})</span>
              </div>
              <button
                type="button"
                onClick={() => removeAttachment(index)}
                className="remove-attachment"
                aria-label={`Remove ${file.name}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}