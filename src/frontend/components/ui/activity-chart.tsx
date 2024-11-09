// components/ui/activity-chart.tsx
interface DataPoint {
  name: string
  proposals: number
  votes: number
}

interface ActivityChartProps {
  data: DataPoint[]
  className?: string
}

export function ActivityChart({ data, className = '' }: ActivityChartProps) {
  const maxValue = Math.max(...data.flatMap(d => [d.proposals, d.votes]))
  const chartHeight = 250
  const chartWidth = 600
  const padding = { top: 20, right: 30, bottom: 30, left: 40 }
  const barWidth = (chartWidth - padding.left - padding.right) / (data.length * 2) / 1.5

  const scale = (value: number) => 
    ((chartHeight - padding.top - padding.bottom) * (1 - value / maxValue))
  
  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num/1000).toFixed(1)}k`
    return num.toString()
  }

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="w-full h-full"
      >
        {/* Y-axis */}
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={chartHeight - padding.bottom}
          stroke="currentColor"
          strokeOpacity={0.2}
        />
        
        {/* X-axis */}
        <line
          x1={padding.left}
          y1={chartHeight - padding.bottom}
          x2={chartWidth - padding.right}
          y2={chartHeight - padding.bottom}
          stroke="currentColor"
          strokeOpacity={0.2}
        />

        {/* Y-axis labels */}
        {[0, maxValue/2, maxValue].map((value, i) => (
          <g key={i}>
            <text
              x={padding.left - 5}
              y={padding.top + scale(value)}
              textAnchor="end"
              alignmentBaseline="middle"
              className="text-xs fill-current opacity-50"
            >
              {formatNumber(value)}
            </text>
            <line
              x1={padding.left}
              y1={padding.top + scale(value)}
              x2={chartWidth - padding.right}
              y2={padding.top + scale(value)}
              stroke="currentColor"
              strokeOpacity={0.1}
              strokeDasharray="4 4"
            />
          </g>
        ))}

        {/* Data */}
        {data.map((d, i) => {
          const x = padding.left + (i * (barWidth * 4)) + barWidth
          const baseY = chartHeight - padding.bottom

          return (
            <g key={i}>
              {/* X-axis labels */}
              <text
                x={x + barWidth}
                y={baseY + 20}
                textAnchor="middle"
                className="text-xs fill-current opacity-50"
              >
                {d.name}
              </text>

              {/* Proposals bar */}
              <rect
                x={x}
                y={padding.top + scale(d.proposals)}
                width={barWidth}
                height={baseY - (padding.top + scale(d.proposals))}
                className="fill-indigo-500"
                rx={2}
              >
                <title>{`Förslag: ${d.proposals}`}</title>
              </rect>

              {/* Votes bar */}
              <rect
                x={x + barWidth * 1.5}
                y={padding.top + scale(d.votes)}
                width={barWidth}
                height={baseY - (padding.top + scale(d.votes))}
                className="fill-emerald-500"
                rx={2}
              >
                <title>{`Röster: ${d.votes}`}</title>
              </rect>
            </g>
          )
        })}

        {/* Legend */}
        <g transform={`translate(${chartWidth - padding.right - 100}, ${padding.top})`}>
          <rect width="12" height="12" className="fill-indigo-500" />
          <text x="20" y="10" className="text-xs fill-current">Förslag</text>
          
          <rect y="20" width="12" height="12" className="fill-emerald-500" />
          <text x="20" y="30" className="text-xs fill-current">Röster</text>
        </g>
      </svg>
    </div>
  )
}
