export interface RoomFormData {
  stayID: string

  roomName: string
  roomTypeID: string

  capacity: string
  quantity: string
  currentPrice: string
  description: string

  image?: string[]
}

export interface RoomFormOptions {
  roomTypes: roomTypeOptions[]
  stays: StayOptions[]
}
export interface roomTypeOptions {
  roomTypeID: string
  roomType: string
}
export interface StayOptions {
  stayID: string
  stayName: string
  address?: string
  images?: string[]
}
export interface Room {
  id: string
  stayID: string
  roomName: string
  roomTypeID: string
  capacity: number
  quantity: number
  currentPrice: number
  description: string
  image_urls: string[]
}