import { Router } from "express";
import multer from "multer";

import multerConfig from "../../config/multer";

import {
  show,
  store,
} from "../../controllers/fileController";

const routes = Router();

routes.post('/', multer(multerConfig).array('files'), store );
routes.get('/:client/:invoice', show );

export default routes;
