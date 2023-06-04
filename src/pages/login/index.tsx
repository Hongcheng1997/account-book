import { Form, Input, Button, NavBar } from 'antd-mobile';
import { history } from 'umi';
import { request } from '@/request';

export default function Login() {
  const login = (values) => {
    request
      .post('/user/login', {
        data: values,
      })
      .then(() => {
        history.push('/home');
      });
  };

  return (
    <div>
      <NavBar back={null}>登陆</NavBar>
      <Form
        layout="horizontal"
        onFinish={login}
        footer={
          <Button block type="submit" color="primary" size="large">
            提交
          </Button>
        }
      >
        <Form.Item
          name="userName"
          label="用户名"
          rules={[{ required: true, message: '用户名不能为空' }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[{ required: true, message: '密码不能为空' }]}
        >
          <Input placeholder="请输入密码" />
        </Form.Item>
      </Form>
    </div>
  );
}
