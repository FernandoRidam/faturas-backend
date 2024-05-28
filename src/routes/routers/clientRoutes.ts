import { Router } from "express";
const routes = Router();

import {
  destroy,
  index,
} from "../../controllers/clientController";

import {
  index as indexInvoices,
} from "../../controllers/invoiceController";

routes.get('/', index );
routes.delete('/:id', destroy );

routes.use('/:id/invoices', indexInvoices );

export default routes;
