import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';

const AppProvider = ({children, fontFamily} : { children: React.ReactNode, fontFamily: unknown}) => {
    return (
        <>
            <AntdRegistry>
                <ConfigProvider theme={{
                    token: {
                        colorPrimary: "",
                        fontFamily: fontFamily as string,
                        fontSize: 14,
                        lineHeight: 21
                    }
                }}>
                    {children}
                </ConfigProvider>
            </AntdRegistry>
        </>
    );
}
 
export default AppProvider;