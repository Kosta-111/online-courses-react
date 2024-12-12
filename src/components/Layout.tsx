import { useState } from 'react';
import {
    HomeFilled,
    InfoCircleFilled,
    LoginOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PlusCircleFilled,
    ProductFilled
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { accountService } from '../services/accounts.service';
import { useAccountContext } from '../contexts/account.context';

const { Header, Sider, Content } = Layout;

const AppLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const logout = () => {
        accountService.logout();
        clear();
    }
    const { email, isAuth, clear } = useAccountContext();

    return (
        <Layout className='Layout'>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <HomeFilled />,
                            label: <Link to="/">Home</Link>,
                        },
                        {
                            key: '2',
                            icon: <ProductFilled />,
                            label: <Link to="/courses">Couses</Link>,
                        },
                        {
                            key: '3',
                            icon: <PlusCircleFilled />,
                            label: <Link to="/create">Add course</Link>,
                        },
                        {
                            key: '4',
                            icon: <InfoCircleFilled />,
                            label: <Link to="/about">About</Link>,
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer, display: "flex", justifyContent: "space-between" }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    {isAuth()
                        ?
                        <>
                            <span>Hello, {email}</span>
                            <Button
                                type="text"
                                icon={<LogoutOutlined />}
                                onClick={logout}
                                style={{
                                    fontSize: '16px',
                                    height: 64,
                                }}>
                                Logout
                            </Button>
                        </>
                        :
                        <Link to="/login">
                            <Button
                                type="text"
                                icon={<LoginOutlined />}
                                style={{
                                    fontSize: '16px',
                                    height: 64,
                                }}>
                                Login
                            </Button>
                        </Link>
                    }
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default AppLayout;