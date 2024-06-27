import React, { useState } from 'react';
import { MessageOutlined, HistoryOutlined, LeftOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Button } from 'antd';
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
        key: 'chat',
        icon: <MessageOutlined />,
    }
]

const AdminSideBar = () => {
    const [current, setCurrent] = useState('history');
    const router = useRouter();

    const onClick: MenuProps['onClick'] = (e) => {
        // if (e.key === 'chatbot') router.push('/chat')
        router.push('/admin/' + e.key)
        setCurrent(e.key);
    };

    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    // border-inline-end
    return (
        <div className="tw-flex tw-flex-col tw-justify-between tw-bg-white tw-rounded-[26px] tw-p-10 tw-w-auto" style={{ height: '100%' }}>
            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="inline"
                items={items}
                inlineCollapsed={collapsed}
                style={{
                    width: collapsed ? '50px' : '240px',
                    borderInlineEnd: 0
                }}
                className='tw-transition-none'
            />
            {/* <Button 
                onClick={toggleCollapsed} 
                style={{
                    height: 50,
                    width: 50,
                    transform: `rotate(${collapsed ? '180deg' : '0'})`
                }} 
                icon={<LeftOutlined />} 
            /> */}
        </div>
    );
};

export default AdminSideBar;
