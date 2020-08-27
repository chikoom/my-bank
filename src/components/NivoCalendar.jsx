import { ResponsiveCalendar } from '@nivo/calendar'
import React from 'react'
import { formatDate } from '../services/utils'

const MyResponsiveCalendar = ({ data }) => (
  <ResponsiveCalendar
    data={data}
    from='2020-01-01'
    to='2020-12-31'
    emptyColor='#eeeeee'
    colors={['#FFAAAA', '#D46A6A', '#D46A6A', '#801515']}
    minValue='auto'
    margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
    yearSpacing={50}
    monthBorderWidth={0}
    monthBorderColor='#ffffff'
    dayBorderWidth={2}
    dayBorderColor='#ffffff'
    tooltip={e => {
      const date = `Date: ${formatDate(e.date)}`
      const amount = `Amount: ${e.value}`
      return (
        <div>
          <div>{date}</div>
          <div>{amount}</div>
        </div>
      )
    }}
  />
)

export default MyResponsiveCalendar
