
import axiosInstance from "./axiosInstance";


//signup api call
export const SingupUser=async(payload)=>{
    try {
        const response=await axiosInstance.post("/users/signup",payload)
        return response
    } catch (error) {
        throw error
    }
}

//login api call

export const LoginUser=async(payload)=>{
    try {
        const response=await axiosInstance.post("/users/login",payload)
        return response
    } catch (error) {
        throw error
        
    }
}