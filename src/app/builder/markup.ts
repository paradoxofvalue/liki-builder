import { Polygon } from "./canvas-drawer/polygon";

export class Markup {
  buildingImageId: number;
  link: string;
  date: string;
  status: string;
  entityId: number;
  entityType: string;
  buildingImagePolygons: Polygon[]; 
  base64Image: string
}
