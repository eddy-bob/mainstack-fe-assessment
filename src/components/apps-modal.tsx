import { useState, useEffect, useRef } from "react"
import { ChevronRight, Info } from "lucide-react"

interface AppsModalProps {
  isOpen: boolean
  onClose: () => void
}

interface AppItem {
  id: string
  title: string
  description: string
  icon: string
}

const apps: AppItem[] = [
  {
    id: "link-in-bio",
    title: "Link in Bio",
    description: "Manage your Link in Bio",
    icon: "/product-icon-1.png"
  },
  {
    id: "store",
    title: "Store",
    description: "Manage your Store activities",
    icon: "/product-icon-2.png"
  },
  {
    id: "media-kit",
    title: "Media Kit",
    description: "Manage your Media Kit",
    icon: "/product-icon-3.png"
  },
  {
    id: "invoicing",
    title: "Invoicing",
    description: "Manage your Invoices",
    icon: "/product-icon-4.png"
  },
  {
    id: "bookings",
    title: "Bookings",
    description: "Manage your Bookings",
    icon: "/product-icon-1.png"
  }
]

export function AppsModal({ isOpen, onClose }: AppsModalProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
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

  if (!isOpen) return null

  return (
    <div className="absolute top-12  mt-2 z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-lg border border-gray-200 py-2 w-80 space-y-1.5"
      >
        {apps.map((app) => (
          <div
            key={app.id}
            className={`px-4 py-3.5 cursor-pointer  mx-2 transition-all duration-200 flex items-center justify-between group ${
              hoveredItem === app.id 
                && " hover:border hover:rounded-lg" 
                
            }`}
            onMouseEnter={() => setHoveredItem(app.id)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => {
              // Handle app click
              onClose()
            }}
          >
            <div className="flex items-center  hover:gap-0 gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border p-2">
                <img
                  src={app.icon}
                  alt={app.title}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-900">
                  {app.title}
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  {app.description}
                </span>
              </div>
            </div>
            
            <div className="flex items-center">
              {hoveredItem === app.id && (
                <ChevronRight className="w-3 h-3 text-gray-400" />
              ) }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
