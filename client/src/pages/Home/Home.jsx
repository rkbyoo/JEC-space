import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetProducts } from '../../apicalls/products'
import { message, Divider } from 'antd';
import { SetLoader } from '../../redux/loadersSlice';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Filters from './Filters';


function Home() {
  const [showFilters, setShowFilters] = useState(true);
  const { user } = useSelector((state) => state.users)
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    status: "approved",
    category: [],
    age: [],
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const products = await GetProducts(filters);
      dispatch(SetLoader(false));
      if (products.success) {
        setProducts(products.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  }
  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    console.log(filters);
  }, [filters])
  return (
    <div className='flex gap-5'>
      {showFilters && <Filters
        filters={filters}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        setFilters={setFilters}
      />}
      <div className='flex flex-col gap-5'>
        <div className='flex gap-5'>
          {!showFilters && (
            <i className="ri-equalizer-line cursor-pointer text-xl"
              onClick={() => setShowFilters(!showFilters)}
            ></i>
          )}
          <input type="text"
            className='border rounded-xl border-gray-300 border-solid p-2 w-full h-12'
            placeholder='Search for products'
          />
        </div>
        <div className={
          `grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 ${showFilters ? 'xl:grid-cols-4' : 'xl:grid-cols-5'}`
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
    </div>
  )
}

export default Home
