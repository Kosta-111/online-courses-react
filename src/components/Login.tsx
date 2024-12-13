import type { FormProps } from 'antd';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserFormField } from '../models/accounts';
import { accountService } from '../services/accounts.service';
import { useAccountContext } from '../contexts/account.context';

const api = import.meta.env.VITE_ACCOUNTS_API;

const Login: React.FC = () => {

    const { setEmail } = useAccountContext();
    const navigate = useNavigate();

    const onFinish: FormProps<UserFormField>['onFinish'] = (values) => {
        console.log('Success:', values);

        axios.post(api + "login", values).then(res => {
            if (res.status === 200) {
                accountService.login(res.data.accessToken);
                message.success("Signed In successfully!");
                setEmail(values.email);
                navigate(-1);
            }
        }).catch(err => {
            message.error(err.response.data.message);
        });
    };

    return (
        <>
            <h2>Sign In</h2>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item<UserFormField>
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<UserFormField>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                {/* <Form.Item<UserFormField> name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item> */}

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
export default Login;