import multer from "multer";
import path from "path";

export const dest = path.resolve( __dirname, '..', '..', 'tmp');

export default {
  dest,
  storage: multer.diskStorage({
    destination: ( _req, _file, cb ) => {
      cb( null, dest)
    },

    filename: ( _req, file, cb ) => {
      cb( null, `${ file.originalname }`);
    },
  }),
};
