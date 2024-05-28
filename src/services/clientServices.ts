import { Client, PrismaClient } from "@prisma/client";

const ClientClient = new PrismaClient().client;

export const createClient = async (client: Omit<Client, 'id'>): Promise<Client> => {
  let _client = await ClientClient.create({
    data: client,
  });

  return _client;
};

export const getClientByNumber = async (number: string) => {
  const client = await ClientClient.findFirst({
    where: {
      number,
    }
  });

  return client;
};

export const getClients = async ( search = "", page: number, perPage: number ) => {
  const where: any = {
    OR: [
      {
        number: {
          contains: search,
          mode: 'insensitive'
        }
      },
      {
        installation: {
          contains: search,
          mode: 'insensitive'
        }
      },
      {
        name: {
          contains: search,
          mode: 'insensitive'
        }
      }
    ],
  };

  const total = await ClientClient.count({
    where,
  });

  const clients = await ClientClient.findMany({
    where,
    skip: ( page - 1 ) * perPage,
    take: perPage,
  });

  return {
    page,
    perPage,
    total,
    results: clients,
  };
};

export const getClient = async ( clientId: string ) => {
  const client = await ClientClient.findUnique({
    where: {
      id: clientId,
    }
  });

  if(!client) throw new Error("E004");

  return client;
};

export const deleteClient = async ( clientId: string ) => {
  await getClient( clientId );

  await ClientClient.delete({
    where: {
      id: clientId,
    }
  });
};
