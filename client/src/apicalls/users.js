
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
        return response.data //it will give the actual response which i have set on the backend
    } catch (error) {
        throw error
        
    }
}

//get current user 
export const GetCurrentUser=async()=>{
    try {
        const response=await axiosInstance.get("/users/get-current-user")
        return response.data
    } catch (error) {
        throw error
    }
}





//the response of the axios is having the json object like 

//{
    // status:200,
    // data:{ 
    //     success:false,
    //     message:"some message here",
    //     data:"actual data here which i have to passed from backend"
    // }

//}