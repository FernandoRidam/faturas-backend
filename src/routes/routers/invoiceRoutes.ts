import { Router } from "express";
const routes = Router();

import { destroy } from "../../controllers/invoiceController";

routes.delete('/:id', destroy)

export default routes;
