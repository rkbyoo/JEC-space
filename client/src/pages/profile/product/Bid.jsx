import React, { useEffect, useState } from 'react'
import { Modal, Table, message } from 'antd'
import { getAllBids } from '../../../apicalls/bid';
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../../redux/loadersSlice';
import moment from 'moment'; // Ensure moment is imported

function Bid({ showBidsModal, setShowBidsModal, selectedProduct }) {
  const dispatch = useDispatch();
  const [bidsData, setBidsData] = useState([]);

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await getAllBids({ product: selectedProduct._id });
      dispatch(SetLoader(false));
      if (response.success) {
        setBidsData(response.data);
      } else {
        setBidsData([]);  // In case no bids are found
      }
      console.log("response is:", response.data);
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => {
        return (
          <div>
            <p>{record.buyer?.name || 'N/A'}</p> {/* Use buyer.phone */}
          </div>
        );
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
      render: (text, record) => (
        <div>
          <p>Phone: {record.mobile || 'N/A'}</p>
          <p>Email: {record.buyer?.email || 'N/A'}</p>
          {record.whatsapp && (
            <p>
              WhatsApp: <a href={record.whatsapp} target="_blank" rel="noopener noreferrer">{record.whatsapp}</a>
            </p>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (selectedProduct) {
      getData();
    }
  }, [selectedProduct]);

  return (
    <Modal
      title="Counter Offer"
      open={showBidsModal}
      onCancel={() => setShowBidsModal(!showBidsModal)}
      centered
      width={1200}
      footer={null}
    >
      <div className="flex flex-col">
        <h1 className="mt-5 text-lg text-gray-500">
          Product Name: {selectedProduct?.name}
        </h1>

        <Table
          columns={columns}
          dataSource={bidsData?.map((item) => ({
            ...item,
            key: item._id,  // Ensure key is assigned properly
          }))}
        />
      </div>
    </Modal>
  );
}

export default Bid;
