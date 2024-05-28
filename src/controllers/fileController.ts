import { NextFunction, Request, Response } from "express";

import {
  showFile,
  storeFile,
} from "../services/fileServices";

export const store = async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const files = req.files;

    const response = await storeFile(files as Array<Express.Multer.File>);

    return res.status(201).json(response);
  } catch ( err ) {
    return next( err );
  }
};

export const show = async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const {
      client,
      invoice,
    } = req.params;

    const {
      file,
      filename,
    } = await showFile(client, invoice);

    return res.status(200).download( file, filename );
  } catch ( err ) {
    return next( err );
  }
};
