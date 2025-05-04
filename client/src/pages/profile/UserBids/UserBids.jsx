import React, { useEffect, useState } from 'react'
import { Table, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getAllBids } from '../../../apicalls/bid';
import { SetLoader } from '../../../redux/loadersSlice';

function UserBids() {
    const dispatch = useDispatch();
    const [bidsData, setBidsData] = useState([]);
    const { user } = useSelector((state) => state.users);

    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await getAllBids({ buyer: user?._id });
            dispatch(SetLoader(false));
            if (response.success) {
                setBidsData(response.data);
            } else {
                setBidsData([]);
            }
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
                if (!record.product) {
                    return (
                        <span className="text-red-500 font-semibold">
                            This product has been deleted by the seller
                        </span>
                    );
                }
                return record.product.name;
            },
        },
        {
            title: "Seller",
            dataIndex: "seller",
            render: (text, record) => {
                if (!record.seller) {
                    return (
                        <span className="text-red-500 font-semibold">
                            Seller account deleted
                        </span>
                    );
                }
                return <span>{record.seller.name}</span>;
            },
        },
        {
            title: "Bid Placed On",
            dataIndex: "createdAt",
            render: (text) => moment(text).format("DD-MM-YYYY hh:mm a"),
        },
        {
            title: "Offered Price",
            dataIndex: "offeredPrice",
            render: (text, record) => record.product?.price !== undefined ? record.product.price : <span className="text-red-500">-</span>,
        },
        {
            title: "Counter-Offer Amount",
            dataIndex: "bidAmount",
            render: (text) => text,
        },
        {
            title: "Message",
            dataIndex: "message",
            render: (text) => text,
        },
        {
            title: "Contact Details",
            dataIndex: "contactDetails",
            render: (text, record) => (
                <div>
                    <p>
                        Phone: <span>{record.mobile || 'N/A'}</span>
                    </p>
                    <p>
                        Email: <span>{record.buyer?.email || 'N/A'}</span>
                    </p>
                </div>
            ),
        },
    ];

    // Highlight the entire row in red if product is deleted
    const rowClassName = (record) =>
        !record.product || !record.seller ? "bg-red-100" : "";

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="flex flex-col">
            <Table
                columns={columns}
                dataSource={bidsData?.map((item) => ({
                    ...item,
                    key: item._id,
                }))}
                rowClassName={rowClassName}
            />
        </div>
    );
}

export default UserBids;
