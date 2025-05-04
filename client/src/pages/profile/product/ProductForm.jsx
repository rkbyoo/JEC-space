import { Form, Modal, Tabs, Input, Select, Row, Col, message, Checkbox } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { AddProduct, EditProduct, DeleteProduct, UpdateProductImage } from '../../../apicalls/products';
import { SetLoader } from '../../../redux/loadersSlice'
import { Steps } from 'antd';
import Images from './Images';
import { DeleteOutlined } from '@ant-design/icons';

const rules = [
  {
    required: true,
    message: 'Required',
  },
];

const additionalThings = [
  {
    label: 'Bill Available',
    name: 'billAvailable',
  },
  {
    label: 'Warranty Available',
    name: 'warrantyAvailable',
  },
  {
    label: 'Accessories Available',
    name: 'accessoriesAvailable',
  },
  {
    label: 'Box Available',
    name: 'boxAvailable',
  },
  {
    label: 'Make counter-offers visible to everyone',
    name: 'showOffersOnProduct'
  }
];

function ProductForm({ showProductForm, setShowProductForm, selectedProduct, setSelectedProduct, deleteProduct, setDeleteProduct, getData }) {
  const dispatch = useDispatch()
  const formRef = React.useRef(null);
  const { user } = useSelector(state => state.users)
  const [currentStep, setCurrentStep] = useState(0);
  const [addedProduct,setAddedProduct] = useState(null);
  const [images,setImages] = useState(addedProduct?.images || selectedProduct?.images);
  //const [showBidsOnProductPage, setShowBidsOnProductPage] = useState(true);
  useEffect(() => {
    // Only run if not in delete mode and formRef is available
    if (!deleteProduct && formRef.current) {
      if (selectedProduct) {
        formRef.current.setFieldsValue(selectedProduct);
      } else {
        formRef.current.setFieldsValue({
          showOffersOnProduct: true,
        });
      }
    }
  }, [selectedProduct, deleteProduct]);
  const updateImage = async (id) => {
    const newImages = images.filter((image,index)=> id!==index)
      try {
        dispatch(SetLoader(true));
        console.log(selectedProduct._id)
        const response = await UpdateProductImage(selectedProduct._id,{images:newImages})
        dispatch(SetLoader(false));
        console.log(response)
        if(response.success)
        {
          setImages(newImages);
          getData();
          console.log("hello");
        }
        
      } catch (error) {
        dispatch(SetLoader(false));
        message.error(error.message);
      }
  }
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true))
      let response = null;
      if (selectedProduct) {
        response = await EditProduct(selectedProduct._id, values)
      }
      else if (deleteProduct) {
        response = await DeleteProduct(deleteProduct._id);
      }
      else {
        values.seller = user._id
        values.status = "pending"
        response = await AddProduct(values)
        setAddedProduct(response.product);
      }
      dispatch(SetLoader(false))
      console.log(response)
      if (response.success) {
        message.success(response.message)
        getData();
        if(currentStep === 1 || deleteProduct)
        {
          setSelectedProduct(null)
          setShowProductForm(false)
        }
        setDeleteProduct(null)
      }
      setCurrentStep(1);
    } catch (error) {
      dispatch(SetLoader(false))
      console.log("some error in adding product", error)
      message.error(error.message.data)
      setShowProductForm(false)
      setSelectedProduct(null)
      setDeleteProduct(null)
    }
  }
  //check for deletion of products
  if (deleteProduct) {
    return <div className="text-black font-sans">
      <Modal
        title={<span className="text-lg font-semibold">Confirm Delete?</span>}
        open={deleteProduct}
        onCancel={() => {
          setShowProductForm(false);
          setDeleteProduct(null);
        }}
        centered
        okText="Confirm"
        onOk={onFinish}
      >

      </Modal>
    </div>
  }
  //check for add a product OR edit a product
  return (
    <div className="text-black font-sans">
    <Modal
      title={
        <span className="text-lg font-semibold">
          {selectedProduct ? "Edit Product Item" : "Upload Your Product Item"}
        </span>
      }
      open={showProductForm}
      onCancel={() => {
        setShowProductForm(false);
        setSelectedProduct(null);
        setCurrentStep(0);
      }}
      centered
      okText="Save"
      onOk={() => {
        if (currentStep === 0) {
          formRef.current.submit(); // will trigger onFinish
        } 
      }}
      width={800}
      {...(currentStep === 1 && {footer:false})}  // okText and Cancel buttons are not available for images in this component(instead they are made available on <Images/> component)
    >
      {!selectedProduct && <div className='w-[80%] mx-auto mb-6 mt-6'>
        <Steps current={currentStep} items={[
          {
            title: 'General Info',
          },
          {
            title: 'Upload Images',
          }
        ]} />
      </div>}

      {selectedProduct && <div className='w-[80%] mx-auto mb-6 mt-6'>
        <Steps current={currentStep} items={[
          {
            title: 'General Info',
          },
          {
            title: 'Edit Images',
          }
        ]} />
      </div>}
      

      {currentStep === 0 && (
        <Form layout="vertical" ref={formRef} onFinish={onFinish}>
          {/* General Info Form goes here */}
          <Form.Item label="Name" name="name" rules={rules}>
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item label="Description" name="description" rules={rules}>
            <Input.TextArea rows={4} placeholder="Enter description" />
          </Form.Item>

          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item label="Price" name="price" rules={rules}>
                <Input type="number" placeholder="₹ Price" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Category" name="category" rules={rules}>
                <Select placeholder="Select category">
                  <Select.Option value="electronics">Electronics</Select.Option>
                  <Select.Option value="fashion">Fashion</Select.Option>
                  <Select.Option value="home">Home</Select.Option>
                  <Select.Option value="sports">Sports</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Age" name="age" rules={rules}>
                <Input type="number" placeholder="In months" />
              </Form.Item>
            </Col>
          </Row>

          <div className="flex gap-10 flex-wrap">
            {additionalThings.map((item) => (
              <Form.Item
                key={item.name}
                name={item.name}
                valuePropName="checked"
                className="m-0"
              >
                <Checkbox>{item.label}</Checkbox>
              </Form.Item>
            ))}
            {/* <Form.Item
              label="show Bids on Product Page"
              name="showBidsOnProductPage"
              valuePropName="checked"
              className="m-0"
            >
              <Input
                type="checkbox"

                onChange={(e)=>{
                  formRef.current.setFieldsValue({
                    showBidsOnProductPage:e.target.checked,
                  })
                }}

                checked={formRef.current?.getFieldValue('showBidsOnProductPage')}
              />
          </Form.Item> */}
          {/* <Form.Item
                name='showOffersOnProduct'
                valuePropName="checked"
                className="m-0"
              >
                <Checkbox></Checkbox>
              </Form.Item> */}
          </div>

          
        </Form>
      )}

      {currentStep === 1 && !selectedProduct && (
        <div>
        <div className="flex gap-2 flex-wrap mb-6">
          {images?.map((image, index) => (
            <img key={index} src={image} alt="img" className="w-[100px] h-[100px]" />
          ))}
        </div>
      
        <Images
          selectedProduct={selectedProduct}
          getData={getData}
          setShowProductForm={setShowProductForm}
          addedProduct={addedProduct}
          setAddedProduct={setAddedProduct}
          setImages={setImages}
          setSelectedProduct={setSelectedProduct}
        />
      </div>
      
        
      )}

      {currentStep === 1 && selectedProduct && (
        <div>
        <div className="flex gap-2 flex-wrap mb-8">
          {images?.map((image, index) => (
            <div key={index} className='w-[100px] h-[100px]'>
                <img src={image} alt="img" className="w-[100%] h-[100%]"/>
                <div className="flex items-center gap-2 cursor-pointer hover:text-red-600"
                      onClick={() => updateImage(index)}
                >
                  <DeleteOutlined />
                  <span>Delete</span>
                </div>

                
            </div>  
          ))}
        </div>

      
        <Images
          selectedProduct={selectedProduct}
          getData={getData}
          setShowProductForm={setShowProductForm}
          addedProduct={addedProduct}
          setAddedProduct={setAddedProduct}
          setImages={setImages}
          setSelectedProduct={setSelectedProduct}
        />
      </div>
      
        
      )}
    </Modal>

    </div>
  );
}

export default ProductForm;
