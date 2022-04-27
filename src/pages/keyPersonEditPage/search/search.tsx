/*
 * @Author: fuzhenghao
 * @Date: 2022-04-22 15:02:41
 * @LastEditTime: 2022-04-26 19:29:03
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\pages\keyPersonEditPage\search\search.tsx
 */
import React from 'react';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { SearchBox } from '@/components';
import styles from './search.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

// 查询条件区
// @Form.create()
export default class search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [], //基地类别
      currentLinkList: [], //当前审核环节
    };
  }

  formRef = React.createRef();

  componentDidMount() {
    console.log(this.props);
    console.log(this);
  }

  //查询
  onSearch = async () => {
    console.log(this);

    const form = this.formRef.current;
    try {
      const values = await form.validateFields(['time']);
      console.log(values);
      // if (values) {
      this.props.onSearch(values);
      // }
    } catch (err) {
      console.log(err);
    }
  };

  //重置
  onRefresh = () => {
    // this.props.form.resetFields();
    this.onSearch();
  };

  render() {
    //布局
    const formItemLayout = {
      labelCol: { span: 15 },
      wrapperCol: { span: 15 },
    };

    // const { getFieldDecorator } = this.props.form;

    return (
      <Form className={styles.searchForm} ref={this.formRef}>
        <SearchBox
          hideSwitch={true}
          openChange={() => this.props.openChange()}
          TopItem={
            <Row>
              <Col span={24}>
                <FormItem name="time" {...formItemLayout} label="起止时间:">
                  <RangePicker />
                </FormItem>
              </Col>
            </Row>
          }
          Btn={
            <div className="inline-block">
              <Button
                className="ml10"
                type="primary"
                htmlType="submit"
                onClick={this.onSearch}
              >
                查询
              </Button>
              <Button
                className="ml10"
                type="primary"
                ghost
                htmlType="submit"
                onClick={this.onRefresh}
              >
                重置
              </Button>
            </div>
          }
        ></SearchBox>
      </Form>
    );
  }
}
