const imageUrl = (fileName) =>
  new URL(`../../assets/images/${fileName}`, import.meta.url).href;

export const assetPaths = {

  images: {

    // Logo utilizado en los informes PDF
    logo: imageUrl("../../assets/images/logo.png")

  }

};