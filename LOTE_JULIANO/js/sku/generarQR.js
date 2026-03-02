export function dibujarQR(sku, lote) {
  const contenedor = document.getElementById("qrPrint");
  if (!contenedor) return;

  contenedor.innerHTML = ""; // limpiar QR anterior

  const textoQR = `${sku}|${lote}`; // formato acordado

  new QRCode(contenedor, {
    text: textoQR,
    width: 220,
    height: 220,
    correctLevel: QRCode.CorrectLevel.H
  });

  return textoQR;
}


export function initImprimirQR() {
  
  const contenedor = document.getElementById("qrPrint");



}