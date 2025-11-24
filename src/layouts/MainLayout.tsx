import { useEffect, type ReactNode } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Navbar from "@/components/navbar"
import { jurusanMap, prodiMap } from "@/lib/breadcrumbMap"
type Props = {
  children: ReactNode
}

export default function MainLayout({ children }: Props) {
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) {
      navigate("/login")
    }
  }, [])

  return (
    <div>
      <Navbar />
      <div className="py-8 max-w-7xl mx-auto px-6">
        {children}
      </div>
    </div>
  )
}
