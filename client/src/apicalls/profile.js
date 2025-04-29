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
      return error.message;
    }
  };
  
export const UpdateName=async(payload)=>{
    try {
        const response=await axiosInstance.put("/profile/updateName",payload)
        return response.data
        
    } catch (error) {
        console.error("some error occured in api call of updateName",error)
        return error.message
    }

}




