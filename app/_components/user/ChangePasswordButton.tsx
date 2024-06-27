import { LockOutlined, RightOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Modal, Button, Form, Input } from "antd";
import { TypeChangePassword } from "@/app/_types/user/TypeProfileUpdateUser";
import _ from "lodash";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import $api from '@/app/_api';

const ChangePasswordButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm<TypeChangePassword>();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const beforeComplete = async (params: TypeChangePassword) => {
        setIsLoading(true)
        const body = _.omit(params, ["confirmPassword"]);

        const { isOk, data } = await $api.user.changePassword({
            oldPassword: body.oldPassword || "",
            newPassword: body.newPassword || ""
        });

        if(isOk) {
            handleOk()
            toast("Password has been changed successfully");
        } else {
            console.log(data);
        }
        setIsLoading(false)
    };

    return <>
        <div className="tw-flex tw-text-2xl tw-text-secondaryGray tw-flex-row tw-justify-between hover:tw-cursor-pointer" onClick={showModal}>
            <div className="tw-flex tw-flex-row tw-items-center tw-gap-4">
                <LockOutlined />
                <div className="tw-text-lg tw-font-medium">Change password</div>
            </div>
            <div className="">
                <RightOutlined />
            </div>
        </div>
        <Modal
            title="Change password"
            styles={{
                header: {
                    fontSize: '20px',
                    fontWeight: '500',
                }
            }}
            open={isModalOpen}
            onOk={form.submit}
            okText="Save"
            onCancel={handleCancel}
            centered
            destroyOnClose
            modalRender={(dom) => (
                <Form
                    form={form}
                    name="change-password-form"
                    layout="vertical"
                    clearOnDestroy
                    onFinish={beforeComplete}
                    requiredMark={false}
                    validateTrigger="onChange"
                >
                    {dom}
                </Form>
            )}
            footer={[
                <Button
                    type="primary"
                    key="submit"
                    htmlType="submit"
                    loading={isLoading}
                >
                    Save
                </Button>
            ]}
        >
            <Form.Item
                name="oldPassword"
                label="Old password"
                rules={[
                    {
                        required: true,
                        message: "Please input your old password!",
                    },
                ]}
            >
                <Input.Password placeholder="Old password" />
            </Form.Item>
            <Form.Item
                name="newPassword"
                label="New password"
                rules={[
                    {
                        required: true,
                        message: "Please input your new password!",
                    },
                ]}
            >
                <Input.Password placeholder="New password" />
            </Form.Item>

            <Form.Item
                name="confirmPassword"
                label="Repeat password"
                dependencies={["newPassword"]}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue("newPassword") === value) {
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
            <ToastContainer />
        </Modal>
    </>
}

export default ChangePasswordButton