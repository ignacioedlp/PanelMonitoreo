// app/api/items/route.js
import AWS from 'aws-sdk';
import { NextResponse } from 'next/server';

// Configurar AWS DynamoDB
const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export async function GET(request) {
  try {
    const params = {
      TableName: 'your_table_name',
      IndexName: 'your_index_name', // Si estás usando un índice secundario
      KeyConditionExpression: 'zone = :zoneVal',
      ExpressionAttributeValues: {
        ':zoneVal': 'desired_zone_value'
      },
      ScanIndexForward: false, // Orden descendente
      Limit: 5 // Limita los resultados a 5
    };

    const result = await dynamoDb.query(params).promise();

    // Agrupa los documentos por zona (si es necesario)
    const items = result.Items.reduce((acc, item) => {
      const { zone } = item;
      if (!acc[zone]) {
        acc[zone] = [];
      }
      acc[zone].push(item);
      return acc;
    }, {});

    // Formatea los resultados
    const formattedItems = Object.keys(items).map(zone => ({
      zone,
      items: items[zone].slice(0, 5) // Solo toma los primeros 5 documentos de cada grupo
    }));

    return NextResponse.json({ data: formattedItems }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



//
AWS_ACCESS_KEY_ID = your_access_key_id
AWS_SECRET_ACCESS_KEY = your_secret_access_key
AWS_REGION = your_aws_region


// pages/index.js
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/items');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.map((group, index) => (
        <div key={index}>
          <h2>Zone: {group.zone}</h2>
          <ul>
            {group.items.map((item, idx) => (
              <li key={idx}>{JSON.stringify(item)}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}


"npm install aws-sdk"