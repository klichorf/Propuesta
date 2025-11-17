// Base de datos simulada con productos
const products = {


  "7702085013021": {
    name: "Pasta Doria clasica 500g",
    image: "https://jumbocolombiafood.vteximg.com.br/arquivos/ids/177576-1000-1000/7702085013021-1.jpg",
  },

  "7702085019023": {
    name: "Pasta Doria 1 Kg",
    image: "https://jumbocolombiaio.vtexassets.com/arquivos/ids/186126-1600-1600/7702085019023-1.jpg",
  },
  "7702085012024": {
    name: "Pasta Doria Espagueti 250 G",
    image: "https://jumbocolombiaio.vtexassets.com/arquivos/ids/186130-1600-1600/7702085012024-1.jpg",
  },
  "7702085012482": {
    name: "Pasta Doria Tornillo 250 G",
    image: "https://jumbocolombiaio.vtexassets.com/arquivos/ids/186175-1600-1600/7702085012482.jpg",	
  },
  "7702085243022": {
    name: "Pasta Monticello Espagueti 500 G",
    image: "https://jumbocolombiaio.vtexassets.com/arquivos/ids/186134-1600-1600/7702085243022.jpg",
  },
  "7702085243480": {
    name: "Pasta Monticello Fusilli 500 G",
    image: "https://via.placeholder.com/200x200.png?text=Monticello+Fusilli+500G",
  },
  "7702085021149": {
    name: "Pasta Monticello Penne Rigate 500 G",
    image: "https://jumbocolombiaio.vtexassets.com/arquivos/ids/184699-1600-1600.jpg",
  },

  "7702085003428": {
    name: "Pasta Doria Lasaña Precocida 400 G",
    image: "https://via.placeholder.com/200x200.png?text=Doria+Lasa%C3%B1a+400G",
  },
  "7702085013069": {
    name: "Pasta Doria Fideo 500 G",
    image: "https://jumbocolombiaio.vtexassets.com/arquivos/ids/186158-1600-1600.jpg",
  },
  "7702085003473": {
    name: "Quinua Grano Doria 300 G",
    image: "https://via.placeholder.com/200x200.png?text=Quinua+Doria+300G",
  },
  "7702085013120": {
    name: "Pasta Doria Concha 500 G",
    image: "https://jumbocolombiaio.vtexassets.com/arquivos/ids/186170-1600-1600.jpg",
  },
};

// Capturar el campo de entrada
const barcodeInput = document.getElementById("barcodeInput");
const productName = document.getElementById("productName");
const productImage = document.getElementById("productImage");

// Escuchar cuando el usuario escanea un código
barcodeInput.addEventListener("input", () => {
  const barcode = barcodeInput.value.trim();

  if (products[barcode]) {
    // Mostrar producto si se encuentra
    const product = products[barcode];
    productName.textContent = product.name;
    productImage.src = product.image;
    productImage.style.display = "block";
  } else {
    // Limpiar vista si no se encuentra
    productName.textContent = "Producto no encontrado";
    productImage.style.display = "none";
  }
});
