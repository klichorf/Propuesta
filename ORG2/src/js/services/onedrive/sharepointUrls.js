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

export function obtenerUrlArchivoSharePoint(valor) {
  if (!valor) return "";

  const texto = String(valor).trim().replace(/\\/g, "/");

  if (/^https?:\/\//i.test(texto)) {
    try {
      const url = new URL(texto);
      const id = url.searchParams.get("id");
      if (id) return codificarUrlArchivo(`${SHAREPOINT_ORIGIN}${decodeURIComponent(id)}`);
      return texto;
    } catch {
      return texto;
    }
  }

  return codificarUrlArchivo(`${SHAREPOINT_ORIGIN}${obtenerRutaServidor(texto)}`);
}

function codificarUrlArchivo(url) {
  try {
    const parsed = new URL(url);
    parsed.pathname = parsed.pathname
      .split("/")
      .map((segmento) => encodeURIComponent(decodeURIComponent(segmento)))
      .join("/");
    return parsed.href;
  } catch {
    return url;
  }
}
