import { Button, message, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import ProductForm from './ProductForm';
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../../redux/loadersSlice';
import { GetProducts } from '../../../apicalls/products';

function Products() {
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
            title: "Action",
            dataIndex: "action"
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
            <Table columns={columns} dataSource={products}></Table>
            {
                showProductForm &&
                <ProductForm showProductForm={showProductForm} setShowProductForm={setShowProductForm} />
            }
        </div>
    )
}

export default Products
