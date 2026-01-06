type FormDataValue =
  | string
  | number
  | boolean
  | File
  | (string | number | boolean | File)[]
export type FormDataInput = Record<string, FormDataValue>