import { NextFunction, Router, Request, Response } from "express";
const routes = Router();

import dashboardRoutes from "./routers/dashboardRoutes";
import clientRoutes from "./routers/clientRoutes";
import invoiceRoutes from "./routers/invoiceRoutes";
import fileRoutes from "./routers/fileRoutes";

import { getException } from "../exceptions";

routes.use('/dashboard', dashboardRoutes );
routes.use('/client', clientRoutes );
routes.use('/invoice', invoiceRoutes );
routes.use('/files', fileRoutes );

routes.use('*', async ( err: Error, _req: Request, res: Response, next: NextFunction ) => {
  const error = await getException( err.message );

  res
    .status( error.status )
    .json({
      code: error.code,
      message: error.message,
    });

  next();
});

export default routes;
