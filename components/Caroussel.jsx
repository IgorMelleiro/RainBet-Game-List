'use client'

import { useState } from 'react'
import { motion } from 'framer-motion';
import Card from './Card' 

const itemsPerPage = 6

const Carousel = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handlePrev = () => {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1)
  }

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const startIdx = (currentPage - 1) * itemsPerPage
  const endIdx = startIdx + itemsPerPage
  const currentData = filteredData.slice(startIdx, endIdx);

  const sliderVariants = {
    enter: (direction) => {
      return {
        x: direction === 'next' ? '100%' : '-100%',
        opacity: 0,
      };
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => {
      return {
        x: direction === 'next' ? '-100%' : '100%',
        opacity: 0,
      };
    },
  };

  return (
    <div className="carousel w-full overflow-hidden">
      <div className="search-bar mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-4 w-full bg-[#151a33] focus:outline-none rounded-xl"
        />
      </div>
      <motion.div
        className="card-slider flex overflow-x-scroll"
        initial="enter"
        animate="center"
        exit="exit"
      >
        <motion.div
          key={currentPage}
          custom={currentPage > 1 ? 'prev' : 'next'}
          variants={sliderVariants}
          transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
          className="flex grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {currentData.map((item) => (
            <Card data={item} key={item.id} />
          ))}
        </motion.div>
      </motion.div>
      <div className="pagination flex justify-center mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-[#151a33] text-white rounded"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          disabled={endIdx >= filteredData.length}
          className="ml-4 px-4 py-2 bg-[#151a33] text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Carousel