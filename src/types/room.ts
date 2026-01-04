export interface RoomFormData {
  stayID: string

  roomName: string
  roomTypeID: string

  capacity: number
  quantity: number
  currentPrice: number
  description: string

  image: string[]
}

export interface RoomFormOptions {
  roomTypes: roomTypeOptions[]
  stays: StayOptions[]
}
export interface roomTypeOptions {
  roomTypeID: string
  roomTypeName: string
}
export interface StayOptions {
  stayID: string
  stayName: string
  address?: string
  images?: string[]
}