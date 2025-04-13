
import axiosInstance from "./axiosInstance";


//signup api call
export const SingupUser=async(payload)=>{
    try {
        const response=await axiosInstance.post("/users/signup",payload)
        return response.data
    } catch (error) {
        throw error
    }
}

//login api call

export const LoginUser=async(payload)=>{
    try {
        const response=await axiosInstance.post("/users/login",payload)
        return response.data
    } catch (error) {
        throw error
        
    }
}

//get current user 
export const GetCurrentUser=async()=>{
    try {
        const response=await axiosInstance.post("/users/get-current-user")
        return response.data
    } catch (error) {
        throw error
    }
}