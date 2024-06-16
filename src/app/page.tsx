"use client"
import { Dashboard } from '@/components/dashboard';
import { useEffect, useState } from 'react';
import { group, groupedHeatmapData } from '@/lib/utils';

export default function Home() {
  const [items, setItems] = useState(null);
  const [temperature, setTemperature] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [temperatureHeatmapData, setTemperatureHeatmapData] = useState(null);
  const [humidityHeatmapData, setHumidityHeatmapData] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [minutes, setMinutes] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/items?minutes=${minutes}`).then((res) => res.json())
      .then((data) => {
        if (data) {
          console.table(data);
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
          setLoading(false);

        }
      }).catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/items?minutes=${minutes}`).then((res) => res.json())
      .then((data) => {
        if (data) {
          console.table(data);
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
          setLoading(false);

        }
      }).catch((error) => {
        setError(error.message);
        setLoading(false);
      })
  }, [minutes]);


  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Dashboard items={items} humidity={humidity} temperature={temperature} temperatureHeatmapData={temperatureHeatmapData} humidityHeatmapData={humidityHeatmapData} setMinutes={setMinutes} minutes={minutes} />
  );
}