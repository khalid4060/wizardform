import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import copy from 'rollup-plugin-copy';
import removeConsole from "vite-plugin-remove-console";

// Get the directory path of the current config file

const resolve = (dir) => path.resolve(__dirname, dir);
// https://vitejs.dev/config/

export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  
  if (['aleftest', 'alef', 'ccl'].includes(mode)) {
    process.env.NODE_ENV = 'production';
  }

  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  console.log(process.env.VITE_BASE_URL)
  return defineConfig({
    base: process.env.VITE_BASE_URL,
     server: {
       port: 3002,
     },
     plugins: [
       react(),
       removeConsole(),
       {
        name: 'suppress-warnings',
        apply: 'build',
        configResolved(config) {
          config.logger.warn = () => {}; // Override the warn method to suppress warnings
        },
      },
     ],
     resolve: {
       alias: {
         '@client': resolve('src'),
         '@components': resolve('src/components/'),
         '@store': resolve('src/store/'),
         '@utils': resolve('src/utils/'),
         '@hooks': resolve('src/hooks/'),
         '@api': resolve('src/api/'),
         '@images': resolve('src/assets/images'),
         '@icons': resolve('src/assets/images'),
         '@assets': resolve('src/assets'),
       },
     },
     css: {
      output: 'css', // Specify the directory for CSS files
    },
     build: {
       // Specify the output directory for CSS files
       silent: true,
       rollupOptions: {
         output: {
          
           entryFileNames: 'js/[name].js', // Change 'js/[name].[hash].js' to 'js/[name].js'
           chunkFileNames: 'js/[name].js', // Change 'js/[name].[hash].js' to 'js/[name].js'
           assetFileNames: (assetInfo) => {
             // Determine the output directory based on the asset type
             if (
              assetInfo.name.endsWith('.css')) {
              return 'css/[name].[ext]'; // Output fonts to the 'fonts' folder
             } else if (
               assetInfo.name.endsWith('.woff2') || 
               assetInfo.name.endsWith('.woff') || 
               assetInfo.name.endsWith('.eot') || 
               assetInfo.name.endsWith('.ttf')) {
               return 'fonts/[name].[ext]'; // Output fonts to the 'fonts' folder
             } else if (
               assetInfo.name.endsWith('.jpg') ||
               assetInfo.name.endsWith('.jpeg') ||
               assetInfo.name.endsWith('.png') ||
               assetInfo.name.endsWith('.svg') ||
               assetInfo.name.endsWith('.gif')
             ) {
               return 'images/[name].[ext]'; // Output images to the 'images' folder
             } else if (
               assetInfo.name.endsWith('.mp3') ||
               assetInfo.name.endsWith('.wav')
             ) {
               return 'audios/[name].[ext]'; // Output images to the 'images' folder
               
             }
             // For all other asset types, use the default output directory
             return '[name].[ext]';
           },
         },
       },
     },
   })
}
