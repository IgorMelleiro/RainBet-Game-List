'use client'

import { useEffect, useState } from "react";
import Carousel from "@/components/Caroussel";

export default function Home() {

  const [data, setData] = useState()
  const [filteredData, setFilteredData] = useState([]);


  // Fetching the url data
  const apiUrl = 'https://api-casino.recois.com/slots/list'
  const pullData = async () => {
    const response = await fetch(apiUrl)
    const responseData = await response.json()
    const gamesList = responseData.result.games
    setData(gamesList)
    setFilteredData(gamesList)
  }

  // Rendering the data fetching
  useEffect(() => {
    pullData()
  }, [])

  return (
    <main className="px-12 py-12">
      <div>
        {data?.length > 0 ? <Carousel data={filteredData} /> : <p>Loading...</p>}
      </div>
    </main>
  )
}