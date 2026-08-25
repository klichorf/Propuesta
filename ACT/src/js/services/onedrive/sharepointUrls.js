const SHAREPOINT_ORIGIN = "https://orgcardenas.sharepoint.com";
const SHAREPOINT_SITE = "/sites/1621";
const DOCUMENT_LIBRARY = "Documentos";

export function normalizarUrlSharePoint(valor) {
  if (!valor) return "";

  const texto = String(valor).trim().replace(/\\/g, "/");

  if (/^https?:\/\//i.test(texto)) {
    return texto;
  }

  const serverRelativePath = obtenerRutaServidor(texto);
  const parentPath = serverRelativePath.slice(0, serverRelativePath.lastIndexOf("/"));

  return `${SHAREPOINT_ORIGIN}${SHAREPOINT_SITE}/${DOCUMENT_LIBRARY}/Forms/AllItems.aspx?id=${encodeURIComponent(serverRelativePath)}&parent=${encodeURIComponent(parentPath)}`;
}

function obtenerRutaServidor(ruta) {
  let limpia = decodeURIComponent(ruta).replace(/\\/g, "/").replace(/^\/+/, "");

  if (limpia.startsWith("sites/1621/")) {
    return `/${limpia}`;
  }

  if (limpia.startsWith(`${DOCUMENT_LIBRARY}/`)) {
    return `${SHAREPOINT_SITE}/${limpia}`;
  }

  return `${SHAREPOINT_SITE}/${DOCUMENT_LIBRARY}/${limpia}`;
}
