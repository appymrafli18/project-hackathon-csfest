import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function NotFoundPage() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center px-6 text-center bg-gray-50">
      
      {/* Illustration */}
      <div className="mb-8 opacity-90">
        <svg
          width="180"
          height="180"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M44,-76.2C56.6,-68.4,65.7,-56.3,73.1,-43C80.4,-29.6,86,-14.8,86.7,0.4C87.5,15.7,83.3,31.4,73.9,43.9C64.5,56.4,50,65.7,35.3,71.8C20.6,78,5.8,81,-9.1,82.3C-24,83.7,-39,83.5,-52.1,77C-65.3,70.5,-76.6,57.8,-82.6,43.3C-88.5,28.8,-89.1,12.4,-88.1,-4.3C-87.1,-21,-84.5,-38.1,-75.2,-48.9C-66,-59.8,-50.1,-64.5,-35.2,-71.2C-20.3,-78,-6.4,-86.9,6.7,-87.3C19.8,-87.7,39.5,-79.9,44,-76.2Z"
            fill="oklch(43.7% 0.078 188.216)"
          />
        </svg>
      </div>

      {/* Header */}
      <h1 className="text-6xl font-bold text-gray-800">404</h1>

      {/* Subtitle */}
      <p className="text-lg text-gray-600 mt-4 max-w-md">
        Halaman yang Anda cari tidak ditemukan. Mungkin sudah dipindahkan atau alamatnya salah.
      </p>

      {/* Button */}
      <div className="mt-8">
        <Link to="/">
          <Button className="px-6 py-2 text-white bg-teal-800 hover:bg-teal-700">
            Kembali ke Beranda
          </Button>
        </Link>
      </div>
    </div>
  )
}
