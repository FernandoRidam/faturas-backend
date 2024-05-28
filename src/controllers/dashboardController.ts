import { NextFunction, Request, Response } from "express";
import { showDashboard } from "../services/dashboardServices";

export const show = async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const {
      client = "",
    } = req.query;

    const response = await showDashboard( client as string );

    return res.status( 200 ).json( response );
  } catch ( err ) {
    return next( err );
  }
};
