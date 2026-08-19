export function initQRScanner() {
    const btnQR = document.getElementById("btnQR");
    const qrModal = document.getElementById("QR-modal");
    const closeBtn = document.getElementById("closeQR");
    const inputCodigo = document.getElementById("codigo");
    const qrDiv = document.getElementById("QR");

    if (!btnQR || !qrModal || !closeBtn || !inputCodigo || !qrDiv) return;

    let html5QrScanner = new Html5Qrcode("QR");
    let scannerRunning = false;

    btnQR.addEventListener("click", async () => {
        try {
            const devices = await Html5Qrcode.getCameras();
            if (!devices || devices.length === 0) {
                alert("No se detectó ninguna cámara.");
                return;
            }
        } catch {
            alert("No se pudo acceder a la cámara.");
            return;
        }

        // Mostrar modal
        qrModal.classList.add("show");

        html5QrScanner.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: 250 },
            (decodedText) => {
                inputCodigo.value = decodedText;
                stopScanner();
            }
        ).then(() => {
            scannerRunning = true;
        }).catch(err => {
            alert("Error iniciando la cámara.");
            console.error(err);
            stopScanner();
        });
    });

    closeBtn.addEventListener("click", () => {
        stopScanner();
    });

    function stopScanner() {
        if (scannerRunning) {
            html5QrScanner.stop().catch(()=>{});
            scannerRunning = false;
        }
        // Ocultar modal
        qrModal.classList.remove("show");
    }
}



// ------------------------------------------------------
// MÓDULO: GESTIÓN DE BOTONES (Descargar / Compartir)
// ------------------------------------------------------
import { guardarMantenimiento } from "./firebase.js";
import { mostrarToast } from "../js/toast.js";

export function initBotones(validarFormulario, generarPDF) {

    const btnDescargar = document.getElementById("btnDescargar");
    const btnCompartir = document.getElementById("btnCompartir");

    // ------------------------------------------------------
    // 🔹 DESCARGAR PDF LOCALMENTE
    // ------------------------------------------------------
    if (btnDescargar) {
        btnDescargar.addEventListener("click", async () => {
            if (!validarFormulario()) return;

            const file = await generarPDF();
            const a = document.createElement("a");

            a.href = URL.createObjectURL(file);
            a.download = "informe_mantenimiento.pdf";
            a.click();
        });
    }

    // ------------------------------------------------------
    // 🔹 COMPARTIR / GUARDAR EN FIREBASE Y ONEDRIVE
    // ------------------------------------------------------
    if (btnCompartir) {
        btnCompartir.addEventListener("click", async () => {
            if (!validarFormulario()) return;

            btnCompartir.disabled = true;
            btnCompartir.textContent = "Compartiendo...";

            try {

                // 📦 Captura de datos
                const planta = document.getElementById("planta").value.trim();
                const equipo = document.getElementById("equipo").value.trim();
                const area = document.getElementById("area").value.trim();

                if (!planta || !equipo) {
                    mostrarToast("⚠️ Debes seleccionar la planta y el equipo.", "warning");
                    btnCompartir.disabled = false;
                    btnCompartir.textContent = "Compartir";
                    return;
                }

                const data = {
                    codigo: document.getElementById("codigo").value,
                    planta,
                    area,
                    equipo,
                    fechaInicio: document.getElementById("fechaInicio").value,
                    fechaFin: document.getElementById("fechaFin").value,
                    tipoMantenimiento: document.getElementById("tipoMantenimiento").value,
                    ejecutor: document.getElementById("ejecutor").value,
                    danos: document.getElementById("danos").value,
                    trabajo: document.getElementById("trabajo").value,
                    herramientas: document.getElementById("herramientas").value,
                    repuestos: document.getElementById("repuestos").value,
                    timestamp: new Date().toISOString()
                };

                // 🔹 Generar PDF
                const file = await generarPDF();

                // 🔹 Convertir PDF a base64
                const base64 = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result.split(",")[1]);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });

                // 🔹 Limpiar ruta y nombre
                const sanitize = str => str.replace(/[\\/?%*:|"<>]/g, "_");

                const nombreArchivo = sanitize(`${planta}_${equipo}_${Date.now()}.pdf`);
                const rutaCarpeta = sanitize(`EQUIPOS/PLANTA_${planta}/${equipo}`);

                let urlSharePoint = "Error al enviar a OneDrive";
                let oneDriveOk = false;

                // 🔹 Enviar a Power Automate
                try {
                    const response = await fetch(
                        "https://defaultbfe754eff26f45e7a1813f5c911075.cd.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/1985990ce0344ac9ab6d7222e0f90f61/triggers/manual/paths/invoke?api-version=2024-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=e_nfxYAhkqaQAn9RzEgXDnaH2AOefsXGPnRPEwjtr4I",
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                nombreArchivo,
                                rutaCarpeta,
                                contenidoBase64: base64
                            })
                        }
                    );

                    if (!response.ok) {
                        throw new Error(await response.text());
                    }

                    // ← Aquí podrías leer la URL devuelta
                    const json = await response.json();
                    urlSharePoint = json?.rutaCompleta || "Archivo subido sin ruta devuelta";

                    oneDriveOk = true;

                } catch (err) {
                    console.error("❌ Error OneDrive:", err);
                    mostrarToast("⚠️ No se pudo enviar a OneDrive.", "warning");
                }

                // 🔹 Guardado en Firebase
                await guardarMantenimiento({
                    ...data,
                    rutaArchivo: `${rutaCarpeta}/${nombreArchivo}`,
                    urlSharePoint
                });

                mostrarToast(
                    oneDriveOk 
                        ? "✅ Archivo enviado y guardado correctamente" 
                        : "⚠️ Guardado solo en Firebase",
                    oneDriveOk ? "success" : "warning"
                );

            } catch (err) {
                console.error("🔥 Error general:", err);
                mostrarToast("❌ Error inesperado.", "danger");
            } finally {
                btnCompartir.disabled = false;
                btnCompartir.textContent = "Compartir";
            }
        });
    }
}
