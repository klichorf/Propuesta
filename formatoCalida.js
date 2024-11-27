// script.js

// Base de datos simulada con productos
const products = {
    "123456789012": {
      name: "Manzana Roja",
      image: "https://jumbocolombiafood.vteximg.com.br/arquivos/ids/177576-1000-1000/7702085013021-1.jpg?v=636117824570600000?x300text=Manzana+Roja",
    },
    "987654321098": {
      name: "Banana",
      image: "https://via.placeholder.com/200x200.png?text=Banana",
    },
    "567890123456": {
      name: "Cereal",
      image: "https://via.placeholder.com/200x200.png?text=Cereal",
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
  