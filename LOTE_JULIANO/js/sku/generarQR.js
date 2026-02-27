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
  const btn = document.getElementById("btnImprimirQR");
  const contenedor = document.getElementById("qrPrint");

  if (!btn || !contenedor) return;

  btn.addEventListener("click", () => {
    const html = contenedor.innerHTML;

    if (!html.trim()) {
      alert("Primero genera un QR");
      return;
    }

    const w = window.open("", "_blank");
    w.document.write(`
      <html>
        <head><title>Imprimir QR</title></head>
        <body style="text-align:center; padding:20px;">
          <h3>Etiqueta de Producción</h3>
          ${html}
          <script>
            window.print();
            window.onafterprint = () => window.close();
          </script>
        </body>
      </html>
    `);
  });
}