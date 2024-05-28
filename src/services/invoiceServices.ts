import { Invoice, PrismaClient } from "@prisma/client";
import { getClient } from "./clientServices";
import { deleteFile } from "./fileServices";

const InvoiceClient = new PrismaClient().invoice;

export const createInvoice = async (invoice: Omit<Invoice, 'id'>): Promise<Invoice> => {
  let _invoice = await InvoiceClient.findFirst({
    where: {
      AND: [
        {
          clientId: invoice.clientId,
        },
        {
          referenceMonth: invoice.referenceMonth,
        }
      ]
    },
  });

  if(!_invoice) {
    _invoice = await InvoiceClient.create({
      data: invoice,
    });
  }

  return _invoice;
};

export const getInvoice = async (invoiceId: string) => {
  const invoice = await InvoiceClient.findUnique({
    where: {
      id: invoiceId,
    }
  });

  if(!invoice) throw new Error("E005");

  return invoice;
};

export const getInvoicesByClient = async ( clientId: string, page: number, perPage: number ) => {
  await getClient(clientId);

  const where: any = {
    clientId,
  };

  const total = await InvoiceClient.count({
    where,
  });

  const invoices = await InvoiceClient.findMany({
    orderBy: {
      referenceMonth: 'asc',
    },
    where,
    skip: ( page - 1 ) * perPage,
    take: perPage,
  })

  return {
    page,
    perPage,
    total,
    results: invoices,
  };
};

export const deleteInvoice = async (invoiceId: string) => {
  const invoice = await getInvoice(invoiceId);

  deleteFile(invoice.clientId, invoice.id);

  await InvoiceClient.deleteMany({
    where: {
      id: invoiceId,
    }
  });

  return {
    message: "Fatura deletada com sucesso"
  }
};
