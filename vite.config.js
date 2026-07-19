import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Set VITE_SINGLEFILE=1 to emit one self-contained dist/index.html
// (JS + CSS inlined). A post-build step then inlines the /assets/*.
const singleFile = !!process.env.VITE_SINGLEFILE

export default defineConfig({
  base: singleFile ? './' : '/',
  plugins: [react(), ...(singleFile ? [viteSingleFile()] : [])],
  server: {
    port: 5180,
    strictPort: true,
  },
})
