import { Form, Modal, Tabs, Input, Row, Col } from 'antd';
import React from 'react';

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

function ProductForm({ showProductForm, setShowProductForm }) {
  const formRef = React.useRef(null);
  const onFinish=(values)=>{
    console.log(values)
  }
  return (
    <div className="text-black font-sans">
      <Modal
        title={<span className="text-lg font-semibold">Upload Your Product Item</span>}
        open={showProductForm}
        onCancel={() => {
          setShowProductForm(false);
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
                <input type="text" placeholder="Enter product name" className='w-full border h-[2.5rem]' />
              </Form.Item>
              <Form.Item label="Description" name="description" rules={rules}>
                <textarea className='w-full border' type="text" />
              </Form.Item>

              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Form.Item label="Price" name="price" rules={rules}>
                    <Input type="number" placeholder="₹ Price" />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Category" name="category" rules={rules}>
                    <select className="w-full h-[38px] border rounded px-2">
                      <option value="">Select</option>
                      <option value="electronics">Electronics</option>
                      <option value="fashion">Fashion</option>
                      <option value="home">Home</option>
                      <option value="sports">Sports</option>
                    </select>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Age" name="age" rules={rules}>
                    <Input type="number" placeholder="In months" />
                  </Form.Item>
                </Col>
              </Row>

              {/* Checkbox Part */}
              <div className="flex gap-10">
                {additionalThings.map((item) => {
                  return (
                    <Form.Item
                      label={item.label}
                      name={item.name}
                      valuePropName="checked"
                    >
                      <Input
                        type="checkbox"
                        value={item.name}
                        onChange={(e) => {
                          formRef.current.setFieldsValue({
                            [item.name]: e.target.checked,
                          });
                        }}
                        checked={formRef.current?.getFieldValue(item.name)}
                      />
                    </Form.Item>
                  );
                })}
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
