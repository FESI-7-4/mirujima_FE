import React from 'react';

import { LinearGradient } from '@visx/gradient';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Bar } from '@visx/shape';
import { Text } from '@visx/text';
import { motion } from 'framer-motion';

type ChartDataType = {
  day: string;
  percentage: number;
};

const width = 300;
const height = 200;
const margin = { top: 40, right: 10, bottom: 0, left: 0 };

const BarChart = ({ data }: { data: ChartDataType[] }) => {
  const xScale = scaleBand({
    domain: data.map((d) => d.day),
    range: [margin.left, width - margin.right],
    padding: 0.4
  });

  const yScale = scaleLinear({
    domain: [0, 100],
    range: [height - margin.bottom, margin.top]
  });

  return (
    <svg width={width} height={height}>
      <LinearGradient id="gradient-bar" from="#F86969" to="#FBA5A5" />

      <Group>
        {data.map((d) => {
          const x = xScale(d.day)!;
          const barWidth = xScale.bandwidth();
          const barHeight = height - margin.bottom - yScale(d.percentage);
          const fullHeight = height - margin.bottom - yScale(100);

          return (
            <motion.g key={d.day}>
              <Bar
                x={x}
                y={yScale(100)}
                width={barWidth}
                height={fullHeight}
                fill="#F2EFEF"
                rx={15}
              />

              <motion.rect
                x={x}
                y={0}
                width={barWidth}
                height={barHeight}
                fill="url(#gradient-bar)"
                initial={{ height: 0, y: height - margin.bottom }}
                animate={{ height: barHeight, y: yScale(d.percentage) }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                rx={15}
              />

              <Text x={x + barWidth / 2} y={16} fontSize={14} textAnchor="middle">
                {d.day}
              </Text>
            </motion.g>
          );
        })}
      </Group>
    </svg>
  );
};

export default BarChart;
