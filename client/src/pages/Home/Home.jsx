import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetProducts } from '../../apicalls/products'
import { message, Divider } from 'antd';
import { SetLoader } from '../../redux/loadersSlice';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Filters from './Filters';
import { setFilters } from '../../redux/filtersSlice';
import ChatBot from '../../components/chatbot';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filters = useSelector((state) => state.filters); // 👈 get filters from Redux
  const [searchText, setSearchText] = useState(filters.search || '');

  const [products, setProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(true);
  const [showChatbot,setShowChatbot]=useState(false);

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(filters); // 👈 filters from Redux
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData(); // 👈 re-fetch when filters change
  }, [filters]);

  return (
    <div className={`flex gap-5 ${!showFilters ? 'justify-center' : ''}`}>
      {showFilters && <Filters
          filters={filters}
          setFilters={(newFilters) => dispatch(setFilters(newFilters))} // 👈 update Redux
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          getData={getData}
      />}
      
      <div className='flex flex-col gap-5 w-full'>
        <div className='flex gap-5 sticky h-fit top-24 z-10'>
          {!showFilters && (
            <i className="ri-equalizer-line cursor-pointer text-xl text-blue-600 self-center"
              onClick={() => setShowFilters(!showFilters)}
            ></i>
          )}
          <input
            type="text"
            value={searchText}
            onChange={(e) => {
              const value = e.target.value;
              setSearchText(value);
              dispatch(setFilters({ ...filters, search: value }));
            }}
            className='border rounded-xl border-gray-300 border-solid p-2 w-full h-12'
            placeholder='Search for products'
          />

        </div>
        <div className={
          `grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 ${showFilters ? 'xl:grid-cols-3' : 'xl:grid-cols-4'}`
        }>
          {products?.map((product, index) => {
            return (
              <div
                key={index}
                className="cursor-default bg-gray-900/50"

              >
                <div
                  className="border border-gray-300 rounded-2xl border-solid flex flex-col overflow-hidden 
                      shadow-md hover:shadow-blue-400/30 hover:shadow-2xl transition-all duration-300 hover:scale-105 
                      group relative hover:border-blue-500 hover:ring-4 hover:ring-blue-400/40"
                >
                  {/* Product Image */}
                  <div className="w-full h-56 overflow-hidden bg-gray-100">
                    <img
                      src={product.images[0]}
                      className="w-full h-full object-cover transition-all duration-300 
                          group-hover:brightness-110 group-hover:scale-105"
                      alt={product.name}
                    />
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-gray-200" />

                  {/* Product Details */}
                  <div className="p-5 flex flex-col gap-2">
                    <h2 className="text-lg font-semibold text-gray-400 group-hover:text-blue-600 transition-colors duration-300">
                      {product.name}
                    </h2>
                    <p className="text-sm text-gray-400 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-semibold text-blue-600">
                        ${product.price.toFixed(2)}
                      </span>
                      <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button className="p-2 text-sm border rounded-lg border-solid border-blue-600 text-blue-600 font-medium hover:text-blue-800 hover:border-blue-800 transition-colors"
                          onClick={() => navigate(`/product/${product._id}`)}
                        >
                          View details
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Floating Add to Cart Button */}
                  <button
                    className="absolute top-3 right-3 bg-blue-600 text-white p-2 rounded-full 
                        opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-700
                        transform shadow-lg hover:shadow-blue-500/50"
                    aria-label="Add to cart"
                  >
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
            )
          })}

          

        </div>

      </div>

      <button
        onClick={() => setShowChatbot(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-3 rounded-full 
                  shadow-xl hover:scale-105 hover:shadow-blue-400/50 transition-transform duration-300 flex items-center gap-2 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.983 9.983 0 01-7.391-3.308L3 20l1.308-2.609A9.983 9.983 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span className="font-semibold">Chat with us</span>
      </button>

      {/* Chatbot Modal Overlay */}
      {showChatbot && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="w-[90%] max-w-md h-[500px] rounded-xl shadow-xl p-4 relative overflow-hidden">
            <button
              onClick={() => setShowChatbot(false)}
              className="absolute top-3 right-7 text-green-400 hover:text-gray-800 text-xl font-bold"
            >
              &times;
            </button>
            <ChatBot />
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
