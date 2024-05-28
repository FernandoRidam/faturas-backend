import { NextFunction, Request, Response } from "express";
import { deleteInvoice, getInvoicesByClient } from "../services/invoiceServices";

export const index = async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const {
      id,
    } = req.params;

    const {
      page = 1,
      perPage = 100,
    } = req.query;

    const response = await getInvoicesByClient( id, Number( page ), Number( perPage ));

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

    const response = await deleteInvoice( id );

    return res.status( 200 ).json( response );
  } catch ( err ) {
    return next( err );
  }
};
