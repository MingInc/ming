import * as AspectRatio from '@radix-ui/react-aspect-ratio'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui'

export default function NotFound() {

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full shadow">
        <AspectRatio.Root ratio={16 / 9}>
          <div className="w-full h-full bg-white text-black rounded-lg overflow-hidden shadow-lg">
            <motion.div
              className="w-full h-full flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1
                className="text-6xl font-bold mb-2"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                404
              </motion.h1>
              <motion.p
                className="text-xl mb-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Oops! The page you're looking for doesn't exist.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Button asChild>
                  <a href="/">
                    Go back home
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </AspectRatio.Root>
      </div>
    </div>
  )
}