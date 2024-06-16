"use client"
/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/qEH9z31N71m
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Arimo } from 'next/font/google'
import { Chivo } from 'next/font/google'

arimo({
  subsets: ['latin'],
  display: 'swap',
})

chivo({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { CardTitle, CardHeader, CardContent, Card, CardDescription } from "@/components/ui/card"
import moment from "moment-timezone"
import Heatmaps from "./heatmap"
import { LineChart } from "./line-chart"

export function Dashboard({ items, temperature, humidity, temperatureHeatmapData,
  humidityHeatmapData, setMinutes, minutes }: { items: any[], temperature: any[], humidity: any[], temperatureHeatmapData: any, humidityHeatmapData: any, setMinutes: any, minutes: any }) {
  return (
    <div className="flex h-screen w-full bg-gray-100">
      <div className="w-[500px] bg-gray-100 p-6 h-screen flex flex-col">
        <h2 className="mb-4 text-lg font-medium">Informacion reciente</h2>
        <div className="flex-1 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hora</TableHead>
                <TableHead>Temperatura</TableHead>
                <TableHead>Humedad</TableHead>
                <TableHead>Zona</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                items?.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{moment.utc(item.timestamp).tz("America/Argentina/Buenos_Aires").format("HH:mm A")}</TableCell>
                    <TableCell>{item.temperature}°C</TableCell>
                    <TableCell>{item.humidity}%</TableCell>
                    <TableCell>{item.area}</TableCell>
                    <TableCell>{item.area}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </div>
      </div>
      {
        (humidity.length > 0 && temperature.length > 0 && temperatureHeatmapData && humidityHeatmapData) &&
        <div className="flex-1 bg-gray-50 p-6 space-y-6">
          <div className="flex flex-row justify-between items-center">
            <h1 className="mb-6 text-2xl font-bold text-black">Panel</h1>
            <Popover>
              <PopoverTrigger asChild>
                <Button className="w-[280px] justify-start text-left font-normal text-black" id="date" variant="outline">
                  <CalendarClockIcon className="mr-2 h-4 w-4 text-black" />
                  Last {minutes} minutes
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-auto p-0">
                <div className="grid gap-2 p-2">
                  <Button variant="link" onClick={() => setMinutes(5)}>Last 5 minute</Button>
                  <Button variant="link" onClick={() => setMinutes(10)}>Last 10 minutes</Button>
                  <Button variant="link" onClick={() => setMinutes(15)}>Last 15 minutes</Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Temperatura</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart className="aspect-[16/9]" data={temperature} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Humedad</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart className="aspect-[16/9]" data={humidity} />
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Temperatura</CardTitle>
                <CardDescription>La ultima humedad registrada por invernadero</CardDescription>
              </CardHeader>
              <CardContent>
                <Heatmaps className="aspect-[16/9]" data={temperatureHeatmapData} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Humedad</CardTitle>
                <CardDescription>La ultima humedad registrada por invernadero</CardDescription>
              </CardHeader>
              <CardContent>
                <Heatmaps className="aspect-[16/9]" data={humidityHeatmapData} />
              </CardContent>
            </Card>
          </div>
        </div>
      }
    </div>
  )

  function CalendarClockIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" />
        <path d="M16 2v4" />
        <path d="M8 2v4" />
        <path d="M3 10h5" />
        <path d="M17.5 17.5 16 16.3V14" />
        <circle cx="16" cy="16" r="6" />
      </svg>
    )
  }
}
