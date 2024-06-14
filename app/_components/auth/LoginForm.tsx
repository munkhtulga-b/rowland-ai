"use client";

import { Button, Form, Input } from "antd";

type FieldType = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [form] = Form.useForm<FieldType>();

  const onComplete = (params: FieldType) => {
    console.log(params);
  };

  return (
    <>
      <Form
        form={form}
        name="login-form"
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
        <section className="tw-flex tw-flex-col tw-mb-8">
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
            style={{ marginBottom: 0 }}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <div className="tw-flex tw-justify-end tw-mt-2">
            <span className="tw-text-base tw-text-primaryGray tw-cursor-pointer">
              Forget password?
            </span>
          </div>
        </section>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="tw-w-full">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
