import { initProduccion } from "./produccion.js";
import { initQR } from "./qr.js";
import { calcularProduccion} from "./calculosProduccion.js";


  console.log("➡️ INICIANDO DOMContentLoaded - OP");
  initProduccion();
  initQR();
  calcularProduccion();