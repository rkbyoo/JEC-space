import React, { useEffect, useState } from 'react'
import { Modal, Table, message } from 'antd'

import { useDispatch } from 'react-redux';

import moment from 'moment'; // Ensure moment is imported
import useSelection from 'antd/es/table/hooks/useSelection';
import { getAllBids } from '../../../apicalls/bid';
import { SetLoader } from '../../../redux/loadersSlice';

function UserBids() {
    const dispatch = useDispatch();
    const [bidsData, setBidsData] = useState([]);
    const { user } = useSelection((state) => state.users);


    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await getAllBids({ buyer: user?._id });
            dispatch(SetLoader(false));
            if (response.success) {
                setBidsData(response.data);
            } else {
                setBidsData([]);  // In case no bids are found
            }
            console.log("response is:", response.data);
            console.log("Buyer ID Sent:", user?._id);
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };

    const columns = [
        {
            title: "Product",
            dataIndex: "product",
            render: (text, record) => {
                return record.product.name;
            },
        },
        {
            title: "Bid Placed On",
            dataIndex: "createdAt",
            render: (text, record) => {
                return moment(text).format("DD-MM-YYYY hh:mm a");
            },
        },
        {
            title: "Seller",
            dataIndex: "seller",
            render: (text, record) => {
                return (
                    <div>
                        <p>{record.seller?.name || 'N/A'}</p> {/* Use buyer.phone */}
                    </div>
                );
            }
        },
        {
            title: "Offered Price",
            dataIndex: "offeredPrice",
            render: (text, record) => {
                return record.product.price;
            }
        },
        {
            title: "Counter-Offer Amount",
            dataIndex: "bidAmount",
        },
        {
            title: "Message",
            dataIndex: "message",
        },
        {
            title: "Contact Details",
            dataIndex: "contactDetails",
            render: (text, record) => {
                return (
                    <div>
                        <p>Phone: {record.mobile || 'N/A'}</p> {/* Use buyer.phone */}
                        <p>Email: {record.buyer?.email}</p>
                    </div>
                );
            },
        },
    ];

    useEffect(() => {
        getData();
    }, []);

    return (

        <div className="flex flex-col">

            <Table
                columns={columns}
                dataSource={bidsData?.map((item) => ({
                    ...item,
                    key: item._id,  // Ensure key is assigned properly
                }))}
            />
        </div>
    );
}

export default UserBids;
