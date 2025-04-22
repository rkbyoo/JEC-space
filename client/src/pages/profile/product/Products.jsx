import { Button, message, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import ProductForm from './ProductForm';
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../../redux/loadersSlice';
import { GetProducts } from '../../../apicalls/products';
import moment from "moment"

function Products() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [deleteProduct, setDeleteProduct] = useState(null);
    const [showProductForm, setShowProductForm] = useState(false);
    const [products, setProducts] = useState(null)
    const dispatch = useDispatch()
    const getData = async () => {
        try {
            dispatch(SetLoader(true))
            const response = await GetProducts()
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
              <div className="flex gap-4 text-lg text-gray-700">
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
        </div>
    )
}

export default Products
