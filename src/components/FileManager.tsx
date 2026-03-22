import { useState, useRef, useCallback, useEffect } from "react";
import {
  type AttachedFile,
  getFilesForTab,
  saveFile,
  deleteFile as removeFile,
  formatFileSize,
  getFileIcon,
  getFileColor,
} from "../utils/fileStorage";

interface FileManagerProps {
  tabId: string;
  isAdmin: boolean;
}

export default function FileManager({ tabId, isAdmin }: FileManagerProps) {
  const [files, setFiles] = useState<AttachedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewFile, setPreviewFile] = useState<AttachedFile | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const [showLinkForm, setShowLinkForm] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkName, setLinkName] = useState("");
  const [linkDesc, setLinkDesc] = useState("");
  const [fileDesc, setFileDesc] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load files when tab changes
  useEffect(() => {
    loadFiles();
  }, [tabId]);

  const loadFiles = async () => {
    const loaded = await getFilesForTab(tabId);
    setFiles(loaded.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()));
  };

  const handleFileUpload = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;

      setUploading(true);
      setUploadProgress(0);
      const total = fileList.length;
      let processed = 0;

      for (const file of Array.from(fileList)) {
        // Max 50MB per file
        if (file.size > 50 * 1024 * 1024) {
          alert(`File "${file.name}" is too large. Maximum size is 50MB.`);
          processed++;
          setUploadProgress(Math.round((processed / total) * 100));
          continue;
        }

        try {
          const base64 = await readFileAsBase64(file);
          const attachedFile: AttachedFile = {
            id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            tabId,
            name: file.name,
            size: file.size,
            type: file.type || "application/octet-stream",
            data: base64,
            uploadedAt: new Date().toISOString(),
            description: fileDesc || undefined,
          };
          await saveFile(attachedFile);
        } catch (err) {
          alert(`Error uploading "${file.name}". Please try again.`);
        }

        processed++;
        setUploadProgress(Math.round((processed / total) * 100));
      }

      setFileDesc("");
      setUploading(false);
      setUploadProgress(0);
      setShowUploadPanel(false);
      await loadFiles();
    },
    [tabId, fileDesc]
  );

  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  };

  const handleAddLink = async () => {
    if (!linkUrl.trim()) {
      alert("Please enter a valid URL");
      return;
    }

    const attachedFile: AttachedFile = {
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      tabId,
      name: linkName.trim() || linkUrl.trim(),
      size: 0,
      type: "link/external",
      data: "",
      uploadedAt: new Date().toISOString(),
      description: linkDesc || undefined,
      linkUrl: linkUrl.trim(),
    };

    await saveFile(attachedFile);
    setLinkUrl("");
    setLinkName("");
    setLinkDesc("");
    setShowLinkForm(false);
    setShowUploadPanel(false);
    await loadFiles();
  };

  const handleDelete = useCallback(
    async (fileId: string) => {
      await removeFile(fileId);
      setDeleteConfirm(null);
      await loadFiles();
    },
    [tabId]
  );

  const handleDownload = useCallback((file: AttachedFile) => {
    if (file.linkUrl) {
      window.open(file.linkUrl, "_blank");
      return;
    }
    const link = document.createElement("a");
    link.href = file.data;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (isAdmin) {
        setShowUploadPanel(true);
        handleFileUpload(e.dataTransfer.files);
      }
    },
    [handleFileUpload, isAdmin]
  );

  return (
    <div className="space-y-5">
      {/* Section Header with Actions */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm">
            📎
          </span>
          Attached Files & Resources
          {files.length > 0 && (
            <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">
              {files.length}
            </span>
          )}
        </h3>

        <div className="flex items-center gap-2">
          {/* Help Button */}
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 text-xs font-semibold transition-colors border border-amber-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            How to Attach Files
          </button>

          {/* Attach File Button - Admin Only */}
          {isAdmin && (
            <button
              onClick={() => {
                setShowUploadPanel(!showUploadPanel);
                setShowLinkForm(false);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 text-xs font-semibold transition-all shadow-md hover:shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Attach File
            </button>
          )}
        </div>
      </div>

      {/* ===== HOW TO ATTACH FILES - HELP PANEL ===== */}
      {showHelp && (
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border border-amber-200 overflow-hidden">
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-bold text-amber-800 flex items-center gap-2">
                📖 How to Attach Files in Any Tab
              </h4>
              <button onClick={() => setShowHelp(false)} className="text-amber-400 hover:text-amber-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Step 1 */}
              <div className="bg-white rounded-xl p-4 border border-amber-100 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">1</div>
                  <h5 className="font-bold text-slate-800">Login as Admin</h5>
                </div>
                <p className="text-sm text-slate-600 ml-11">
                  Click the <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 rounded text-xs font-semibold">🔒 Login</span> button in the top-right corner of the header.
                </p>
                <p className="text-sm text-slate-500 ml-11 mt-1">
                  Enter password: <code className="px-2 py-0.5 bg-slate-800 text-green-400 rounded text-xs font-mono">manoj2025</code>
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-xl p-4 border border-amber-100 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">2</div>
                  <h5 className="font-bold text-slate-800">Navigate to a Tab</h5>
                </div>
                <p className="text-sm text-slate-600 ml-11">
                  Click any tab from the left sidebar (e.g., "OOSE ASSIGNMENTS", "Python Notes", etc.)
                </p>
                <p className="text-sm text-slate-500 ml-11 mt-1">
                  Each tab has its own independent file storage section.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-xl p-4 border border-amber-100 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold">3</div>
                  <h5 className="font-bold text-slate-800">Click "Attach File"</h5>
                </div>
                <p className="text-sm text-slate-600 ml-11">
                  Click the <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-semibold">+ Attach File</span> button (visible only when logged in as admin).
                </p>
                <p className="text-sm text-slate-500 ml-11 mt-1">
                  You can also drag & drop files directly onto the upload area.
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-white rounded-xl p-4 border border-amber-100 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold">4</div>
                  <h5 className="font-bold text-slate-800">Upload or Add Link</h5>
                </div>
                <p className="text-sm text-slate-600 ml-11">
                  <strong>Option A:</strong> Click the upload area to browse & select files from your computer.
                </p>
                <p className="text-sm text-slate-600 ml-11 mt-1">
                  <strong>Option B:</strong> Click "Add Link" to attach a Google Drive, YouTube, or any external URL.
                </p>
              </div>
            </div>

            {/* Supported files info */}
            <div className="mt-4 bg-white rounded-xl p-4 border border-amber-100">
              <h5 className="font-bold text-slate-700 text-sm mb-2">📦 Supported File Types:</h5>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { icon: "📕", label: "PDF" },
                  { icon: "📘", label: "DOC/DOCX" },
                  { icon: "📗", label: "XLS/XLSX" },
                  { icon: "📙", label: "PPT/PPTX" },
                  { icon: "🖼️", label: "Images" },
                  { icon: "☕", label: ".java" },
                  { icon: "🐍", label: ".py" },
                  { icon: "💻", label: ".cpp/.c" },
                  { icon: "🔷", label: ".cs" },
                  { icon: "📦", label: "ZIP/RAR" },
                  { icon: "📄", label: "TXT" },
                  { icon: "🔗", label: "Links/URLs" },
                ].map((ft) => (
                  <span key={ft.label} className="inline-flex items-center gap-1 px-2 py-1 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-100">
                    {ft.icon} {ft.label}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-2">Maximum file size: 50MB per file. Files are stored in the browser's IndexedDB.</p>
            </div>

            {/* Quick Note */}
            <div className="mt-3 flex items-start gap-2 bg-blue-50 rounded-lg p-3 border border-blue-100">
              <span className="text-lg">💡</span>
              <p className="text-xs text-blue-700">
                <strong>Tip:</strong> For very large files (videos, datasets), use the "Add Link" option to attach Google Drive, Dropbox, or YouTube links instead of uploading directly. Students can view and download all attached files without needing to login.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ===== UPLOAD PANEL (Admin Only) ===== */}
      {isAdmin && showUploadPanel && (
        <div className="bg-white rounded-2xl border-2 border-blue-200 overflow-hidden shadow-lg animate-in">
          {/* Panel Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4 text-white">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-base flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Attach Files to This Tab
              </h4>
              <button
                onClick={() => { setShowUploadPanel(false); setShowLinkForm(false); }}
                className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-blue-100 text-xs mt-1">Upload files or add external links for students to access</p>
          </div>

          <div className="p-5 space-y-4">
            {/* Toggle: File Upload vs Link */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowLinkForm(false)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  !showLinkForm
                    ? "bg-blue-50 text-blue-700 border-2 border-blue-300 shadow-sm"
                    : "bg-slate-50 text-slate-500 border-2 border-transparent hover:bg-slate-100"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload File
              </button>
              <button
                onClick={() => setShowLinkForm(true)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  showLinkForm
                    ? "bg-indigo-50 text-indigo-700 border-2 border-indigo-300 shadow-sm"
                    : "bg-slate-50 text-slate-500 border-2 border-transparent hover:bg-slate-100"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Add Link / URL
              </button>
            </div>

            {/* File Upload Area */}
            {!showLinkForm && (
              <div className="space-y-3">
                {/* Optional description */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Description (optional)</label>
                  <input
                    type="text"
                    value={fileDesc}
                    onChange={(e) => setFileDesc(e.target.value)}
                    placeholder="e.g., Assignment 1 solutions, Lab manual PDF..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  />
                </div>

                {/* Drop Zone */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                    isDragging
                      ? "border-blue-400 bg-blue-50 scale-[1.01] shadow-inner"
                      : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/50"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      handleFileUpload(e.target.files);
                      e.target.value = "";
                    }}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.java,.py,.cpp,.c,.cs,.js,.ts,.html,.css,.zip,.rar,.7z,.png,.jpg,.jpeg,.gif,.bmp,.svg,.mp4,.mp3,.json,.xml,.csv"
                  />

                  {uploading ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                      <p className="text-blue-600 font-semibold">Uploading... {uploadProgress}%</p>
                      <div className="w-48 h-2 bg-blue-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all ${isDragging ? "bg-blue-100 scale-110 animate-bounce" : "bg-white shadow-sm"}`}>
                        {isDragging ? "📥" : "📤"}
                      </div>
                      <div>
                        <p className="text-slate-700 font-bold text-base">
                          {isDragging ? "Drop files here!" : "Click to Browse or Drag & Drop"}
                        </p>
                        <p className="text-slate-400 text-xs mt-2">
                          PDF, DOC, DOCX, XLS, PPT, Images, Code files, ZIP & more • Max 50MB per file
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Link Form */}
            {showLinkForm && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Link URL <span className="text-red-400">*</span></label>
                  <input
                    type="url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://drive.google.com/... or https://youtube.com/..."
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Link Name (optional)</label>
                  <input
                    type="text"
                    value={linkName}
                    onChange={(e) => setLinkName(e.target.value)}
                    placeholder="e.g., OOSE Chapter 1 Notes PDF"
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Description (optional)</label>
                  <input
                    type="text"
                    value={linkDesc}
                    onChange={(e) => setLinkDesc(e.target.value)}
                    placeholder="e.g., Google Drive link to full notes"
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                  />
                </div>
                <button
                  onClick={handleAddLink}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Add Link
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===== FILES LIST ===== */}
      {files.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {files.map((file) => (
            <div
              key={file.id}
              className="group relative bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg hover:border-blue-200 transition-all duration-200"
            >
              <div className="flex items-start gap-3">
                {/* File Icon */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getFileColor(file.type, file.name)} flex items-center justify-center text-xl flex-shrink-0 shadow-md`}
                >
                  {file.linkUrl ? "🔗" : getFileIcon(file.type, file.name)}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate" title={file.name}>
                    {file.name}
                  </p>
                  {file.description && (
                    <p className="text-xs text-slate-500 truncate mt-0.5" title={file.description}>
                      {file.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    {file.linkUrl ? (
                      <span className="text-xs text-indigo-500 font-medium">🔗 External Link</span>
                    ) : (
                      <span className="text-xs text-slate-400">{formatFileSize(file.size)}</span>
                    )}
                    <span className="text-xs text-slate-300">•</span>
                    <span className="text-xs text-slate-400">
                      {new Date(file.uploadedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
                {/* Preview (for images and PDFs) */}
                {!file.linkUrl && (file.type.startsWith("image/") || file.type === "application/pdf") && (
                  <button
                    onClick={() => setPreviewFile(file)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 text-xs font-medium transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Preview
                  </button>
                )}

                {/* Download / Open */}
                <button
                  onClick={() => handleDownload(file)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-medium transition-colors"
                >
                  {file.linkUrl ? (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Open Link
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </>
                  )}
                </button>

                {/* Delete - Admin only */}
                {isAdmin && (
                  <>
                    {deleteConfirm === file.id ? (
                      <div className="flex items-center gap-1 ml-auto">
                        <button
                          onClick={() => handleDelete(file.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-red-500 text-white text-xs font-medium hover:bg-red-600 transition-colors"
                        >
                          ✓ Yes, Delete
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium hover:bg-slate-200 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(file.id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 text-xs font-medium transition-colors ml-auto"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div
          className={`rounded-xl border-2 border-dashed p-8 text-center transition-all ${
            isAdmin ? "border-blue-200 bg-blue-50/30 cursor-pointer hover:bg-blue-50" : "border-slate-200 bg-slate-50"
          }`}
          onClick={() => isAdmin && setShowUploadPanel(true)}
          onDragOver={isAdmin ? handleDragOver : undefined}
          onDragLeave={isAdmin ? handleDragLeave : undefined}
          onDrop={isAdmin ? handleDrop : undefined}
        >
          <div className="text-5xl mb-3">📂</div>
          <p className="text-slate-500 font-semibold text-base">No files attached yet</p>
          {isAdmin ? (
            <div className="mt-2">
              <p className="text-blue-500 text-sm">
                Click here or the "Attach File" button above to upload files
              </p>
              <p className="text-slate-400 text-xs mt-1">
                You can also drag & drop files here
              </p>
            </div>
          ) : (
            <p className="text-slate-400 text-sm mt-1">
              Files will appear here once the professor uploads them.
              <br />
              <button onClick={() => setShowHelp(true)} className="text-blue-500 hover:underline mt-1 inline-block">
                Learn how files are attached →
              </button>
            </p>
          )}
        </div>
      )}

      {/* ===== PREVIEW MODAL ===== */}
      {previewFile && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setPreviewFile(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-2xl">{getFileIcon(previewFile.type, previewFile.name)}</span>
                <div className="min-w-0">
                  <p className="font-semibold text-slate-800 truncate">{previewFile.name}</p>
                  <p className="text-xs text-slate-400">{formatFileSize(previewFile.size)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => handleDownload(previewFile)}
                  className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                  title="Download"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
                <button
                  onClick={() => setPreviewFile(null)}
                  className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                  title="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 overflow-auto max-h-[calc(90vh-80px)]">
              {previewFile.type.startsWith("image/") ? (
                <img
                  src={previewFile.data}
                  alt={previewFile.name}
                  className="max-w-full h-auto rounded-lg mx-auto"
                />
              ) : previewFile.type === "application/pdf" ? (
                <iframe
                  src={previewFile.data}
                  className="w-full h-[70vh] rounded-lg border border-slate-200"
                  title={previewFile.name}
                />
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">{getFileIcon(previewFile.type, previewFile.name)}</div>
                  <p className="text-slate-600 font-medium">Preview not available for this file type</p>
                  <button
                    onClick={() => handleDownload(previewFile)}
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                  >
                    Download File
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
