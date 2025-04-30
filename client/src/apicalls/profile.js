//api calls to change the name and profile picture 

import axiosInstance from "./axiosInstance";

export const UpdateProfilePicture = async (payload) => {
    try {
      const response = await axiosInstance.put(
        "/profile/updateProfilePicture",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Some error occurred in API call of updateProfilePicture:", error);
      return error.response.data.message
    }
  };
  
export const UpdateName=async(payload)=>{
    try {
        const response=await axiosInstance.put("/profile/updateName",payload)
        return response.data
        
    } catch (error) {
        console.error("some error occured in api call of updateName",error)
        return error.response.data.message
    }

}

export const ChangePassword=async(payload)=>{
    try {
        const response=await axiosInstance.put("/profile/changePassword",payload)
        return response.data
    } catch (error) {
        console.error("some error in changing password",error)
        return error.response.data.message
    }
}


export const DeleteAccount=async(payload)=>{
    try {
        const response=await axiosInstance.put("/profile/deleteAccount",payload)
        return response.data
    } catch (error) {
        console.error("some error in changing password",error)
        return error.response.data.message
    }
}




