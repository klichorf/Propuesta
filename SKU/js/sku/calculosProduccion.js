export function calcularProduccion(unidades, pesoUnidad) {

  const pesoMaxBulto = 50; // kg por bulto
  const bultosPorEstiba = 25;
  const porcentajeMerma = 0.015; // 1.8 %

  // peso total en kg
  const pesoTotal = (unidades * pesoUnidad) / 1000;

  // agregar merma
  const pesoConMerma = pesoTotal * (1 + porcentajeMerma);

  // bultos necesarios
  const bultos = Math.ceil(pesoConMerma / pesoMaxBulto);

  // estibas completas
  const estibas = Math.floor(bultos / bultosPorEstiba);

  // bultos restantes
  const bultosRestantes = bultos % bultosPorEstiba;

  return {
    pesoTotal,
    pesoConMerma,
    bultos,
    estibas,
    bultosRestantes
  };
}