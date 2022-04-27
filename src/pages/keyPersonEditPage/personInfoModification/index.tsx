/*
 * @Author: fuzhenghao
 * @Date: 2022-04-25 16:56:55
 * @LastEditTime: 2022-04-27 13:53:26
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\pages\keyPersonEditPage\personInfoModification\index.tsx
 */
import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, message, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { history } from 'umi';

import styles from './index.less';

import { keyPersonChange } from '@/commonService';

const { Password } = Input;

const account = JSON.parse(localStorage.getItem('keyPerson_account'));

export default class index extends Component {
  onFinish = (values) => {
    console.log('finish');
    console.log(account.password);
    keyPersonChange({ password: values.newPassword, id: account.id }, () => {
      message.success('修改成功,请重新登录');
      localStorage.removeItem('keyPersonChange');
      history.push('/index');
    });
  };

  forgotPasswpord = () => {
    message.warning('暂不支持此功能');
  };

  goto_index = () => {
    history.goBack();
  };

  render() {
    return (
      <Form
        name="normal_login"
        className={styles.passwordManagerForm}
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
      >
        <Form.Item
          name="password"
          rules={[
            { required: true, message: '请输入密码!' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || account.password === value) {
                  return Promise.resolve();
                }
                return Promise.reject('密码错误');
              },
            }),
          ]}
        >
          <Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="请输入账号密码"
          />
        </Form.Item>
        <Form.Item
          name="password_check"
          rules={[
            { required: true, message: '请确认密码!' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('两次密码输入不一致');
              },
            }),
          ]}
        >
          <Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="请确认密码"
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
          rules={[
            { required: true, message: '请输入新密码!' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') !== value) {
                  return Promise.resolve();
                }
                return Promise.reject('请勿输入相同的密码');
              },
            }),
          ]}
        >
          <Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="请输入新密码"
          />
        </Form.Item>
        <Form.Item>
          <a className="login-form-forgot" onClick={this.forgotPasswpord}>
            忘记密码
          </a>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              修改密码
            </Button>
            <Button
              type="primary"
              onClick={this.goto_index}
              className="login-form-button"
            >
              返回
            </Button>
          </Space>
        </Form.Item>
      </Form>
    );
  }
}
