import { type ClassValue, clsx } from "clsx"
import moment from "moment-timezone";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function group(data: any, key: string) {
  const groupedData = data.reduce((acc, item) => {
    const area = `area ${item.area}`;
    if (!acc[area]) {
      acc[area] = [];
    }
    acc[area].push({
      x: moment.utc(item.timestamp).tz("America/Argentina/Buenos_Aires").format("HH:mm"),
      y: item[key]
    });
    return acc;
  }, {});

  const formattedData = Object.keys(groupedData).map(area => ({
    id: area,
    data: groupedData[area]
  }));

  return formattedData;
}


export function groupedHeatmapData(data, key) {

  // Agrupar por area y tomar el primer valor de cada grupo
  const groupedByarea = data.reduce((acc, item) => {
    if (!acc[item.area]) {
      acc[item.area] = item;
    }
    return acc;
  }, {});

  const firstItemsByarea = Object.values(groupedByarea);


  const groupedData = firstItemsByarea.reduce((acc, item) => {
    const area = `area ${item.area}`;
    if (!acc[area]) {
      acc[area] = {
        id: area,
        timestamp: moment.utc(item.timestamp).tz("America/Argentina/Buenos_Aires"),
        humidity: item.humidity,
        temperature: item.temperature
      };
    }
    return acc;
  }, {});

  const formatted = Object.values(groupedData).map(item => ({
    id: item.id,
    timestamp: item.timestamp,
    value: item[key]
  }));

  return {
    name: key,
    children: formatted
  };
}
