const imageUrl = (fileName) =>
  new URL(`../../assets/images/${fileName}`, import.meta.url).href;

export const assetPaths = {
  images: {
    bunuelos: imageUrl("BUNUELO.png"),
    logo: imageUrl("logo.png"),
  },
};
