"use client"

import { MessageCircle, Folder, Archive, FileText } from "lucide-react"

export function Sidebar() {
  const sidebarItems = [
    { icon: MessageCircle, label: "Messages" },
    { icon: Folder, label: "Folder" },
    { icon: Archive, label: "Archive" },
    { icon: FileText, label: "Documents" },
  ]

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40">
      <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col gap-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.label}
              className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
              title={item.label}
            >
              <Icon className="w-5 h-5" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
