import { Form, Modal, Tabs, Input, Select, Row, Col, message, Checkbox } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddProduct, EditProduct, DeleteProduct } from '../../../apicalls/products';
import { SetLoader } from '../../../redux/loadersSlice'

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
];

function ProductForm({ showProductForm, setShowProductForm, selectedProduct, setSelectedProduct, deleteProduct, setDeleteProduct, getData }) {
  const dispatch = useDispatch()
  const formRef = React.useRef(null);
  const { user } = useSelector(state => state.users)
  useEffect(() => {
    if (selectedProduct) {
      formRef.current.setFieldsValue(selectedProduct);
    }
  }, [selectedProduct]);
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
      }
      dispatch(SetLoader(false))
      console.log(response)
      if (response.success) {
        message.success(response.message)
        getData();
        setShowProductForm(false)
        setSelectedProduct(null)
        setDeleteProduct(null)
      }
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
        title={selectedProduct ? <span className="text-lg font-semibold">Edit Product Item</span> : <span className="text-lg font-semibold">Upload Your Product Item</span>}
        open={showProductForm}
        onCancel={() => {
          setShowProductForm(false);
          setSelectedProduct(null);
        }}
        centered
        okText="Save"
        onOk={() => {
          formRef.current.submit();
        }}
        width={800}
      >
        <Tabs defaultActiveKey="1" className="mt-2">
          {/* General Tab */}
          <Tabs.TabPane tab="General" key="1">
            <Form layout="vertical" ref={formRef} onFinish={onFinish}>
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

              {/* Checkbox Part */}
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
              </div>
            </Form>
          </Tabs.TabPane>

          {/* Images Tab */}
          <Tabs.TabPane tab="Images" key="2">
            <div className="text-gray-500 text-center p-6 border border-dashed rounded-md">
              Image upload section coming soon...
            </div>
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    </div>
  );
}

export default ProductForm;
