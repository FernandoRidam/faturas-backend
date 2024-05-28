import { NextFunction, Request, Response } from "express";
import { deleteClient, getClients } from "../services/clientServices";

export const index = async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const {
      search = "",
      page = 1,
      perPage = 100,
    } = req.query;

    const response = await getClients( search as string, Number( page ), Number( perPage ));

    return res.status( 200 ).json( response );
  } catch ( err ) {
    return next( err );
  }
};

export const destroy = async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const {
      id,
    } = req.params;

    const response = await deleteClient( id );

    return res.status( 200 ).json( response );
  } catch ( err ) {
    return next( err );
  }
};
