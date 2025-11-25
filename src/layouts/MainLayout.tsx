import { useEffect, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "@/components/navbar"
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
