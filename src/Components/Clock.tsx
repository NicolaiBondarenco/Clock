import React, { useEffect, useState } from 'react'
import Numbers from '../Components/Numbers'
import Arrows from './Arrows'
import axios from 'axios'

interface TimezoneInfo {
  abbreviation: string
  client_ip: string
  datetime: string
  day_of_week: number
  day_of_year: number
  dst: boolean
  dst_from: string
  dst_offset: number
  dst_until: string
  raw_offset: number
  timezone: string
  unixtime: number
  utc_datetime: string
  utc_offset: string
  week_number: number
}

const Clock: React.FC = () => {
  const [data, setData] = useState<TimezoneInfo>({
    abbreviation: '',
    client_ip: '',
    datetime: '',
    day_of_week: 0,
    day_of_year: 0,
    dst: true,
    dst_from: '',
    dst_offset: 0,
    dst_until: '',
    raw_offset: 0,
    timezone: '',
    unixtime: 0,
    utc_datetime: '',
    utc_offset: '',
    week_number: 0,
  })
  const [arror, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  const fullTime: string = data.datetime
  const clearTime: string = fullTime.substr(11, 8)

  const [hours, minutes, seconds] = clearTime.split(':').map(Number)

  const hour = (hours % 12) * 30 + (minutes / 60) * 30 + (seconds / 3600) * 30

  const minute = (minutes / 60) * 360

  const second = (seconds / 60) * 360

  useEffect(() => {
    async function fetchData() {
      await axios
        .get('https://worldtimeapi.org/api/timezone/Europe/Chisinau')
        .then((res: any) => {
          setData(res.data)
          setLoading(false)
          setError(false)
        })
        .catch((err: any) => {
          setError(true)
          setLoading(false)
        })
    }
    setInterval(() => fetchData(), 1000)
  }, [])

  if (arror) return <p style={{ color: 'red' }}>Error!!!</p>
  if (loading) return <p style={{ color: 'black' }}>Loading!!!</p>

  return (
    <div className="clock">
      <Numbers />
      <Arrows ternArrow={hour} classWrapper={'hour'} classArrow={'hr'} />
      <Arrows ternArrow={minute} classWrapper={'min'} classArrow={'mn'} />
      <Arrows ternArrow={second} classWrapper={'sec'} classArrow={'sc'} />
    </div>
  )
}
export default Clock
