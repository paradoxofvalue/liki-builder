export class Polygon {
  _id;
  color;
  polygon: string;
  tempPolygon = [];
  name;
  entityId;
  entityType;
  buildingImagePolygonId;
  status;
  buildingImage;

  constructor(_id, color, entityId?, entityType?) {
    this._id = _id;
    this.color = color;
    this.entityId = entityId;
    this.entityType = entityType;
    this.status = 'ACTIVE';
  }
}
