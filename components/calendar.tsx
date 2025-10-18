"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CalendarProps {
  selectedDate: string
  onDateSelect: (date: string) => void
  onClose: () => void
  isOpen: boolean
}

export function Calendar({ selectedDate, onDateSelect, onClose, isOpen }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [showYearSelector, setShowYearSelector] = useState(false)
  const calendarRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Close year selector when calendar closes
  useEffect(() => {
    if (!isOpen) {
      setShowYearSelector(false)
    }
  }, [isOpen])

  const selectedDateObj = new Date(selectedDate)
  
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const getNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const handleYearSelect = (year: number) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1))
    setShowYearSelector(false)
  }

  const getYearRange = () => {
    const currentYear = new Date().getFullYear()
    const selectedYear = new Date(selectedDate).getFullYear()
    const years = []
    
    // Start from the earlier of 2015, selected year, or current year - 10
    const startYear = Math.min(2015, selectedYear, currentYear - 10)
    // End at the later of current year + 5 or selected year + 5
    const endYear = Math.max(currentYear + 5, selectedYear + 5)
    
    for (let year = startYear; year <= endYear; year++) {
      years.push(year)
    }
    return years
  }

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  }

  const isSelectedDate = (day: number) => {
    // Parse the selected date string to avoid timezone issues
    const [selectedYear, selectedMonth, selectedDay] = selectedDate.split('-').map(Number)
    return (
      selectedDay === day &&
      selectedMonth - 1 === currentDate.getMonth() && // Month is 0-indexed in Date objects
      selectedYear === currentDate.getFullYear()
    )
  }

  const handleDateClick = (day: number) => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    // Create date in local timezone and format as YYYY-MM-DD
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    onDateSelect(formattedDate)
    onClose()
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDayOfMonth = getFirstDayOfMonth(currentDate)
  const days = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null)
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day)
  }

  if (!isOpen) return null

  return (
    <div
      ref={calendarRef}
      className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 p-4 w-80"
    >
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={getPreviousMonth}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium">
            {currentDate.toLocaleDateString("en-US", { month: "long" })}
          </h3>
          <button
            onClick={() => setShowYearSelector(!showYearSelector)}
            className="px-2 py-1 text-sm font-medium hover:bg-gray-100 rounded transition-colors"
          >
            {currentDate.getFullYear()}
          </button>
        </div>
        
        <button
          onClick={getNextMonth}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Year Selector */}
      {showYearSelector && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto">
            {getYearRange().map((year) => (
              <button
                key={year}
                onClick={() => handleYearSelect(year)}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  year === currentDate.getFullYear()
                    ? "bg-black text-white"
                    : "hover:bg-gray-200 text-gray-700"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="text-xs text-gray-500 text-center py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 text-sm">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => day && handleDateClick(day)}
            disabled={!day}
            className={cn(
              "w-8 h-8 text-sm rounded transition-colors",
              day
                ? isSelectedDate(day)
                  ? "bg-black rounded-full text-white"
                  : "hover:bg-gray-100 text-gray-900"
                : "cursor-not-allowed"
            )}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  )
}
