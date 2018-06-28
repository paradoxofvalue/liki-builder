export class Markup {
  buildingImageId: number;
  link: string;
  date: string;
  status: string;
  entityId: number;
  entityType: string;
  buildingImagePolygons: Object[] = [
    {
      buildingImagePolygonId: '',
      buildingImage: {
        buildingImageId: '',
      },
      entityId: '',
      entityType: '',
      polygon: '',
      status: ''
    }
  ];
  base64Image: string
}