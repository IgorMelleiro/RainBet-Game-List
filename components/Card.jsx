'use client'

import { motion } from 'framer-motion';

const Card = ({ data }) => {
  return (
    <motion.div 
      className="p-2 mb-4 sm:mb-8 md:mb-10 lg:mb-4 rounded-xl border-1 bg-[#151a33]"
      whileHover={{ scale: 1.05, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
    >
      <motion.img
        src={data.icon}
        alt="Vercel Logo"
        className="dark:invert object-contain"
        width={300}
        height={300}
        priority
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <p className="pt-2 sm:pt-4 text-center text-lg sm:text-2xl text-white font-bold">
        {data.name}
      </p>
    </motion.div>
  )
}

export default Card;