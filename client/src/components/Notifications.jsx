import React, { useEffect } from 'react';
import { Button, Modal, message } from 'antd';
import { Bell } from 'lucide-react';
import { deleteNotification, deleteAllNotification } from '../apicalls/notification';
import { useDispatch } from 'react-redux';
import { SetLoader } from '../redux/loadersSlice';
import { readNotification } from '../apicalls/notification';

function Notifications({
  notifications = [],
  reloadNotifications,
  showNotifications,
  setShowNotifications,
  refresh
}) {
  const dispatch = useDispatch();
  const deletenotification = async(id) => {
    try {
      dispatch(SetLoader(true));
      const response = await deleteNotification(id);
      if(response.success)
      {
        message.success(response.message);
        await refresh();
      }
      dispatch(SetLoader(false));
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  }
  const deleteAll = async() => {
    try {
      dispatch(SetLoader(true));
      const response = await deleteAllNotification();
      if(response.success)
      {
        message.success(response.message);
        await refresh();
      }
      dispatch(SetLoader(false));
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  }
  const readnotifications=async()=>{
    const hasUnread = notifications.some((n) => !n.read);
    if (hasUnread) {
      try {
        await readNotification();
      } catch (error) {
        message.error(error.message);
      }
    }
  }
  useEffect(() => {
    if (showNotifications) {
      const fetchData = async () => {
        await refresh();
      };
      fetchData();
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
          <Button className='bg-red-400 ml-2 font-semibold'
            onClick={async()=>await deleteAll()}
          >Clear All</Button>
        </div>
      }
      open={showNotifications}
      onCancel={async() => {await readnotifications();await refresh();setShowNotifications(false)}}
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
              
              <div className='flex justify-between'>
              <p className="text-gray-400 text-sm leading-relaxed">
                {notification.message}
              </p>

              <i 
                className="ri-delete-bin-line cursor-pointer mr-1 text-orange-800 hover:text-red-600"
                onClick={async()=>{
                      await deletenotification(notification._id);
                    }}
                ></i>
              </div>
              
            </div>
          ))
        )}
      </div>
    </Modal>
  );
}

export default Notifications;