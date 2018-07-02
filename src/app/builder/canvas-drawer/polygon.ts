export class Polygon {
  _id;
  color;
  polygon: string;
  tempPolygon = [];
  name;
  entityId;
  buildingImagePolygonId;
  status;
  buildingImage;

  constructor(_id, color) {
    this._id = _id;
    this.color = color;
  }
}
