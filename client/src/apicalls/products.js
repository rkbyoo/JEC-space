import axiosInstance  from "./axiosInstance";

// add a new product
export const AddProduct = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/products/add-product",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get all products
export const GetProducts = async () => {
  try {
    const response = await axiosInstance.get(
      "/products/get-all-product",
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// edit a product
export const EditProduct = async (id, payload) => {
  try {
    const response = await axiosInstance.put(
      `/products/edit-product/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};