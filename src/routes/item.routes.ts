import { Router } from 'express';
import { createItemController } from '../controllers/item.controller';
import { itemService } from '../services/item.service';
import { validate } from '../middleware/validate';
import { CreateItemSchema, UpdateItemSchema } from '../types/item';
import { IdParamSchema } from '../types/params';
import { ListQuerySchema } from '../types/list-query';

export function itemRoutes(): Router {
  const router = Router();
  const controller = createItemController({ service: itemService });

  router.get('/', validate({ query: ListQuerySchema }), controller.list.bind(controller));
  router.post('/', validate({ body: CreateItemSchema }), controller.create.bind(controller));

  const idRoutes = Router({ mergeParams: true });
  idRoutes.use(validate({ params: IdParamSchema }));
  idRoutes.get('/', controller.get.bind(controller));
  idRoutes.put('/', validate({ body: UpdateItemSchema }), controller.update.bind(controller));
  idRoutes.delete('/', controller.remove.bind(controller));
  router.use('/:id', idRoutes);

  return router;
}
