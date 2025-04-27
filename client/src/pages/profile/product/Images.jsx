import React, { useState } from 'react'
import { Button, Upload, message } from 'antd'
import { useDispatch } from 'react-redux';
import { UploadProductImage } from '../../../apicalls/products';
import { SetLoader } from '../../../redux/loadersSlice';

function Images({selectedProduct, getData, setShowProductForm, addedProduct, setAddedProduct, setImages, setSelectedProduct}) {
    //const [file,setFile]=useState(null);
    const [fileList, setFileList] = useState([]);

    const dispatch = useDispatch();

    const upload=async()=>{
        try{
            dispatch(SetLoader(true));
            const formData = new FormData();
            //console.log("file",file);
            // append all selected files
            fileList.forEach((fileObj) => {
                formData.append("files", fileObj.originFileObj);
            });
            if(addedProduct)
            {
                console.log("product id is:",addedProduct._id)
                formData.append("productId",addedProduct._id);
            }
            else
            {
                formData.append("productId",selectedProduct._id);
            }
            const response = await UploadProductImage(formData);
            dispatch(SetLoader(false));
            if(response.success)
            {
                message.success(response.message);
                if (response.updatedProduct) {
                    setImages(response.updatedProduct.images); // ✅ correct way
                    setAddedProduct(response.updatedProduct);  // ✅ update locally too
                }
                getData();
                setFileList([]);
            }
            else
            {
                message.error(response.message);
            }
        }
        catch(error)
        {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }
  return (
    <div>
        <Upload
            listType='picture'
            multiple
            beforeUpload={() => false}
            fileList={fileList}
            onChange={(info) => {
                setFileList(info.fileList); // capture all files
            }}
            >
            <Button type='dashed'>Upload Images</Button>
        </Upload>

        <div className="flex justify-end gap-5 mt-5">
            <Button
                type='default'
                onClick={()=>{
                    setShowProductForm(false)
                    setAddedProduct(null);
                    setSelectedProduct(null);
                }}
            >
                Cancel
            </Button>
            <Button
                type='primary'
                disabled={fileList.length === 0}
                onClick={upload}
            >
                Upload
            </Button>
        </div>

    </div>
    
  )
}

export default Images