import { NextFunction, Request, Response } from 'express';
import SearchFind from './usecases/search.find';

export default class SearchController {
  static async search(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const searchFind = new SearchFind();
      const response = await searchFind.search(req.query.search as string);
      return res.json(response);
    } catch (error) {
      return next(error);
    }
  }

  static async searchV2(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const searchFind = new SearchFind();
      const response = await searchFind.searchV2(req.query.search as string);
      return res.json(response);
    } catch (error) {
      return next(error);
    }
  }
}
