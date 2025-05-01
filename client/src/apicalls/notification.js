import axiosInstance from "./axiosInstance.js";

//add a notification

export const addNotification=async(data)=>{
    try {
        const response=await axiosInstance.post("/notification/notify",data);
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
        const response=await axiosInstance.delete(`/notification/delete-notification/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

//delete all notifications

export const deleteAllNotification=async()=>{
    try {
        const response=await axiosInstance.delete(`/notification/delete-all-notification`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}


//read all notifications by user id

export const readNotification=async(id)=>{
    try {
        const response=await axiosInstance.put(`/notification/read-all-notifications`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

