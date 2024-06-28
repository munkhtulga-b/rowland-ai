"use client";

import { ReactNode } from "react";
import { TypeSignupRequest } from "@/app/_types/auth/TypeSignupBody";
import type { RequiredMark } from "antd/es/form/Form";
import { Button, Form, Input } from "antd";
import _ from "lodash";
import { passwordValidator } from "@/app/_utils/helpers";

interface ExtendedSignupRequest extends TypeSignupRequest {
  confirm: string;
}

const SignupForm = ({
  onComplete,
  isLoading,
}: {
  onComplete: (_params: TypeSignupRequest) => Promise<void>;
  isLoading: boolean;
}) => {
  const [form] = Form.useForm<ExtendedSignupRequest>();

  const beforeComplete = (params: ExtendedSignupRequest) => {
    if (!params.companyName?.length) {
      delete params.companyName;
    }
    const body = _.omit(params, ["confirm"]);
    onComplete(body);
  };

  const customizeRequiredMark: RequiredMark = (
    label: ReactNode,
    { required }: { required: boolean }
  ) => (
    <>
      {label}
      {required && <span className="tw-ml-1 tw-text-red-500">*</span>}
    </>
  );

  return (
    <>
      <Form
        form={form}
        name="signup-form"
        onFinish={beforeComplete}
        layout="vertical"
        requiredMark={customizeRequiredMark}
        validateTrigger="onChange"
      >
        <div className="tw-flex tw-flex-col tw-gap-6">
          <section className="tw-flex tw-justify-start tw-gap-6">
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
              style={{ flex: 1, marginBottom: 0 }}
              required
            >
              <Input placeholder="First name" />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
              style={{ flex: 1, marginBottom: 0 }}
              required
            >
              <Input placeholder="Last name" />
            </Form.Item>
          </section>

          <Form.Item
            name="companyName"
            label="Company"
            style={{ marginBottom: 0 }}
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
            required
            style={{ marginBottom: 0 }}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            style={{ marginBottom: 0 }}
            rules={[
              {
                required: true,
                message: "",
              },
              () => ({
                validator(_, value) {
                  const isPasswordValid = passwordValidator(value);
                  if (isPasswordValid.isValid) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(isPasswordValid.message));
                },
              }),
            ]}
            required
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <section className="tw-flex tw-flex-col tw-mb-8">
            <Form.Item
              name="confirm"
              label="Repeat password"
              dependencies={["password"]}
              hasFeedback
              style={{ marginBottom: 0 }}
              required
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
                      new Error("The password that you entered do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Repeat password" />
            </Form.Item>
          </section>
        </div>

        <Form.Item>
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            className="tw-w-full"
          >
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignupForm;
