import axiosInstance from "../apicalls/axiosInstance"

//get response

export const SendResponse=async(payload)=>{
    try {
        const response=await axiosInstance.post("users/save-response",payload)
        return response.data
    } catch (error) {
        return error.response.data.message
    }

}

//send response
export const GetResponse=async()=>{
try {
    const response=await axiosInstance.get("users/get-all-responses")
    console.log("get request sent")
    return response.data
} catch (error) {
    return error.response.data.message
}
}