import { Button, message, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../redux/loadersSlice';
import { GetProducts, UpdateProductStatus } from '../../apicalls/products';
import moment from "moment"
import { GetAllUsers, UpdateUserStatus } from '../../apicalls/users';

function Users() {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            console.log("Fetching users...");
            dispatch(SetLoader(true))
            const response = await GetAllUsers(null);
            dispatch(SetLoader(false));
            console.log("Response from GetAllUsers:", response);
            if (response.success) {
                setUsers(response.data);
            } else {
                message.error(response.message);
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
            const response = await UpdateUserStatus(id, status);
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
            title: "Name",
            dataIndex: "name"
        },
        {
            title: "Email",
            dataIndex: "email"
        },
        {
            title: "Role",
            dataIndex: "role",
            render: (text, record) => {
                return record.role.toUpperCase();
            }
        },
        {
            title: "Ceated At",
            dataIndex: "createdAt",
            render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY hh:mm A")
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (text, record) => {
                return record.status.toUpperCase();
            }
        },
        {
            title: "Action",
            dataIndex: "action",
            //width: "0%", // or adjust depending on your total columns
            render: (text, record) => {
                const { status, _id } = record
                return <div className='flex gap-3'>
                    {status === "active" && <span className='underline cursor-pointer' onClick={() => onStatusUpdate(_id, "blocked")}>Block</span>}
                    {status === "blocked" && <span className='underline cursor-pointer' onClick={() => onStatusUpdate(_id, "active")}>Unblock</span>}
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
                dataSource={users}
                pagination={{ pageSize: 5 }}
            />
        </div>
    )
}

export default Users