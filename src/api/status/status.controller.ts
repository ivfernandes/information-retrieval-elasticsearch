import { Request, Response } from 'express';

export default class StatusController {
  static status(_req: Request, res: Response): Response {
    return res.send('ok');
  }
}
