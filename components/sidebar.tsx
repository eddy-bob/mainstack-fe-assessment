"use client"

import Image from "next/image"

export function Sidebar() {
  const sidebarItems = [
    { icon: <Image alt="Messages" src="side-icon-1.svg" width={40} height={40}/>, label: "Messages" },
    { icon: <Image alt="Folder"   src="side-icon-2.svg" width={40} height={40}/>, label: "Folder" },
    { icon:  <Image alt="Archive" src="side-icon-3.svg" width={40} height={40}/>, label: "Archive" },
    { icon:  <Image alt="Documents" src="side-icon-4.svg" width={40} height={40}/>, label: "Documents" },
  ]

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40">
      <div className="bg-white rounded-[22px] shadow-lg p-[10px] flex flex-col gap-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.label}
              className="w-6 h-6 flex items-center justify-center transition-all duration-200 group"
              title={item.label}
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 filter grayscale hover:grayscale-0 hover:scale-110">
                {Icon}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
