import React, { useContext, useEffect, useState } from 'react'
import AdminTemplate from '../../components/admin/AdminTemplate'
import { Context } from '../../context/CeramicContext'
import { fetchData, sortSlips } from '../../crud'
import SlipsWidget from '../../components/admin/SlipsWidget'
import AdminEditDelete from '../../components/admin/AdminEditDelete'
import { assets } from '../../assets/assets'
import SearchIcon from '../../assets/SearchIcon'


const Archived = () => {
   const [sortType, setSortType] = useState('date')
   const [from,setFrom] = useState('hl')
  const {api,setSlips,slips} = useContext(Context)
  const [filter,setFilter] = useState([])
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const slipsPerPage = 20;
    
    
  useEffect(() => {
    document.title = 'Ceramic Slips | Admin Dashboard'
    fetchData(api+"api/getFormData",setSlips,"completed")
},[])
  

  useEffect(() => {
    let filtered = slips;
    if (searchTerm.trim() !== '') {
      filtered = slips.filter(slip =>
        slip.name && slip.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    sortSlips(filtered, setFilter,from,sortType);
  }, [sortType, from, searchTerm]);

  useEffect(() => {
      setFilter(slips);
      }, [slips]);

  // Pagination logic
  const totalPages = Math.ceil(filter.length / slipsPerPage);
  const startIdx = (currentPage - 1) * slipsPerPage;
  const endIdx = startIdx + slipsPerPage;
  const currentSlips = filter.slice(startIdx, endIdx);

  const scrollToTop = () => {
    const topElem = document.getElementById('top');
    if (topElem) {
      topElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const handlePrev = () => {
    setCurrentPage((prev) => {
      const newPage = Math.max(prev - 1, 1);
      setTimeout(scrollToTop, 0);
      return newPage;
    });
  };
  const handleNext = () => {
    setCurrentPage((prev) => {
      const newPage = Math.min(prev + 1, totalPages);
      setTimeout(scrollToTop, 0);
      return newPage;
    });
  };

  // Reset to page 1 if filter changes and current page is out of range
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [filter, totalPages]);


  return (
    <AdminTemplate>
    <div  className='flex flex-col gap-3 overflow-y-auto w-full p-4'>
       <div className='flex flex-row justify-between items-center'>
        <h1 id="top" className='text-2xl font-semibold text-left'>Archived Slips</h1>
        <div className='flex flex-row gap-2 items-center'>
          {/* Search icon and expanding search bar */}
          <div className='relative flex items-center'>
            {!showSearch && (
              <button
                onClick={() => setShowSearch(true)}
                className='p-2 hover:bg-gray-200 rounded-full transition-colors duration-200'
                aria-label='Search'
              >
                <SearchIcon size={24} />
              </button>
            )}
            {showSearch && (
              <div className='flex flex-row items-center gap-1'>
                <input
                  type='text'
                  autoFocus
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder='Search by name...'
                  className='border-2 border-gray-300 rounded px-2 py-1 text-sm w-40 transition-all duration-200'
                  onBlur={() => { if (searchTerm === '') setShowSearch(false); }}
                />
                <button
                  onClick={() => { setShowSearch(false); setSearchTerm(''); }}
                  className='ml-1 text-gray-500 hover:text-black px-1'
                  aria-label='Close search'
                >
                  ✕
                </button>
              </div>
            )}
          </div>
          <select value={sortType} onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300  text-sm p-4'>
              <option value="none">Sort by: None</option>
              <option value="name">Sort by: Name</option>
              <option value="date">Sort by: Date</option>
              <option value="price">Sort by: Price</option>
            </select>
            <select value={from} onChange={(e)=>setFrom(e.target.value)} className='border-2 border-gray-300  text-sm p-4'>
              <option value="lh">Ascending</option>
              <option value="hl">Descending</option>
            </select>
        </div>
       </div>
        {filter.length === 0 && (
          <div className='flex flex-col sm:justify-center items-center h-full w-full'>
            <img src={assets.placeholder} />
            <p className='text-gray-500 text-3xl'>No Forms to display</p>
          </div>
        )}
        {filter.length > 0 && (
          <>
            {currentSlips.map((slip, index) => (
              <div key={index}>
                <SlipsWidget data={slip} />
              </div>
            ))}
            <div className='flex flex-row justify-center items-center gap-4 mt-4'>
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`px-4 py-2 border rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : 'bg-white text-black'}`}
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 border rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-400' : 'bg-white text-black'}`}
              >
                Next
              </button>
            </div>
          </>
        )}
    </div>
    </AdminTemplate>
  )
}

export default Archived