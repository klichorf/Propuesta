// ------------------------------------------------------
// CAMBIAR FONDO SEGÚN PLANTA
// ------------------------------------------------------
function cambiarFondo(planta) {
  const contenedor = document.getElementById("contenedorPrincipal");

  if (!contenedor) return;

  const fondos = {
    GRANOS:
      "url('https://mre-site-makro-colombia-test-webapp-slot.azurewebsites.net/imagesProducts/medias/913263_1_239.webp')",
    ASEO:
      "url('https://organizacioncardenas.com/wp-content/uploads/2022/11/detergentelavado-e1678672244584-793x1024.png')",
    ALIMENTOS: "url('img/BUNUELO.png')",
    BEBIDAS:
      "url('https://media.surtiplaza.co/dimen/7707335286316.png')",
    OFERTAS:
      "url('https://plus.unsplash.com/premium_photo-1681426730828-bfee2d13861d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332')",
    LOCATIVOS:
      "url('https://images.unsplash.com/photo-1676311396794-f14881e9daaa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170')",
  };

  contenedor.style.background =
    fondos[planta] || "#f6f9fc";
  contenedor.style.backgroundSize = "cover";
  contenedor.style.backgroundPosition = "center";
}

export { cambiarFondo };
