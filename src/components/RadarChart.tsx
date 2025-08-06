import React from 'react';

interface RadarChartProps {
  data: Array<{
    trait: string;
    score: number;
    color: string;
  }>;
}

export const RadarChart: React.FC<RadarChartProps> = ({ data }) => {
  const size = 300;
  const center = size / 2;
  const maxRadius = size / 2 - 40;
  
  const angleStep = (2 * Math.PI) / data.length;
  
  const getPosition = (angle: number, radius: number) => ({
    x: center + radius * Math.cos(angle - Math.PI / 2),
    y: center + radius * Math.sin(angle - Math.PI / 2)
  });

  const pathData = data
    .map((item, index) => {
      const angle = index * angleStep;
      const radius = (item.score / 100) * maxRadius;
      const { x, y } = getPosition(angle, radius);
      return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(' ') + ' Z';

  return (
    <div className="flex justify-center">
      <svg width={size} height={size} className="transform scale-110">
        {/* Background circles */}
        {[20, 40, 60, 80, 100].map((percentage) => (
          <circle
            key={percentage}
            cx={center}
            cy={center}
            r={(percentage / 100) * maxRadius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {data.map((_, index) => {
          const angle = index * angleStep;
          const { x, y } = getPosition(angle, maxRadius);
          return (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1"
            />
          );
        })}

        {/* Data area */}
        <path
          d={pathData}
          fill="rgba(168, 85, 247, 0.2)"
          stroke="rgba(168, 85, 247, 0.8)"
          strokeWidth="2"
        />

        {/* Data points */}
        {data.map((item, index) => {
          const angle = index * angleStep;
          const radius = (item.score / 100) * maxRadius;
          const { x, y } = getPosition(angle, radius);
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="4"
              fill="rgba(168, 85, 247, 1)"
              className="animate-pulse"
            />
          );
        })}

        {/* Labels */}
        {data.map((item, index) => {
          const angle = index * angleStep;
          const labelRadius = maxRadius + 25;
          const { x, y } = getPosition(angle, labelRadius);
          return (
            <text
              key={index}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-white text-sm font-medium"
            >
              {item.trait}
            </text>
          );
        })}
      </svg>
    </div>
  );
};