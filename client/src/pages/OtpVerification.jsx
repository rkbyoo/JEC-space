import React, { useState } from "react";
import { Form, Input, Button, message, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { SignupUser, SendOTP } from "../apicalls/users";

const { Title, Text } = Typography;

const OtpVerification = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { name, email, password } = location.state || {};
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [otpValue, setOtpValue] = useState("");
    const [form] = Form.useForm();

    // Handle OTP verification
    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await SignupUser({
                name,
                email,
                password,
                otp: values.otp
            });
            if (response.success) {
                message.success("🎉 Signup successful! Please login.");
                navigate("/login");
            } else {
                message.error(response.message || "OTP verification failed");
                form.resetFields(["otp"]);
                setOtpValue("");
            }
        } catch (err) {
            message.error(
                err?.response?.data?.message ||
                err?.message ||
                "Error verifying OTP"
            );
            form.resetFields(["otp"]);
            setOtpValue("");
        }
        setLoading(false);
    };

    // Handle resend OTP
    const handleResendOtp = async () => {
        setResending(true);
        try {
            const response = await SendOTP({ email });
            if (response.success) {
                message.success("A new OTP has been sent to your email.");
                form.resetFields(["otp"]);
                setOtpValue("");
            } else {
                message.error(response.message || "Failed to resend OTP");
            }
        } catch (err) {
            message.error(
                err?.response?.data?.message ||
                err?.message ||
                "Failed to resend OTP"
            );
        }
        setResending(false);
    };

    // Handle OTP input change
    const handleOtpChange = (e) => {
        setOtpValue(e.target.value.replace(/\D/g, "")); // Only allow digits
    };

    if (!name || !email || !password) {
        return <div className="text-center mt-10 text-lg text-red-500">Missing signup information.</div>
    }

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-richblack-100 to-richblack-200">
            <div className="bg-white p-8 w-[400px] rounded-xl shadow-lg flex flex-col items-center">
                <Title level={2} className="mb-2 text-purple-700">Verify OTP</Title>
                <Text className="mb-4 text-gray-600 text-center block">
                    Enter the 6-digit OTP sent to <b>{email}</b>
                </Text>
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    className="w-full"
                >
                    <Form.Item
                        label="OTP"
                        name="otp"
                        rules={[
                            { required: true, message: "Please input the OTP sent to your email!" },
                            { len: 6, message: "OTP must be 6 digits." }
                        ]}
                    >
                        <Input
                            placeholder="Enter OTP"
                            maxLength={6}
                            value={otpValue}
                            onChange={handleOtpChange}
                            autoFocus
                            className="text-center tracking-widest text-lg"
                        />
                    </Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="w-full mb-2 bg-gradient-to-r from-purple-500 to-blue-500 border-0"
                        size="large"
                        disabled={otpValue.length !== 6}
                    >
                        Verify & Sign Up
                    </Button>
                </Form>
                <Button
                    type="link"
                    onClick={handleResendOtp}
                    loading={resending}
                    disabled={resending}
                    className="w-full mt-2 text-purple-600"
                >
                    Resend OTP
                </Button>
            </div>
        </div>
    );
};

export default OtpVerification;