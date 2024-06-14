"use client";

import { Button, Form, Input } from "antd";

type FieldType = {
  email: string;
  password: string;
};

const SignupForm = () => {
  const [form] = Form.useForm<FieldType>();

  const onComplete = (params: FieldType) => {
    console.log(params);
  };

  return (
    <>
      <Form
        form={form}
        name="signup-form"
        onFinish={onComplete}
        layout="vertical"
        requiredMark={false}
        validateTrigger="onSubmit"
      >
        <section className="tw-flex tw-justify-start tw-gap-6">
          <Form.Item
            name="firstName"
            label="First name"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
            style={{ flex: 1 }}
          >
            <Input placeholder="First name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last name"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
            style={{ flex: 1 }}
          >
            <Input placeholder="Last name" />
          </Form.Item>
        </section>

        <Form.Item
          name="company"
          label="Company"
          rules={[{ required: true, message: "Please input your company!" }]}
          style={{ flex: 1 }}
        >
          <Input placeholder="Company" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your email!",
            },
          ]}
          style={{ flex: 1 }}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Repeat password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Repeat password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="tw-w-full">
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignupForm;
