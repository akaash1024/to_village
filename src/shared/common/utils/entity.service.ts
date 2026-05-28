import { Injectable } from '@nestjs/common';
import * as Entities from '@entities/index';

@Injectable()
export class OrmService {
  constructor() {}
  static getAllEntitys(): any {
    return Object.fromEntries(Object.entries(Entities));
  }
}
