// -------------------------
// CAPTURA Y RENDERIZADO DE FOTOS
// -------------------------
let imagesData = [];

function initFotos() {
    const inputFotos = document.getElementById("fotos");        // Selección normal / galería
    const inputTomar = document.getElementById("fotosTomar");   // Tomar foto (capture)
    if (!inputFotos && !inputTomar) return;

    // Función común para procesar archivos
    async function procesarFiles(files) {
        const arr = [...files];
        for (const f of arr) imagesData.push(await fileToDataURL(f, 1024));
        renderThumbs();
    }

    if (inputFotos) {
        inputFotos.addEventListener("change", (e) => {
            procesarFiles(e.target.files);
        });
    }

    if (inputTomar) {
        inputTomar.addEventListener("change", (e) => {
            procesarFiles(e.target.files);
        });
    }
}

function renderThumbs() {
    const div = document.getElementById("thumbs");
    div.innerHTML = "";
    imagesData.forEach((src, i) => {
        const img = document.createElement("img");
        img.src = src;
        img.className = "thumb";
        img.onclick = () => {
            if (confirm("¿Eliminar foto?")) {
                imagesData.splice(i, 1);
                renderThumbs();
            }
        };
        div.appendChild(img);
    });
}

function fileToDataURL(file, max = 1024) {
    return new Promise((res) => {
        const img = new Image(),
              r = new FileReader();
        r.onload = (e) => {
            img.onload = () => {
                let w = img.width, h = img.height;
                if (Math.max(w, h) > max) {
                    const s = max / Math.max(w, h);
                    w *= s;
                    h *= s;
                }
                const c = document.createElement("canvas");
                c.width = w;
                c.height = h;
                c.getContext("2d").drawImage(img, 0, 0, w, h);
                res(c.toDataURL("image/jpeg", 0.8));
            };
            img.src = e.target.result;
        };
        r.readAsDataURL(file);
    });
}

// -------------------------
// EXPORTAR VARIABLES / FUNCIONES
// -------------------------
export { initFotos, imagesData };






























