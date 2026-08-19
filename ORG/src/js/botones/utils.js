// utils.js
export function sanitize(str) {
  return String(str).replace(/[\\?%*:|"<>]/g, "_");
}

export class FirebaseError extends Error {
  constructor(message = "Error en Firebase") {
    super(message);
    this.name = "FirebaseError";
  }
}

export class SharePointError extends Error {
  constructor(message = "Error en SharePoint") {
    super(message);
    this.name = "SharePointError";
  }
}

export async function convertirArchivoABase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}