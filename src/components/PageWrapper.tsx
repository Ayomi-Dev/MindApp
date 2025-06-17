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
      className="md:w-[85%] md:left-[15%] md:rounded-tl-lg left-0 top-[60px] relative"
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