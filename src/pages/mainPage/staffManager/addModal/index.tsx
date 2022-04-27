/*
 * @Author: fuzhenghao
 * @Date: 2022-03-01 18:27:10
 * @LastEditTime: 2022-03-05 00:20:04
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\pages\mainPage\staffManager\addModal\index.tsx
 */
import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';
import { treeListQuery } from '@/commonService';

const { Option } = Select;

export default class index extends Component {
  constructor(props: any) {
    super(props);
    this.state = { treeListData: [] };
  }

  formRef_add = React.createRef();

  componentDidMount = () => {
    this.props.setFormRef_add(this.formRef_add);
    treeListQuery({}, (treeListData) => {
      this.setState({
        treeListData,
      });
    });
  };

  render() {
    let { treeListData } = this.state;

    return (
      <div>
        <Form
          ref={this.formRef_add}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          //   onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
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
            label="人群类别"
            name="kpType"
            rules={[{ required: true, message: '请选择人群类别' }]}
          >
            <Select
              style={{ width: 120 }}
              // onChange={handleChange}
            >
              {treeListData.map((record, index) => {
                return <Option value={record.name}>{record.viewName}</Option>;
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="身份证号"
            name="identificationNumber"
            rules={[{ required: true, message: '请输入身份证号' }]}
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
