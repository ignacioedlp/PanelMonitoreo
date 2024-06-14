"use client"
import { Dashboard } from '@/components/dashboard';
import { useEffect, useState } from 'react';
import { group, groupedHeatmapData } from '@/lib/utils';

export default function Home() {
  const [items, setItems] = useState([]);
  const [temperature, setTemperature] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [temperatureHeatmapData, setTemperatureHeatmapData] = useState(null);
  const [humidityHeatmapData, setHumidityHeatmapData] = useState(null);

  useEffect(() => {
    fetch('/api/items')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const allItems = data.data.flatMap(zone => zone.items);
          const sortedItems = allItems.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

          const groupedDataTemperature = group(allItems, 'temperature');
          const groupedDataHumidity = group(allItems, 'humidity');

          const temperatureTreemapData = groupedHeatmapData(sortedItems, 'temperature');
          const humidityTreemapData = groupedHeatmapData(sortedItems, 'humidity');

          setTemperatureHeatmapData(temperatureTreemapData);
          setHumidityHeatmapData(humidityTreemapData);
          setHumidity(groupedDataTemperature);
          setTemperature(groupedDataHumidity);
          setItems(sortedItems);

        }
      });
  }, []);

  return (
    <Dashboard items={items} humidity={humidity} temperature={temperature} temperatureHeatmapData={temperatureHeatmapData} humidityHeatmapData={humidityHeatmapData} />
  );
}