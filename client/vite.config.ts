import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default () => {
  return defineConfig({
    plugins: [react()],
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
  })
}
