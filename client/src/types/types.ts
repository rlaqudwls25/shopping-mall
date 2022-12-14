export enum METHOD {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
}

export interface fetchObj {
  [key: string]: any
}

export type Rating = {
  rate: number
  count: number
}

export type Product = {
  category: string
  description: string
  id: string
  imageUrl: string
  price: number
  title: string
}
