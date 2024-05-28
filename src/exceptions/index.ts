import { Error } from "types/Error";
import exceptions from "./exceptions.json";

export async function getException( err: string ): Promise<Error> {
  try {
    const error = exceptions[ err ];

    if( error ) {
      return {
        code: err,
        ...error,
      };
    } else {
      const error = exceptions["E000"];

      return {
        code: "E000",
        ...error,
      };
    }
  } catch {
    const error = exceptions["E000"];

    return {
      code: "E000",
      ...error,
    };
  }
};
