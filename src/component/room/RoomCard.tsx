import Image from "next/image"
import { Card, CardContent } from "@/component/ui/Card"
import { CustomButton } from "@/component/ui/Button"
import { Room } from "@/types/room"
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from "react"

interface Props {
  room: Room
}

export default function RoomCard({ room }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % room.image_urls.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [room.image_urls.length])
  return (
    <Card className="bg-neutral-900 text-white border border-neutral-800 rounded-xl overflow-hidden">
      <CardContent     
      className="
        grid
        grid-cols-[minmax(280px,320px)_minmax(0,1fr)_160px_100px_140px]
        p-0
        items-stretch
      ">
        
        {/* LEFT – IMAGE + INFO */}
        <div className="bg-white text-black p-4">
          <div className="relative w-[260px] h-[180px] overflow-hidden rounded-lg">
            <AnimatePresence>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <Image
                  src={room.image_urls[currentIndex]}
                  alt={room.roomName}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>


          <h3 className="mt-3 font-semibold text-lg">
            {room.roomName} - {room.roomType}
          </h3>

          <ul className="text-sm text-gray-600 mt-2 space-y-1">
            <li>📐 18 m²</li>
            <li>🛏 1 giường cỡ queen</li>
            <li>🚿 Vòi tắm đứng</li>
            <li>❄️ Máy lạnh</li>
          </ul>

          <button className="text-blue-600 text-sm mt-3 underline">
            Xem chi tiết phòng
          </button>
        </div>

        {/* ROOM OPTIONS */}

        {/* GUEST */}
        <div className="p-4 flex bg-white items-start justify-center border-l border-neutral-800">
          <div className="flex gap-1">
            {Array.from({ length: room.capacity }).map((_, i) => (
              <span key={i} className="text-xl">👤</span>
            ))}
          </div>
        </div>

        {/* PRICE */}
        <div className="p-4 border-l bg-white border-neutral-800">
          <span className="inline-block bg-blue-700 text-xs px-2 py-1 rounded-md mb-2">
            Cam kết giá tốt
          </span>

          <p className="line-through text-sm text-gray-400">
            {(room.currentPrice * 1.3).toLocaleString()} VND
          </p>

          <p className="text-orange-400 text-xl font-bold">
            {room.currentPrice.toLocaleString()} VND
          </p>

          <p className="text-xs text-gray-400">
            Chưa bao gồm thuế và phí
          </p>
        </div>

        {/* ROOM COUNT */}
        <div className="p-4 border-l bg-white border-neutral-800 text-center">
          x{room.quantity}
        </div>

        {/* CTA */}
        <div className="p-4 border-l bg-white border-neutral-800 flex flex-col items-center justify-center gap-2">
          <CustomButton className="bg-sky-600 hover:bg-sky-700">
            Chọn
          </CustomButton>

          {room.quantity <= 5 && room.availableQuantity && (
            <span className="bg-white text-red-500 text-sm">
              {`Chỉ còn ${room.availableQuantity} phòng`}
            </span>
          )}
        </div>

      </CardContent>
    </Card>
  )
}
