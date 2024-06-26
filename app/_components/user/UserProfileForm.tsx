"use client";

import { Form, Input, Button } from "antd";
import { useState } from 'react'
import TypeUser from "@/app/_types/auth/TypeUser";
import _ from "lodash";
import { TypeProfileUpdateUser } from "@/app/_types/user/TypeProfileUpdateUser";
import $api from "@/app/_api";
import { toast } from "react-toastify";

const UserProfileForm = ({ user }: { user: TypeUser }) => {

  const [form] = Form.useForm<TypeProfileUpdateUser>();
  const [isLoading, setIsLoading] = useState(false);
  

  const updateUserProfile = async (params: TypeProfileUpdateUser) => {
    const body = _.omit(params, ["confirm"]);
    const updateUser = {
      firstName: body.firstName || "",
      lastName: body.lastName || "",
      companyName: body.companyName || "",
    };

    
    setIsLoading(true);
    const { isOk, data } = await $api.user.updateUserProfile(updateUser, user.id);
    if (isOk) {
      toast.success
      console.log(data)
    }
    setIsLoading(false);
  }

  return (
    <>
      <Form
        form={form}
        name="profile-form"
        layout="vertical"
        requiredMark={false}
        onFinish={updateUserProfile}
        initialValues={{
          firstName: user.first_name,
          lastName: user.last_name,
          companyName: user.company_name
        }}
      >
        <section className="tw-flex tw-flex-row tw-justify-between tw-mb-6 tw-w-full">
          <div className="tw-text-xl tw-font-medium">Personal information</div>
          <Form.Item>
            <Button
              style={{
                fontSize: '18px',
                fontWeight: '500',
                border: '2px solid #4FBA70',
                borderRadius: '4px',
                height: '0'
              }}
              htmlType="submit"
              loading={isLoading}
            >Save</Button>
          </Form.Item>
        </section>

        <section className="tw-flex tw-justify-start tw-gap-6">
          <Form.Item
            name="firstName"
            label="First name"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
            style={{ flex: 1 }}
          >
            <Input placeholder="First name" style={{ backgroundColor: "white" }} />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last name"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
            style={{ flex: 1 }}
          >
            <Input placeholder="Last name" style={{ backgroundColor: "white" }} />
          </Form.Item>
        </section>

        <Form.Item
          name="companyName"
          label="Company"
          rules={[{ required: true, message: "Please input your company!" }]}
          style={{ flex: 1 }}
        >
          <Input placeholder="Company" style={{ backgroundColor: "white" }} />
        </Form.Item>
      </Form>
    </>
  );
};

export default UserProfileForm;
