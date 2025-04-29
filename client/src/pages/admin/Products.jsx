import { Button, message, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../redux/loadersSlice';
import { GetAllProducts, UpdateProductStatus } from '../../apicalls/products';
import moment from "moment"

function Products() {
    const [products, setProducts] = useState(null)
    const dispatch = useDispatch()
    const getData = async () => {
        try {
            dispatch(SetLoader(true))
            const response = await GetAllProducts(null)
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

    const onStatusUpdate = async (id, status) => {
        try {
            console.log("Updating status for ID:", id, "to:", status);
            dispatch(SetLoader(true));
            const response = await UpdateProductStatus(id, status);
            dispatch(SetLoader(false));
            console.log("Response from UpdateProductStatus:", response);
            if (response.success) {
                message.success(response.message);
                getData();
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            console.error("Error in onStatusUpdate:", error);
            message.error(error.message);
        }
    };

    const columns = [
        {
            title: "Product",
            dataIndex: "name"
        },
        {
            title: "Seller",
            dataIndex: "name",
            render: (text, record) => {
                return record.seller.name
            }
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
            title: "Status",
            dataIndex: "status",
            render: (text, record) => {
                return record.status.toUpperCase();
            }
        },
        {
            title: "Added On",
            dataIndex: "createdAt",
            render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY hh:mm A")
        },
        {
            title: "Action",
            dataIndex: "action",
            //width: "0%", // or adjust depending on your total columns
            render: (text, record) => {
                const { status, _id } = record
                return <div className='flex gap-3'>
                    {status === "pending" && <span className='underline cursor-pointer' onClick={() => onStatusUpdate(_id, "approved")}>Approve</span>}
                    {status === "pending" && <span className='underline cursor-pointer' onClick={() => onStatusUpdate(_id, "rejected")}>Reject</span>}
                    {status === "approved" && <span className='underline cursor-pointer' onClick={() => onStatusUpdate(_id, "blocked")}>Block</span>}
                    {status === "blocked" && <span className='underline cursor-pointer' onClick={() => onStatusUpdate(_id, "approved")}>Unblock</span>}
                </div>
            }
        }
    ]
    useEffect(() => {
        getData()
    }, [])

    return (
        <div className='text-black'>

            <Table
                columns={columns}
                dataSource={products?.map((item) => ({
                    ...item,
                    key: item._id,
                }))}
                pagination={{ pageSize: 5 }}
            />
        </div>
    )
}

export default Products