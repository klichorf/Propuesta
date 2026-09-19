export function fileToDataURL(file, max = 1024) {

    return new Promise((resolve, reject) => {

        const img = new Image();
        const reader = new FileReader();

        reader.onload = (event) => {

            img.onload = () => {

                let width = img.width;
                let height = img.height;

                if (Math.max(width, height) > max) {

                    const scale = max / Math.max(width, height);

                    width *= scale;
                    height *= scale;
                }

                const canvas = document.createElement("canvas");

                canvas.width = width;
                canvas.height = height;

                const context = canvas.getContext("2d");

                if (!context) {
                    reject(new Error("No fue posible obtener el contexto del canvas."));
                    return;
                }

                context.drawImage(
                    img,
                    0,
                    0,
                    width,
                    height
                );

                resolve(
                    canvas.toDataURL("image/jpeg", 0.8)
                );
            };

            img.onerror = () => {
                reject(new Error("No fue posible cargar la imagen."));
            };

            img.src = event.target.result;
        };

        reader.onerror = () => {
            reject(new Error("No fue posible leer el archivo."));
        };

        reader.readAsDataURL(file);
    });
}
