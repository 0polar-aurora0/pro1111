/*
 * @Author: fuzhenghao
 * @Date: 2022-03-01 18:27:10
 * @LastEditTime: 2022-03-02 23:14:20
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\pages\mainPage\policeManager\changeModal\index.tsx
 */
import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

export default class index extends Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  formRef_change = React.createRef();

  componentDidMount = () => {
    let { name, policeNumber, password } = this.props.editingColumn;
    this.props.setFormRef_change(this.formRef_change);
    this.formRef_change.current.setFieldsValue({
      name,
      policeNumber,
      password,
    });
  };

  onFinish_change 

  render() {
    return (
      <div>
        <Form
          ref={this.formRef_change}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
        >
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="警号"
            name="policeNumber"
            rules={[{ required: true, message: '请输入警号' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </div>
    );
  }
}
