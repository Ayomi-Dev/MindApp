import React from 'react'

export const isActive = () => {
    const [sideBarOpen, setSidebarOpen] = React.useState<boolean>(false)
    const toggleSidebar = () => {
        setSidebarOpen(!sideBarOpen)
        console.log("Sidebar toggled:", !sideBarOpen)
    }
  return (
    {sideBarOpen, toggleSidebar}
  )
}
