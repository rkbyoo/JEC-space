// import React from 'react'
// import {Divider, Modal} from 'antd'
// import { getNotification } from "../apicalls/notification.js";
// import { useEffect } from 'react';
// function Notifications({
//     notifications = [],
//     reloadNotifications,
//     showNotifications,
//     setShowNotifications,
//     refresh
// }) {
//   console.log("notification : ",showNotifications);
//   useEffect(() => {
//     if (showNotifications) {
//       refresh();
//     }
//   }, [showNotifications]);
  
//   return (
//     <div>
//         <Modal
//         title="Notifications"
//         open={showNotifications}
//         onCancel={()=>setShowNotifications(false)}
//         footer={null}
//         centerred
//         width={1000}
//         >    
//           <div className="flex flex-col gap-2">
//               {notifications.map((notification,index)=>(
//                 <div key={index} className="flex flex-col border border-solid p-2 border-gray-300 rounded">
//                     <h1 className="text-gray-700">{notification.title}</h1>

//                     <span className="text-gray-500">{notification.message}</span>
//                 </div>
//               ))}
//           </div>
//         </Modal>
//     </div>
    
    
//   )
// }

// export default Notifications

import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { Bell } from 'lucide-react';

function Notifications({
  notifications = [],
  reloadNotifications,
  showNotifications,
  setShowNotifications,
  refresh
}) {
  useEffect(() => {
    if (showNotifications) {
      refresh();
    }
  }, [showNotifications]);
  console.log("Notification read :",notifications);
  return (
    <Modal
      closeIcon={<span className="text-gray-400 hover:text-gray-400 text-xl">×</span>}
      title={
        <div className="flex items-center gap-2 text-white">
          <Bell className="w-5 h-5 text-blue-400" />
          <span className="text-lg font-semibold">Notifications</span>
        </div>
      }
      open={showNotifications}
      onCancel={() => {refresh();setShowNotifications(false)}}
      footer={null}
      centered
      width={1000}
      className="notifications-modal"
      styles={{
        content: {
          background: '#1a1a1a',
          borderRadius: '1rem',
          border: '1px solid #333',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        },
        mask: {
          backdropFilter: 'blur(8px)',
          background: 'rgba(0, 0, 0, 0.6)',
        },
        header: {
          background: '#1a1a1a',
          borderBottom: '1px solid #333',
          padding: '1.5rem',
          borderRadius: '1rem 1rem 0 0',
        },
        body: {
          padding: '1.5rem',
        },
        close: {
          color: '#6B7280',
        }
      }}
    >    
      <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto custom-scrollbar">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400">
            <Bell className="w-12 h-12 mb-3 opacity-20" />
            <p className="text-lg">No notifications yet</p>
          </div>
        ) : (
          notifications.map((notification, index) => (
            <div 
              key={index} 
              className="flex flex-col p-4 mt-1 rounded-lg bg-gray-800/50 border border-gray-700/50 
                transition-all duration-300 hover:bg-gray-800 hover:border-gray-600
                transform hover:-translate-y-1"
            >
              <div className="flex justify-between">
              <h3 className="text-lg font-medium text-white mb-2">
                {notification.title}
              </h3>
              <span className="text-orange-800 mr-1">{notification?.read ? "Seen" : "New"}</span>
              </div>
              
              <p className="text-gray-400 text-sm leading-relaxed">
                {notification.message}
              </p>
            </div>
          ))
        )}
      </div>
    </Modal>
  );
}

export default Notifications;