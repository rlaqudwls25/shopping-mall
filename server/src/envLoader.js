import { resolve } from 'path'
import dotenv from 'dotenv'

if (!process.env.NODE_ENV) throw new Error('node_env가 없습니다.')
dotenv.config({ path: resolve(resolve(), `.env.${process.env.NODE_ENV}`) })

console.log('pro', process.env)

export default process.env
