import { Client, Invoice } from "@prisma/client";

export const getValueFromPdfText = (text: string): {
  client: Omit<Client, 'id'>;
  invoice: Omit<Invoice, 'id' | 'clientId'>;
} => {
  const client: any = {};
  const invoice: any = {};

  const array = text.split('\n');

  const clientName = array[array.findIndex((row) => row.includes('Comprovante de Pagamento')) + 1];
  const refenceDataRow = array[array.findIndex((row) => row.includes('Referente a')) + 1];

  const clientInfoDataRow = array[array.findIndex((row) => row.includes('Nº DO CLIENTE')) + 1].split(/\s+/).filter((data) => data);

  client.name = clientName;
  client.number = clientInfoDataRow[0];
  client.installation = clientInfoDataRow[1];

  invoice.referenceMonth = helperReferenceMonthTransform( refenceDataRow.match(/\b([A-Z][A-Z][A-Z]\/\d{4})\b/)[1]);
  invoice.maturity = refenceDataRow.match(/\b(\d{2}\/\d{2}\/\d{4})\b/)[1];
  invoice.total = Number(refenceDataRow.match(/(\d{1,3}(?:,\d{3})*,\d{2})\b/)[1].replace(',', '.'));

  const fieldsArray = [
    {
      label: 'Energia Elétrica',
      key: 'electricity'
    },
    {
      label: 'Energia SCEE s/ ICMS',
      key: 'energySCEE'
    },
    {
      label: 'Energia compensada GD I',
      key: 'energyGDI'
    },
  ];

  fieldsArray.forEach((field) => {
    const dataRow = array.find((row) => row.includes(field.label));

    if(dataRow) {
      const dataRowSplited = dataRow.replace(field.label, '').split(/\s+/).filter((data) => data);

      invoice[`${field.key}Kwh`] = Number(dataRowSplited[1].replace('.', '').replace(',', '.'));
      invoice[`${field.key}Value`] = Number(dataRowSplited[3].replace('.', '').replace(',', '.'));
    } else {
      invoice[`${field.key}Kwh`] = 0;
      invoice[`${field.key}Value`] = 0;
    }
  });

  const contributionDataRow = array.find((row) => row.includes('Contrib Ilum Publica Municipal')).replace('Contrib Ilum Publica Municipal', '').split(/\s+/).filter((data) => data);

  invoice.contribution = Number(contributionDataRow[0].replace('.', '').replace(',', '.'));

  return {
    client,
    invoice,
  };
};

const helperReferenceMonthTransform = ( value: string ): Date => {
  const parts = value.split('/');
  const month = parts[0];
  const year = Number( parts[1]);

  const monthNumber = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'].indexOf(month);

  const date = new Date( year, monthNumber, 1 );

  return date;
};
