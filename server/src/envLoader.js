import { resolve } from 'path'
import dotenv from 'dotenv'

if (!process.env.NODE_ENV) throw new Error('node_env가 없습니다.')

const envPath = resolve(resolve(), `.env.${process.env.NODE_ENV}`)

dotenv.config({ path: envPath })

export default process.env
