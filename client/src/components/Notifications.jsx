import React from 'react'
import {Divider, Modal} from 'antd'
import { getNotification } from "../apicalls/notification.js";
import { useEffect } from 'react';
function Notifications({
    notifications = [],
    reloadNotifications,
    showNotifications,
    setShowNotifications,
    refresh
}) {
  console.log("notification : ",showNotifications);
  useEffect(() => {
    if (showNotifications) {
      refresh();
    }
  }, [showNotifications]);
  
  
  
      // const getUserNotifications=async()=>{
      //     try {
      //       const response = await getNotification();
      //       if (response.success) {
      //         if (JSON.stringify(response.data) !== JSON.stringify(notifications)) {
      //           reloadNotifications(response.data);
      //         }
      //          // reloadNotifications(response.data);
      //       }
      //       //console.log("notifications: ", response);
  
      //   } catch (error) {
      //       console.error("Error fetching notifications :", error);
      //   }
      // }
  return (
    <div>
        <Modal
        title="Notifications"
        open={showNotifications}
        onCancel={()=>setShowNotifications(false)}
        footer={null}
        centerred
        width={1000}
        >    
          <div className="flex flex-col gap-2">
              {notifications.map((notification,index)=>(
                <div key={index} className="flex flex-col gap-2 items-center border border-solid p-2">
                    <h1>{notification.title}</h1>

                    <Divider/>

                    <span>{notification.message}</span>
                </div>
              ))}
          </div>
        </Modal>
    </div>
    
    
  )
}

export default Notifications