import { Exception } from './exception';

export class BadRequestException extends Exception {

  constructor(message: string, status: number = 400) {
    super(message, status);
  }
}
