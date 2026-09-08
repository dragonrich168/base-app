import type { Request, Response } from 'express';
import type { itemService } from '../services/item.service';
import { validatedBody } from '../types/http';
import type { CreateItemInput, UpdateItemInput } from '../types/item';

interface ItemControllerDeps {
  service: typeof itemService;
}

export function createItemController({ service }: ItemControllerDeps) {
  return {
    list(_req: Request, res: Response): void {
      res.status(200).json({ items: service.list() });
    },

    get(req: Request, res: Response): void {
      res.status(200).json({ item: service.get(req.params.id) });
    },

    create(req: Request, res: Response): void {
      const input = validatedBody<CreateItemInput>(req);
      res.status(201).json({ item: service.create(input) });
    },

    update(req: Request, res: Response): void {
      const input = validatedBody<UpdateItemInput>(req);
      res.status(200).json({ item: service.update(req.params.id, input) });
    },

    remove(req: Request, res: Response): void {
      service.remove(req.params.id);
      res.status(204).send();
    },
  };
}
