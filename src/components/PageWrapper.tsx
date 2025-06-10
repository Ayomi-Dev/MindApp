import { motion } from "framer-motion"
import { type ReactNode } from "react"

export const PageWrapper = ({children}: {children: ReactNode}) => {
    const variants = {
      hidden: { opacity: 0, y: 20 },
      enter: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    };

  return (
    <motion.div
      className="flex-1"
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: .5, ease: 'easeInOut' }}
    >
      {children}

    </motion.div>
  )
}