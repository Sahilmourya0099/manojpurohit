// IndexedDB-based file storage - supports much larger files than localStorage

export interface AttachedFile {
  id: string;
  tabId: string;
  name: string;
  size: number;
  type: string;
  data: string; // base64 data URL
  uploadedAt: string;
  description?: string;
  linkUrl?: string; // for external links like Google Drive, etc.
}

const DB_NAME = "ProfBlogFilesDB";
const DB_VERSION = 1;
const STORE_NAME = "files";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("tabId", "tabId", { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getFilesForTab(tabId: string): Promise<AttachedFile[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const index = store.index("tabId");
      const request = index.getAll(tabId);
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  } catch {
    return [];
  }
}

export async function saveFile(file: AttachedFile): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.put(file);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function deleteFile(fileId: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(fileId);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function getAllFiles(): Promise<AttachedFile[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  } catch {
    return [];
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function getFileIcon(type: string, name: string): string {
  const ext = name.split(".").pop()?.toLowerCase() || "";
  if (type.startsWith("image/")) return "🖼️";
  if (type === "application/pdf" || ext === "pdf") return "📕";
  if (type.includes("word") || ext === "doc" || ext === "docx") return "📘";
  if (type.includes("excel") || type.includes("spreadsheet") || ext === "xls" || ext === "xlsx") return "📗";
  if (type.includes("powerpoint") || type.includes("presentation") || ext === "ppt" || ext === "pptx") return "📙";
  if (type.startsWith("text/") || ext === "txt") return "📄";
  if (ext === "java") return "☕";
  if (ext === "py") return "🐍";
  if (ext === "cpp" || ext === "c" || ext === "h") return "💻";
  if (ext === "cs") return "🔷";
  if (ext === "js" || ext === "ts") return "📜";
  if (ext === "html" || ext === "css") return "🌐";
  if (ext === "zip" || ext === "rar" || ext === "7z") return "📦";
  if (type.startsWith("video/")) return "🎬";
  if (type.startsWith("audio/")) return "🎵";
  if (name.startsWith("http")) return "🔗";
  return "📎";
}

export function getFileColor(type: string, name: string): string {
  const ext = name.split(".").pop()?.toLowerCase() || "";
  if (type.startsWith("image/")) return "from-pink-400 to-rose-500";
  if (type === "application/pdf" || ext === "pdf") return "from-red-500 to-red-600";
  if (type.includes("word") || ext === "doc" || ext === "docx") return "from-blue-500 to-blue-600";
  if (type.includes("excel") || ext === "xls" || ext === "xlsx") return "from-green-500 to-green-600";
  if (type.includes("powerpoint") || ext === "ppt" || ext === "pptx") return "from-orange-500 to-orange-600";
  if (ext === "java") return "from-amber-500 to-red-500";
  if (ext === "py") return "from-yellow-400 to-green-500";
  if (ext === "zip" || ext === "rar") return "from-yellow-500 to-amber-600";
  if (name.startsWith("http")) return "from-indigo-400 to-blue-500";
  return "from-slate-400 to-slate-500";
}

// Migrate from localStorage to IndexedDB (one-time)
export async function migrateFromLocalStorage(): Promise<void> {
  try {
    const keys = Object.keys(localStorage).filter((k) => k.startsWith("files_"));
    for (const key of keys) {
      const tabId = key.replace("files_", "");
      const stored = localStorage.getItem(key);
      if (stored) {
        const files: AttachedFile[] = JSON.parse(stored);
        for (const file of files) {
          file.tabId = tabId;
          await saveFile(file);
        }
        localStorage.removeItem(key);
      }
    }
  } catch {
    // Ignore migration errors
  }
}
