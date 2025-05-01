import axiosInstance from "./axiosInstance";

//signup api call
export const SignupUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/users/signup", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//login api call

export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/users/login", payload);
    console.log(response.data);
    return response.data; //it will give the actual response which i have set on the backend
  } catch (error) {
    throw error;
  }
};

//get current user
export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/users/get-current-user");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get all users
export const GetAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/users/get-user");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// update user status
export const UpdateUserStatus = async (id, status) => {
  try {
    const response = await axiosInstance.put(
      `/users/update-user-status/${id}`,
      { status }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//the response of the axios is having the json object like

//{
// status:200,
// data:{
//     success:false,
//     message:"some message here",
//     data:"actual data here which i have to passed from backend"
// }

//}
