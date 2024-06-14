"use client";

import { Button, Form, Input } from "antd";

type FieldType = {
  email: string;
};

const ForgotPasswordForm = () => {
  const [form] = Form.useForm<FieldType>();

  const onComplete = (params: FieldType) => {
    console.log(params);
  };
  return (
    <>
      <Form
        form={form}
        name="forgot-password-form"
        onFinish={onComplete}
        layout="vertical"
        requiredMark={false}
        validateTrigger="onSubmit"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="tw-w-full">
            Next
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ForgotPasswordForm;
