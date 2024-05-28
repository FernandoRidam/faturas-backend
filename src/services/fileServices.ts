import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";

import { createClient, getClient, getClientByNumber } from "./clientServices";
import { createInvoice, getInvoice } from "./invoiceServices";

import { getValueFromPdfText } from "../utils/getValuesFromPdfText";
import { normalizeString } from "../utils/normalizeString";
import { format } from "date-fns";

export const storeFile = async ( files: Array<Express.Multer.File>) => {
  const filesStatus = [];

  for( const file of files ) {
    try {
      const pdfData = await pdfParse( fs.readFileSync( file.path ));

      const data = getValueFromPdfText( pdfData.text );

      let client = await getClientByNumber( data.client.number );

      if(!client) {
        client = await createClient( data.client );
      }

      const invoice = await createInvoice({
        clientId: client.id,
        ...data.invoice
      });

      const newFileName = `${ normalizeString( invoice.id )}.${ file.filename.split('.')[ 1 ]}`;

      const folderPath = path.resolve( __dirname, '..', '..', 'uploads', normalizeString( client.id ));

      if( !fs.existsSync( folderPath )) fs.mkdirSync( folderPath );

      fs.renameSync( file.path, path.resolve( folderPath, newFileName ));

      filesStatus.push({
        success: true,
        fileName: file.filename,
      });
    } catch (error) {
      fs.unlinkSync(file.path);

      filesStatus.push({
        success: false,
        fileName: file.filename,
      });
    }
  }

  const faultyFiles = filesStatus.filter((fileStatus) => !fileStatus.success);

  if(faultyFiles.length === files.length) throw new Error("E002")
  else if(faultyFiles.length > 0) {
    return {
      message: "Alguns arquivos falharam",
      files: faultyFiles.map((file) => file.fileName),
    };
  }

  return {
    message: "Arquivos salvos com sucesso",
  };
};

export const getFile = ( client: string, invoice: string ) => {
  const splitedFileName = invoice.split('.');
  const fileName = normalizeString( splitedFileName[0] ?? "");
  const fileExtension = normalizeString( splitedFileName[1] ?? "");

  if( fileExtension !== 'pdf') throw new Error("E003");

  let filePath = path.resolve( __dirname, '..', '..', 'uploads', normalizeString( client ), `${ fileName }.${ fileExtension }`);

  if( !fs.existsSync( filePath )) throw new Error("E001");

  return filePath;
};

export const showFile = async ( clientId: string, invoiceId: string ) => {
  const client = await getClient( clientId );
  const invoice = await getInvoice( invoiceId.replace('.pdf', ''));

  return {
    file: getFile( clientId, invoiceId ),
    filename: `${ client.installation }-${ format( invoice.referenceMonth, 'MM-yyyy')}.pdf`
  };
};

export const deleteFile = async ( client: string, invoice: string ) => {
  fs.unlinkSync(getFile( client, `${ invoice }.pdf`));
};
