// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { GetProducts, GetSingleProduct } from '../apicalls/products'
// import { message, Divider } from 'antd';
// import { SetLoader } from '../redux/loadersSlice';
// import { useNavigate, useParams } from 'react-router-dom';

// function ProductInfo() {
//   const {id} = useParams();
//   const [product,setProduct] = useState(null);
//   const [selectedImageIndex,setSelectedImageIndex] = useState(0);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const getData = async () => {
//     try {
//       dispatch(SetLoader(true));
//       const singleProduct = await GetSingleProduct(id);
//       dispatch(SetLoader(false));
//       setProduct(singleProduct.data);
//     } catch (error) {
//       dispatch(SetLoader(false));
//       message.error(error.message);
//     }
//   }
//   useEffect(()=>{
//     getData();
//   },[])
//   return (
//     <div className='h-screen'>
//       <div className="grid grid-cols-2 gap-5">
//         {/* images */}
//         <div className="flex flex-col gap-5">
//             <img
//               src={product?.images[selectedImageIndex]}
//               className="w-full h-96 object-cover rounded-md"
//               alt=""
//             />

//           <div className="flex gap-5">
//             {product?.images.map((image, index) => {
//               return (
//                 <img
//                   key={index}
//                   className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
//                     selectedImageIndex === index ? "border-2 border-green-700 border-dashed p-2" : ""
//                   }`}
//                   onClick={() => setSelectedImageIndex(index)}
//                   src={image}
//                   alt=""
//                 />
//               );
//             })}
//           </div>
//         </div>

//         {/* details */}

//         <div className="flex flex-col gap-3">  
//             <div>
//               <h1 className="text-2xl font-semibold text-orange-900">
//                 {product?.name}
//               </h1>
//               <span>{product?.description}</span>
//             </div>

//             <Divider/>

//             <div className="flex flex-col">
//               <h1 className="text-2xl font-semibold text-orange-900">
//                 Product Details
//               </h1>
//               <div className="flex justify-between mt-2">
//                   <span>Price</span>
//                   <span>$ {product?.price}</span>
//               </div>
//               <div className="flex justify-between mt-2">
//                   <span>Category</span>
//                   <span>{product?.category}</span>
//               </div>
//               <div className="flex justify-between mt-2">
//                   <span>Bill Available</span>
//                   <span>{product?.billAvailable ? "Yes" : "No"}</span>
//               </div>
//               <div className="flex justify-between mt-2">
//                   <span>Box Available</span>
//                   <span>{product?.boxAvailable ? "Yes" : "No"}</span>
//               </div>
//               <div className="flex justify-between mt-2">
//                   <span>Accessories Available</span>
//                   <span>{product?.accessoriesAvailable ? "Yes" : "No"}</span>
//               </div>
//               <div className="flex justify-between mt-2">
//                   <span>Warranty Available</span>
//                   <span>{product?.warrantyAvailable ? "Yes" : "No"}</span>
//               </div>
//             </div>

//             <Divider/>

//             <div className="flex flex-col">
//               <h1 className="text-2xl font-semibold text-orange-900">
//                 Seller Details
//               </h1>
//               <div className="flex justify-between mt-2">
//                   <span>Name</span>
//                   <span className='uppercase'>{product?.seller.name}</span>
//               </div>
//               <div className="flex justify-between mt-2">
//                   <span>Email</span>
//                   <span>{product?.seller.email}</span>
//               </div>
//             </div>
//           </div>
//       </div>
//     </div>
//   )
// }

// export default ProductInfo

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GetSingleProduct } from '../apicalls/products';
import { message } from 'antd';
import { SetLoader } from '../redux/loadersSlice';
import { useParams } from 'react-router-dom';
import { ShoppingBag, Package, Receipt, Shield, Wrench } from 'lucide-react';

function ProductInfo() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const singleProduct = await GetSingleProduct(id);
      dispatch(SetLoader(false));
      setProduct(singleProduct.data);
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-[calc(100vh-96px)] bg-gray-900">
      <div className="">
        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Images Section */}
            <div className="space-y-6">
              <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden bg-gray-700">
                <img
                  src={product?.images[selectedImageIndex]}
                  className="w-full h-[500px] object-cover rounded-xl transition-all duration-300 hover:scale-105"
                  alt={product?.name}
                />
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                {product?.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative rounded-lg overflow-hidden ${
                      selectedImageIndex === index 
                        ? 'ring-2 ring-blue-400 ring-offset-2 ring-offset-gray-800' 
                        : 'hover:opacity-75'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="h-24 w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-4">
                  {product?.name}
                </h1>
                <p className="text-gray-300 leading-relaxed">
                  {product?.description}
                </p>
              </div>

              <div className="border-t border-b border-gray-700 py-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-blue-400" />
                  Product Details
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Price</span>
                    <span className="text-2xl font-bold text-blue-400">
                      ${product?.price}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Category</span>
                    <span className="bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                      {product?.category}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className={`flex items-center gap-2 p-3 rounded-lg ${
                      product?.billAvailable ? 'bg-green-900/30 text-green-300' : 'bg-gray-800 text-gray-400'
                    }`}>
                      <Receipt className="w-5 h-5" />
                      <span>Bill Available</span>
                      <span className="ml-auto">{product?.billAvailable ? "Yes" : "No"}</span>
                    </div>
                    
                    <div className={`flex items-center gap-2 p-3 rounded-lg ${
                      product?.boxAvailable ? 'bg-green-900/30 text-green-300' : 'bg-gray-800 text-gray-400'
                    }`}>
                      <Package className="w-5 h-5" />
                      <span>Box Available</span>
                      <span className="ml-auto">{product?.boxAvailable ? "Yes" : "No"}</span>
                    </div>
                    
                    <div className={`flex items-center gap-2 p-3 rounded-lg ${
                      product?.accessoriesAvailable ? 'bg-green-900/30 text-green-300' : 'bg-gray-800 text-gray-400'
                    }`}>
                      <Wrench className="w-5 h-5" />
                      <span>Accessories Available</span>
                      <span className="ml-auto">{product?.accessoriesAvailable ? "Yes" : "No"}</span>
                    </div>
                    
                    <div className={`flex items-center gap-2 p-3 rounded-lg ${
                      product?.warrantyAvailable ? 'bg-green-900/30 text-green-300' : 'bg-gray-800 text-gray-400'
                    }`}>
                      <Shield className="w-5 h-5" />
                      <span>Warranty Available</span>
                      <span className="ml-auto">{product?.warrantyAvailable ? "Yes" : "No"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Seller Information
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Name</span>
                    <span className="font-medium text-white uppercase">
                      {product?.seller.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Email</span>
                    <span className="font-medium text-white">
                      {product?.seller.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;