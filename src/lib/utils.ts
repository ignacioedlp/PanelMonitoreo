import { type ClassValue, clsx } from "clsx"
import moment from "moment";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function group(data: any, key: string) {
  const groupedData = data.reduce((acc, item) => {
    const zone = `Zone ${item.zone}`;
    if (!acc[zone]) {
      acc[zone] = [];
    }
    acc[zone].push({
      x: moment(item.datetime).format("HH:mm A"),
      y: item[key]
    });
    return acc;
  }, {});

  const formattedData = Object.keys(groupedData).map(zone => ({
    id: zone,
    data: groupedData[zone]
  }));

  return formattedData;
}


export function groupedHeatmapData(data, key){

  // Agrupar por zone y tomar el primer valor de cada grupo
  const groupedByZone = data.reduce((acc, item) => {
    if (!acc[item.zone]) {
      acc[item.zone] = item;
    }
    return acc;
  }, {});

  const firstItemsByZone = Object.values(groupedByZone);


  const groupedData = firstItemsByZone.reduce((acc, item) => {
    const zone = `Zone ${item.zone}`;
    if (!acc[zone]) {
      acc[zone] = {
        id: zone,
        datetime: moment(item.datetime).fromNow(),
        humidity: item.humidity,
        temperature: item.temperature
      };
    }
    return acc;
  }, {});

  const formatted = Object.values(groupedData).map(item => ({
    id: item.id,
    datetime: item.datetime,
    value: item[key]
  }));

  return {
    name: key,
    children: formatted
  };
}
