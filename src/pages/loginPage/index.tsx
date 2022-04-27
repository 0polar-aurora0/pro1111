/*
 * @Author: fuzhenghao
 * @Date: 2022-02-28 23:00:05
 * @LastEditTime: 2022-04-26 17:06:19
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\pages\loginPage\index.tsx
 */
import React, { Component } from 'react';
import { history } from 'umi';
import { Form, Input, Button, Checkbox, Tabs } from 'antd';
import styles from './index.less';
import { loginPost_police, loginPost_keyPerson } from './service';

const { TabPane } = Tabs;

export default class loginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  form_login = React.createRef();

  // goToLogin = () => {

  // };

  render() {
    const _this = this;

    const onFinish_police = (values) => {
      loginPost_police(values, () => {
        //进行数据缓存
        localStorage.setItem('police_account', JSON.stringify(values));
        history.push('/mainPage/policeManager');
      });
    };

    const onFinishFailed_police = (errorInfo) => {};

    const onFinish_keyPerson = (values) => {
      loginPost_keyPerson(values, (data) => {
        //进行数据缓存
        //返回的数据有数据信息 录入缓存
        history.push('/keyPersonEditPage/index');
        localStorage.setItem('keyPerson_account', JSON.stringify(data));
      });
    };

    const onFinishFailed_keyPerson = (errorInfo) => {};

    return (
      <div className={styles.loginPage}>
        <div className={styles.loginArea}>
          <Tabs defaultActiveKey="0">
            <TabPane tab="警员登陆通道" key="0">
              <Form
                ref={this.form_login}
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish_police}
                onFinishFailed={onFinishFailed_police}
                autoComplete="off"
              >
                <Form.Item
                  label="用户名"
                  name="policeNumber"
                  rules={[
                    {
                      required: true,
                      message: '请输入用户名!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="密码"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: '请输入密码!',
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Checkbox>记住我</Checkbox>
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    登录
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="重点人员管理通道" key="1">
              <Form
                ref={this.form_login}
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish_keyPerson}
                onFinishFailed={onFinishFailed_keyPerson}
                autoComplete="off"
              >
                <Form.Item
                  label="身份证号"
                  name="identificationNumber"
                  rules={[
                    {
                      required: true,
                      message: '请输入用户名!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="密码"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: '请输入密码!',
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Checkbox>记住我</Checkbox>
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button
                    // onClick={() => {
                    //   this.goToLogin();
                    // }}
                    type="primary"
                    htmlType="submit"
                  >
                    登录
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}
