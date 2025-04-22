import axiosInstance from "./axiosInstance.js";

//add a notification

export const addNotification=async(data)=>{
    try {
        const response=await axiosInstance.post("/api/notifications/notify",data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

//get all notifications from user

export const getNotification=async()=>{
    try {
        const response=await axiosInstance.get("/notification/get-all-notification");
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

//delete notification

export const deleteNotification=async(id)=>{
    try {
        const response=await axiosInstance.delete(`/api/notifications/delete-notifications/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

//read all notifications by user

export const readNotification=async()=>{
    try {
        const response=await axiosInstance.put("/api/notifications/read-all-notifications");
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}