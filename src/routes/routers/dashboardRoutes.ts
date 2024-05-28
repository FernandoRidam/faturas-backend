import { show } from "../../controllers/dashboardController";
import { Router } from "express";
const routes = Router();

routes.get('/', show );

export default routes;
