import axiosInstance from "./axiosInstance.js";

// place a bid

export const placeBid = async (payload) =>{
    try {
        const response = await axiosInstance.post("/bids/place-new-bid",payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

// get all bids

export const getAllBids = async (filters) =>{
    try {
        const response = await axiosInstance.post("/bids/get-all-bids",filters)
        return response.data;
    } catch (error) {
        return error.message;
    }
    
}