import { Button, message, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import ProductForm from './ProductForm';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../../../redux/loadersSlice';
import { GetProducts, GetUserProduct } from '../../../apicalls/products';
import Bid from './Bid.jsx';
import moment from "moment"

function Products() {
    const { user } = useSelector((state) => state.users);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [deleteProduct, setDeleteProduct] = useState(null);
    const [showProductForm, setShowProductForm] = useState(false);
    const [products, setProducts] = useState(null)
    const dispatch = useDispatch()
    const [showBids,setShowBids]=useState(false);
    const getData = async () => {
        try {
            dispatch(SetLoader(true))
            const response = await GetUserProduct(user._id);
            dispatch(SetLoader(false))
            if (response.success) {
                console.log("the response i got from get-product api call", response)
                setProducts(response.data)
            }
        } catch (error) {
            console.log("some error occured in getproduct api call", error)
            message.error(error.message)
        }
    }
    const columns = [
        {
            title: "Name",
            dataIndex: "name"
        },
        {
            title: "Description",
            dataIndex: "description"
        },
        {
            title: "Price",
            dataIndex: "price"
        },
        {
            title: "Category",
            dataIndex: "category"
        },
        {
            title: "Age",
            dataIndex: "age"
        },
        {
            title:"Status",
            dataIndex:"status"
        },
        {
            title:"Added On",
            dataIndex:"createdAt",
            render: (text,record) => moment(record.createdAt).format("DD-MM-YYYY hh:mm A")
        },
        {
            title: "Action",
            dataIndex: "action",
            //width: "0%", // or adjust depending on your total columns
            render: (text, record) => (
              <div className="flex gap-4 text-base text-gray-700">
                <i 
                className="ri-delete-bin-line cursor-pointer hover:text-red-600"
                onClick={()=>{
                    setDeleteProduct(record);
                    setShowProductForm(true);
                    }}
                ></i>
                <i 
                className="ri-pencil-line cursor-pointer hover:text-blue-600"
                onClick={()=>{
                    setSelectedProduct(record);
                    setShowProductForm(true);
                    }}
                ></i>

                <span
                    className="underline cursor-pointer"
                    onClick={()=>{
                        setSelectedProduct(record);
                        setShowBids(true);
                    }}
                >
                    show offers
                </span>
              </div>
            ),
          }
    ]
    useEffect(() => {
        getData()
    }, [])
    
    return (
        <div className='text-black'>
            {/* on click the button will open a modal form where i can add my products */}
            <Button type='default' onClick={() => { setShowProductForm(true) }}>
                Add Product
            </Button>
            <Table
                columns={columns}
                dataSource={products?.map((item) => ({
                    ...item,
                    key: item._id,
                }))}
                pagination={{ pageSize: 5 }}
            />
            {
                showProductForm &&
                <ProductForm showProductForm={showProductForm} 
                             setShowProductForm={setShowProductForm} 
                             selectedProduct={selectedProduct} 
                             setSelectedProduct={setSelectedProduct} 
                             deleteProduct={deleteProduct}
                             setDeleteProduct={setDeleteProduct}
                             getData={getData}
                />
            }

            {
                showBids &&
                <Bid
                    showBidsModal={showBids}
                    setShowBidsModal={setShowBids}
                    selectedProduct={selectedProduct}
                />
            }
        </div>
    )
}

export default Products
