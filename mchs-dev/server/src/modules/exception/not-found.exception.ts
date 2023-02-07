import { Exception } from "./exception";

export abstract class NotFoundException extends Exception {
    public readonly type = 'not_found';
  }