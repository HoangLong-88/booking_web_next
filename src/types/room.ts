export interface RoomFormData {
  stayID: string
  roomID?: string

  roomName: string
  roomTypeID: string

  capacity: Number
  quantity: Number
  currentPrice: Number
  description: string

  image: string[]
}

export interface RoomFormOptions {
  roomTypes: {
    roomTypeID: string
    roomTypeName: string
  }[]
}
