import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spin, Typography, Empty, Tooltip } from "antd";
import { GetResponse } from "../../apicalls/contact";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";

const { Title, Text } = Typography;

function ContactResponse() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchResponses = async () => {
      dispatch(SetLoader(true));
      setLoading(true);
      try {
        const res = await GetResponse();
        if (res.success) {
          setResponses(res.data);
        } else {
          setResponses([]);
        }
      } catch (err) {
        setResponses([]);
      }
      setLoading(false);
      dispatch(SetLoader(false));
    };
    fetchResponses();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-8">
      <Title level={2} className="text-center text-purple-700 mb-8 drop-shadow-lg">
        Contact Us Responses
      </Title>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : responses.length === 0 ? (
        <Empty description="No responses found" />
      ) : (
        <Row gutter={[24, 24]}>
          {responses.map((item) => (
            <Col xs={24} sm={12} md={8} lg={6} key={item._id}>
              <Card
                hoverable
                className="shadow-2xl rounded-2xl border-0 bg-white transition-transform duration-200 hover:scale-105"
                style={{ minHeight: 250 }}
                title={
                  <Tooltip title={item.subject}>
                    <Title level={4} className="mb-0 text-blue-600 truncate">
                      {item.subject}
                    </Title>
                  </Tooltip>
                }
              >
                <div className="mb-2">
                  <Text strong>Name: </Text>
                  <Text>{item.name}</Text>
                </div>
                <div className="mb-2">
                  <Text strong>Email: </Text>
                  <Text copyable>{item.email}</Text>
                </div>
                <div>
                  <Text strong>Message:</Text>
                  <div className="mt-1 text-gray-700 break-words max-h-32 overflow-auto">
                    {item.message}
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default ContactResponse;
