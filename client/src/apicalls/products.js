import axiosInstance from "./axiosInstance";

// add a new product
export const AddProduct = async (payload) => {
  try {
    const response = await axiosInstance.post("/products/add-product", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get all products
export const GetAllProducts = async () => {
  try {
    const response = await axiosInstance.get("/products/get-every-product");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get approved products
export const GetProducts = async () => {
  try {
    const response = await axiosInstance.get("/products/get-all-product");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get User specific products
export const GetUserProduct = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/products/get-user-product/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get a product by id
export const GetSingleProduct = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/products/get-single-product/${id}`
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

//delete a product
export const DeleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/products/delete-product/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Update product status
export const UpdateProductStatus = async (id, status) => {
  try {
    const response = await axiosInstance.put(
      `/products/update-product-status/${id}`,
      { status }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//Upload Product Image
export const UploadProductImage = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/products/upload-image",
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//update Product Image
export const UpdateProductImage = async (id, payload) => {
  try {
    const response = await axiosInstance.put(
      `/products/update-image/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
