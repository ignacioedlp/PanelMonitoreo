import connectToDatabase from '../../../services/mongo';
import Item from '../../../models/item';
import { NextResponse } from "next/server";

export async function GET(request) {
  // Do whatever you want
  try {
    connectToDatabase();
    const items = await Item.aggregate([
      {
        $sort: { datetime: -1 } // Ordena los documentos por datetime en orden descendente
      },
      {
        $group: {
          _id: '$zone', // Agrupa los documentos por la zona
          items: { $push: '$$ROOT' } // Empuja todos los documentos en un array
        }
      },
      {
        $project: {
          items: { $slice: ['$items', 5] } // Solo toma los primeros 5 documentos de cada grupo
        }
      }
    ]);
    return NextResponse.json({ data: items }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
