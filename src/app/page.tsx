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
  const [time, setTime] = useState({
    value: 5,
    key: "minutes"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/items?key=${time.key}&value=${time.value}`).then((res) => res.json())
      .then((data) => {
        if (data) {
          console.table(data);
          const allItems = data.data.flatMap(zone => zone.items);
          const sortedItems = allItems;

          const groupedDataTemperature = group(allItems, 'temperature');
          const groupedDataHumidity = group(allItems, 'humidity');

          const temperatureTreemapData = groupedHeatmapData(sortedItems, 'temperature');
          const humidityTreemapData = groupedHeatmapData(sortedItems, 'humidity');

          setTemperatureHeatmapData(temperatureTreemapData);
          setHumidityHeatmapData(humidityTreemapData);
          setHumidity(groupedDataTemperature);
          setTemperature(groupedDataHumidity);
          setItems(sortedItems.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
          setLoading(false);

        }
      }).catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/items?key=${time.key}&value=${time.value}`).then((res) => res.json())
      .then((data) => {
        if (data) {
          console.table(data);
          const allItems = data.data.flatMap(zone => zone.items);
          const sortedItems = allItems;

          const groupedDataTemperature = group(allItems, 'temperature');
          const groupedDataHumidity = group(allItems, 'humidity');

          const temperatureTreemapData = groupedHeatmapData(sortedItems, 'temperature');
          const humidityTreemapData = groupedHeatmapData(sortedItems, 'humidity');

          setTemperatureHeatmapData(temperatureTreemapData);
          setHumidityHeatmapData(humidityTreemapData);
          setHumidity(groupedDataHumidity);
          setTemperature(groupedDataTemperature);
          setItems(sortedItems.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
          setLoading(false);

        }
      }).catch((error) => {
        setError(error.message);
        setLoading(false);
      })
  }, [time]);


  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Dashboard items={items} humidity={humidity} temperature={temperature} temperatureHeatmapData={temperatureHeatmapData} humidityHeatmapData={humidityHeatmapData} setTime={setTime} time={time} />
  );
}