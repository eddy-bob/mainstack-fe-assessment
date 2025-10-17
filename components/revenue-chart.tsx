"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchChartData } from "@/lib/api"
import { useEffect, useState } from "react"

export function RevenueChart() {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ["chartData"],
    queryFn: fetchChartData,
  })

  const [animationProgress, setAnimationProgress] = useState(0)

  useEffect(() => {
    if (chartData) {
      const duration = 1500
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        setAnimationProgress(progress)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }
  }, [chartData])

  if (isLoading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading chart...</div>
      </div>
    )
  }

  if (!chartData || chartData.length === 0) {
    return <div className="h-[300px] flex items-center justify-center text-muted-foreground">No data available</div>
  }

  const width = 800
  const height = 300
  const padding = { top: 20, right: 20, bottom: 40, left: 50 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  const values = chartData.map((d) => d.value)
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)
  const valueRange = maxValue - minValue

  // Generate smooth curve path using data points
  const points = chartData.map((d, i) => {
    const x = (i / (chartData.length - 1)) * chartWidth
    const y = chartHeight - ((d.value - minValue) / valueRange) * chartHeight
    return { x, y }
  })

  // Create smooth curve using quadratic bezier curves
  let pathData = `M ${points[0].x} ${points[0].y}`

  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i]
    const next = points[i + 1]
    const controlX = (current.x + next.x) / 2
    const controlY = (current.y + next.y) / 2
    pathData += ` Q ${current.x} ${current.y}, ${controlX} ${controlY}`
  }

  pathData += ` T ${points[points.length - 1].x} ${points[points.length - 1].y}`

  // Animate the path
  const animatedPathData = pathData
  const totalLength = 1000 // Approximate path length
  const dashOffset = totalLength * (1 - animationProgress)

  const firstDate = new Date(chartData[0].date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
  const lastDate = new Date(chartData[chartData.length - 1].date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return (
    <div className="relative">
      <div className="h-[300px] w-full">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
          <g transform={`translate(${padding.left}, ${padding.top})`}>
            {/* Chart line with animation */}
            <path
              d={animatedPathData}
              fill="none"
              stroke="#E67E50"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: totalLength,
                strokeDashoffset: dashOffset,
                transition: "stroke-dashoffset 0.05s linear",
              }}
            />

            {/* Date labels */}
            <text
              x="0"
              y={chartHeight + 30}
              fill="#999"
              fontSize="13"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {firstDate}
            </text>
            <text
              x={chartWidth}
              y={chartHeight + 30}
              fill="#999"
              fontSize="13"
              fontFamily="system-ui, -apple-system, sans-serif"
              textAnchor="end"
            >
              {lastDate}
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}
