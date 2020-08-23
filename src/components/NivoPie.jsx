import { ResponsivePie } from '@nivo/pie'
import React from 'react'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const MyResponsivePie = ({ data /* see data tab */ }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    startAngle={360}
    endAngle={-360}
    innerRadius={0.5}
    padAngle={2}
    cornerRadius={6}
    colors={{ scheme: 'pastel2' }}
    borderWidth={1}
    borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
    radialLabelsSkipAngle={0}
    radialLabelsTextXOffset={10}
    radialLabelsTextColor='#333333'
    radialLabelsLinkOffset={0}
    radialLabelsLinkDiagonalLength={5}
    radialLabelsLinkHorizontalLength={20}
    radialLabelsLinkStrokeWidth={1}
    radialLabelsLinkColor={{ from: 'color', modifiers: [] }}
    slicesLabelsSkipAngle={10}
    slicesLabelsTextColor='#333333'
    animate={true}
    motionStiffness={90}
    motionDamping={15}
    legends={[
      {
        anchor: 'bottom',
        direction: 'row',
        translateY: 56,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: '#999',
        symbolSize: 18,
        symbolShape: 'circle',
        effects: [
          {
            on: 'hover',
            style: {
              itemTextColor: '#000',
            },
          },
        ],
      },
    ]}
  />
)

export default MyResponsivePie
