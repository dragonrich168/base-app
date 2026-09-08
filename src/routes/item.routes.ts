import { Router } from 'express';
import { createItemController } from '../controllers/item.controller';
import { itemService } from '../services/item.service';
import { validate } from '../middleware/validate';
import { CreateItemSchema, UpdateItemSchema } from '../types/item';

export function itemRoutes(): Router {
  const router = Router();
  const controller = createItemController({ service: itemService });

  router.get('/', controller.list.bind(controller));
  router.post('/', validate({ body: CreateItemSchema }), controller.create.bind(controller));
  router.get('/:id', controller.get.bind(controller));
  router.put('/:id', validate({ body: UpdateItemSchema }), controller.update.bind(controller));
  router.delete('/:id', controller.remove.bind(controller));

  return router;
}
