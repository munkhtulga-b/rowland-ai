import { useState } from 'react';
import { Modal, Button, Form, Input } from "antd";
import { TypeChangePassword } from "@/app/_types/user/TypeProfileUpdateUser";
import _ from "lodash";
import { notification } from "antd";
import $api from '@/app/_api';
import { passwordValidator } from '@/app/_utils/helpers';
import Image from 'next/image';

const ChangePasswordButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm<TypeChangePassword>();
    const [api, _contextHolder] = notification.useNotification();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const openNotification = () => {
        api.success({
            message: 'The password has been updated',
        });
    };

    const beforeComplete = async (params: TypeChangePassword) => {
        setIsLoading(true)
        const body = _.omit(params, ["confirmPassword"]);

        const { isOk } = await $api.user.changePassword({
            oldPassword: body.oldPassword || "",
            newPassword: body.newPassword || ""
        });

        if (isOk) {
            handleOk()
            openNotification()
        }
        setIsLoading(false)
    };

    return <>
        {_contextHolder}
        <div className="tw-p-6 tw-rounded-2xl tw-bg-grayLight hover:tw-bg-slate-200 tw-flex tw-text-2xl tw-text-secondaryGray tw-flex-row tw-justify-between hover:tw-cursor-pointer" onClick={showModal}>
            <div className="tw-flex tw-flex-row tw-items-center tw-gap-4">
                <div className="tw-min-w-[28px] tw-max-w-[28px] tw-min-h-[28px] tw-max-h-[28px]">
                    <Image
                        src="/assets/icons/lock.svg"
                        alt="chevron-right-icon"
                        width={0}
                        height={0}
                        style={{ width: "100%", height: "100%" }}
                        priority
                    />
                </div>
                <div className="tw-text-lg tw-font-medium">Change password</div>
            </div>
            <div className="">
                <div className="tw-min-w-[28px] tw-max-w-[28px] tw-min-h-[28px] tw-max-h-[28px]">
                    <Image
                        src="/assets/icons/chevron-right.svg"
                        alt="chevron-right-icon"
                        width={0}
                        height={0}
                        style={{ width: "100%", height: "100%" }}
                        priority
                    />
                </div>
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
                    style={{
                        padding: "16px 32px"
                    }}
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
                    },
                    () => ({
                        validator(_, value) {
                            const isPasswordValid = passwordValidator(value);
                            if (isPasswordValid.isValid) {
                                return Promise.resolve();
                            }
                            return Promise.reject(
                                new Error(isPasswordValid.message)
                            );
                        },
                    }),
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
                                new Error("The password that you entered do not match!")
                            );
                        },
                    }),
                ]}
            >
                <Input.Password placeholder="Repeat password" />
            </Form.Item>
        </Modal>
    </>
}

export default ChangePasswordButton