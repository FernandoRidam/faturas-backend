import { PrismaClient } from "@prisma/client";

const InvoiceClient = new PrismaClient().invoice;

export const showDashboard = async ( clientId: string ) => {
  const where: any = {};

  if( clientId ) where.clientId = clientId;

  const dataKwh = await InvoiceClient.groupBy({
    by: ['referenceMonth'],
    orderBy: {
      referenceMonth: 'asc'
    },
    _sum: {
      electricityKwh: true,
      energySCEEKwh: true,
      energyGDIKwh: true,
    },
    where,
  });

  const dataValue = await InvoiceClient.groupBy({
    by: ['referenceMonth'],
    orderBy: {
      referenceMonth: 'asc'
    },
    _sum: {
      electricityValue: true,
      energySCEEValue: true,
      energyGDIValue: true,
      contribution: true,
    },
    where,
  });

  const data = [];

  dataKwh.forEach(( row ) => {
    data.push({
      referenceMonth: row.referenceMonth,
      electricityKwh: row._sum.electricityKwh,
      energySCEEKwh: row._sum.energySCEEKwh,
      energyGDIKwh: row._sum.energyGDIKwh,
    });
  });

  dataValue.forEach(( row ) => {
    data.forEach((_row) => {
      if( row.referenceMonth.getTime() === _row.referenceMonth.getTime()) {
        _row.electricityValue = row._sum.electricityValue;
        _row.energySCEEValue = row._sum.energySCEEValue;
        _row.energyGDIValue = row._sum.energyGDIValue;
        _row.contribution = row._sum.contribution;
      }
    });
  });

  return data;
};
