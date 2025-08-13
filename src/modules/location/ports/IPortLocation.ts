import { Location } from '../domain/entities/Location';

export interface IPortLocation {
  create(data: Location): Promise<void>;
  findMany(): Promise<Location[]>;
}
