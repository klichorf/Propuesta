export function initQR() {

  const btnQR = document.getElementById("btnQR");
  const inputCodigo = document.getElementById("codigo");

  let html5QrCode;

  btnQR.addEventListener("click", async () => {

    html5QrCode = new Html5Qrcode("QR");

    await html5QrCode.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      (decodedText) => {

        const data = JSON.parse(decodedText);

        inputCodigo.value = data.lote;

        document.dispatchEvent(
          new CustomEvent("lote:scan", { detail: data.lote })
        );

        html5QrCode.stop();
      }
    );
  });
}