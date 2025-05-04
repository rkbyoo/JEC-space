import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetSingleProduct } from '../apicalls/products';
import { Divider, message, Button } from 'antd';
import { SetLoader } from '../redux/loadersSlice';
import { useParams } from 'react-router-dom';
import { ShoppingBag, Package, Receipt, Shield, Wrench } from 'lucide-react';
import BidModal from './BidModal';
import { getAllBids } from '../apicalls/bid';
import moment from 'moment';
import { Tooltip } from 'antd';


function ProductInfo() {
  const { user } = useSelector((state) => state.users);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAddNewBid, setShowAddNewBid] = useState(false);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const singleProduct = await GetSingleProduct(id);
      dispatch(SetLoader(false));
      if (singleProduct.success) {
        const bidsResponse = await getAllBids({ product: id })
        setProduct({
          ...singleProduct.data,
          bids: bidsResponse.data
        })
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-[calc(100vh-96px)] bg-gray-900 rounded-2xl">
      <div className="">
        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
          {showAddNewBid &&
            <BidModal
              product={product}
              reloadData={getData}
              showBidModal={showAddNewBid}
              setShowBidModal={setShowAddNewBid}
            />
          }
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
                    className={`relative rounded-lg overflow-hidden ${selectedImageIndex === index
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
                    <div className={`flex items-center gap-2 p-3 rounded-lg ${product?.billAvailable ? 'bg-green-900/30 text-green-300' : 'bg-gray-800 text-gray-400'
                      }`}>
                      <Receipt className="w-5 h-5" />
                      <span>Bill Available</span>
                      <span className="ml-auto">{product?.billAvailable ? "Yes" : "No"}</span>
                    </div>

                    <div className={`flex items-center gap-2 p-3 rounded-lg ${product?.boxAvailable ? 'bg-green-900/30 text-green-300' : 'bg-gray-800 text-gray-400'
                      }`}>
                      <Package className="w-5 h-5" />
                      <span>Box Available</span>
                      <span className="ml-auto">{product?.boxAvailable ? "Yes" : "No"}</span>
                    </div>

                    <div className={`flex items-center gap-2 p-3 rounded-lg ${product?.accessoriesAvailable ? 'bg-green-900/30 text-green-300' : 'bg-gray-800 text-gray-400'
                      }`}>
                      <Wrench className="w-5 h-5" />
                      <span>Accessories Available</span>
                      <span className="ml-auto">{product?.accessoriesAvailable ? "Yes" : "No"}</span>
                    </div>

                    <div className={`flex items-center gap-2 p-3 rounded-lg ${product?.warrantyAvailable ? 'bg-green-900/30 text-green-300' : 'bg-gray-800 text-gray-400'
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
                    <span className="font-medium text-gray-400 uppercase">
                      {product?.seller.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Email</span>
                    <span className="font-medium text-gray-400">
                      {product?.seller.email}
                    </span>
                  </div>
                </div>
              </div>

              <Divider />

              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <h1 className="text-lg font-semibold text-white">Try making a counter offer?</h1>
                  <Tooltip title={user._id === product?.seller._id ? "Sellers cannot make offers on their own product" : "Click to make a counter offer"}>
                    <button
                      onClick={() => setShowAddNewBid(!showAddNewBid)}
                      disabled={user._id === product?.seller._id}
                      className={`
                      relative px-6 py-3 rounded-lg font-medium
                      transition-all duration-300 ease-in-out
                      ${user._id === product?.seller._id
                          ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-blue-400 text-white hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105 active:scale-95'
                        }
                      before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-blue-500/0 before:to-blue-300/30 
                      before:opacity-0 before:transition-opacity hover:before:opacity-100 
                      overflow-hidden
                    `}
                    >
                      <span className="relative z-10">Make a Counter Offer</span>
                      {!user._id || user._id !== product?.seller._id ? (
                        <span className="absolute inset-0 overflow-hidden rounded-lg">
                          <span className="absolute -inset-[10px] opacity-0 hover:opacity-20 bg-white blur-md transition-opacity duration-1000"></span>
                        </span>
                      ) : null}
                    </button>
                  </Tooltip>
                </div>
              </div>


              {product?.showOffersOnProduct && product?.bids?.map((bid, index) => {
                if (!bid?.buyer) return null; // Skip bids with no buyer
                return (
                  <div key={index} className="border border-gray-700 border-solid p-3 rounded bg-gray-800">
                    <div className="flex justify-between text-gray-700">
                      <span className="text-gray-300">Name</span>
                      <span className="text-gray-400">{bid.buyer.name}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span className="text-gray-300">Counter-offer Amount</span>
                      <span className="text-gray-400">$ {bid?.bidAmount}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span className="text-gray-300">Bid Place On</span>
                      <span className="text-gray-400">
                        {moment(bid?.createdAt).format("DD-MM-YYYY hh:mm A")}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;