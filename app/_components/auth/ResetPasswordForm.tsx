"use client";

import { TypeResetPasswordRequest } from "@/app/_types/auth/TypeResetPasswordBody";
import { Button, Form, Input } from "antd";
import _ from "lodash";

type FieldType = {
  password: string;
  confirm: string;
};

const ResetPasswordForm = ({
  onComplete,
  isLoading,
}: {
  onComplete: (_params: TypeResetPasswordRequest) => Promise<void>;
  isLoading: boolean;
}) => {
  const [form] = Form.useForm<FieldType>();

  const beforeComplete = (params: FieldType) => {
    const body = _.omit(params, ["confirm"]);
    onComplete(body);
  };

  return (
    <>
      <Form
        form={form}
        name="reset-password-form"
        onFinish={beforeComplete}
        layout="vertical"
        requiredMark={false}
        validateTrigger="onSubmit"
      >
        <Form.Item
          name="password"
          label="New password"
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
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            className="tw-w-full"
          >
            Next
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ResetPasswordForm;
