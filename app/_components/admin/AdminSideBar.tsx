import React, { useState } from 'react';
import { MessageOutlined, HistoryOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useRouter } from 'next/navigation'

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: 'History',
        key: 'history',
        icon: <HistoryOutlined />,
    },
    {
        label: 'Chat bot',
        key: 'chatbot',
        icon: <MessageOutlined />,
    }
]

const AdminSideBar = () => {
    const [current, setCurrent] = useState('history');
    const router = useRouter();

    const onClick: MenuProps['onClick'] = (e) => {
        if (e.key === 'chatbot') router.push('/chat')
        else router.push('/admin/' + e.key)
        setCurrent(e.key);
    };
    return (
        <>
            <div className="tw-bg-white tw-rounded-[26px] tw-p-10 tw-w-full tw-h-full">
                <Menu onClick={onClick} selectedKeys={[current]} mode="inline" items={items} />
            </div>
        </>
    );
};

export default AdminSideBar;
