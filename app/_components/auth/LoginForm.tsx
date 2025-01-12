"use client";

import React from "react";
import { Button, Form, Input } from "antd";
import { TypeLoginRequest } from "@/app/_types/auth/TypeLoginBody";
import { useRouter } from "next/navigation";

const LoginForm = ({
  onLogin,
  isLoading,
}: {
  // eslint-disable-next-line no-unused-vars
  onLogin: (params: TypeLoginRequest) => void;
  isLoading: boolean;
}) => {
  const router = useRouter();
  const [form] = Form.useForm<TypeLoginRequest>();

  const beforeComplete = (params: TypeLoginRequest) => {
    params.email = params.email.toLowerCase().trim();
    onLogin(params);
  };

  return (
    <>
      <Form
        form={form}
        name="login-form"
        onFinish={beforeComplete}
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
          getValueFromEvent={(e: React.ChangeEvent<HTMLInputElement>) =>
            e.target.value.toLowerCase().trim()
          }
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
            <span
              onClick={() => router.push("/auth/forgot")}
              className="tw-text-base tw-text-primaryGray tw-cursor-pointer"
            >
              Forgot password?
            </span>
          </div>
        </section>

        <Form.Item>
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            className="tw-w-full"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
