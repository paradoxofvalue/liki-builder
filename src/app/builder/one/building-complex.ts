export class BuildingComplex extends Object {
  administrativeAreaLevel1 = null;
  administrativeAreaLevel2 = null;
  administrativeAreaLevel3 = null;
  country = null;
  lat = null;
  lng = null;
  locality = null;
  route = null;
  streetNumber = null;
  sublocalityLevel1 = null;
  buildingComplex = {
    buildingComplexId: null,
    buildingBlocks: [
      {
        buildingBlockId: null,
        status: null,
        title: null,
        buildingSections: [
          {
            buildingSectionId: null,
            title: null,
            numberOfFloors: null,
            status: null,
          }
        ],
      }
    ],
    address: null,
    constructionEnd: null,
    constructionStart: null,
    description: null,
    maxPrice: {
      currency: null,
      price: null,
    },
    price: {
      currency: null,
      price: null,
    },
    status: null,
    title: null,
    video: null,
  };
  images = [
    {
      buildingImageId: null,
      link: null,
      date: null,
      status: null,
      entityId: null,
      entityType: null,
      base64Image: null,
    }
  ]
}
