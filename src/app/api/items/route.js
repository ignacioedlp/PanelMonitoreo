import AWS from 'aws-sdk';
import moment from 'moment-timezone';
import { NextResponse } from 'next/server';

// Configurar AWS DynamoDB
const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export async function GET(request) {
  // Get the minutes query parameter
  const url = new URL(request.url)

  const key = url.searchParams.get("key")
  const value = url.searchParams.get("value") || 5;
  try {
    const params = {
      TableName: 'invernaderos',
    };

    const result = await dynamoDb.scan(params).promise();

    // Agrupa los documentos por área
    const itemsByArea = result.Items.reduce((acc, item) => {
      const { area } = item;
      if (!acc[area]) {
        acc[area] = [];
      }
      acc[area].push(item);
      return acc;
    }, {});

    // const filterDate = new Date(Date.now() - minutes * 60000);

    const filterDate = moment().utc().subtract(value, key).tz("America/Argentina/Buenos_Aires");

    console.log(filterDate);

    // Ordena y toma los 5 últimos documentos de cada grupo
    const formattedItems = Object.keys(itemsByArea).map(area => ({
      area,
      items: itemsByArea[area]
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
        .filter(item => {
          const itemDate = moment.utc(item.timestamp).tz("America/Argentina/Buenos_Aires");
          console.log(itemDate, filterDate, itemDate >= filterDate)
          return itemDate >= filterDate;
        })
    }));

    return NextResponse.json({ data: formattedItems }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
