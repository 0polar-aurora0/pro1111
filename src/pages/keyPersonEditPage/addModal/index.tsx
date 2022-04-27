/*
 * @Author: fuzhenghao
 * @Date: 2022-03-01 18:27:10
 * @LastEditTime: 2022-03-04 20:59:24
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\pages\keyPersonEditPage\addModal\index.tsx
 */
import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, Select } from 'antd';
import { recordTypeListPost } from '@/commonService';

const { TextArea } = Input;
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};

export default class index extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      recordTypeList: [],
    };
  }

  formRef_add = React.createRef();

  componentDidMount = () => {
    this.props.setFormRef_add(this.formRef_add);
    recordTypeListPost({}, (recordTypeList) => {
      this.setState({
        recordTypeList,
      });
    });
  };

  render() {
    const onChange = (e) => {

    };
    let { recordTypeList } = this.state;
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
            {...formItemLayout}
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入标题' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="信息简介"
            name="infoIntro"
            // rules={[{ required: true, message: '请输入信息简介' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="记录类型'"
            name="recordType"
            rules={[{ required: true, message: '请选择记录类型' }]}
          >
            <Select
              style={{ width: 120 }}
              // onChange={handleChange}
            >
              {recordTypeList.map((record, index) => {
                return <Option value={record.name}>{record.viewName}</Option>;
              })}
            </Select>
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="信息"
            name="details"
            rules={[{ required: true, message: '请写入具体文章信息' }]}
          >
            <TextArea
              showCount
              maxLength={500}
              style={{ height: 120 }}
              // onChange={onChange}
              autoSize={{ minRows: 20, maxRows: 20 }}
            />
          </Form.Item>
        </Form>
      </div>
    );
  }
}
