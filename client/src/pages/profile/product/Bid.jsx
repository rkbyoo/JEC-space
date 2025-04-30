// import React, { useEffect,useState } from 'react'
// import { Modal,Divider, Table, message } from 'antd'
// import { getAllBids } from '../../../apicalls/bid';
// import { useDispatch } from 'react-redux';
// import { SetLoader } from '../../../redux/loadersSlice';
// function Bid({showBidsModal, setShowBidsModal, selectedProduct}) {
//     const dispatch = useDispatch()
//     const [bidsData,setBidsData] = useState([]);

//     const getData = async () => {
//         try {
//             dispatch(SetLoader(true));
//             const response = await getAllBids({
//                 product:selectedProduct._id
//             });
//             dispatch(SetLoader(false));
//             if(response.success)
//             {
//                 setBidsData(response.data);
//             }
//             console.log("response is:",response.data)
//         } catch (error) {
//             dispatch(SetLoader(false))
//             message.error(error.message);
//         }
//     }
//     const columns=[
//         {
//             title:"Name",
//             dataIndex:"name"
//         },
//         {
//             title:"Counter-Offer Amount",
//             dataIndex:"bidAmount"
//         },
//         {
//             title:"Counter-Offer date",
//             dataIndex:"createdAt",
//             render:(text,record)=>{
//                 return moment(text).format("DD-MM-YYYY hh:mm A");
//             }
//         },
//         {
//             title:"Message",
//             dataIndex:"message"
//         },
//         {
//             title:"Contact details",
//             dataIndex:"contactDetails",
//             render:(text,record)=>{
//                 return(
//                     <div>
//                         <p>Phone : {record.phone}</p>
//                         <p>Email : {record.buyer.email}</p>
//                     </div>
//                 )
//             }
//         }
//     ]

//     useEffect(()=>{
//         if(selectedProduct)
//         {
//             getData();
//         }
//     },[selectedProduct])
//   return (
//     <Modal
//         title="Counter offer"
//         open={showBidsModal}
//         onCancel={()=>setShowBidsModal(!showBidsModal)}
//         centered
//         width={1200}
//         footer={null}
//     >
//         <div className="flex flex-col">
//             {/* <h1 className="text-black">Counter Offer</h1> */}
//             <h1 className="mt-5 text-lg text-gray-500"> 
//                 Product Name : {selectedProduct?.name}
//             </h1>

//             <Table columns={columns} dataSource={bidsData?.map((item)=>({
//                 ...item,
//                 key: item._id
//             }))}/>
//         </div>
//     </Modal>
//   )
// }

// export default Bid

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
      title: "Counter-Offer Date",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(text).format("DD-MM-YYYY hh:mm A");
      },
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
