/*
 * @Author: fuzhenghao
 * @Date: 2022-04-22 15:02:41
 * @LastEditTime: 2022-04-26 00:06:06
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\pages\mainPage\staffManager\search\search.tsx
 */
import React from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { SearchBox } from '@/components';
import styles from './search.less';

const FormItem = Form.Item;

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
      const values = await form.validateFields(['identificationNumber']);
      console.log(values);
      if (values) {
        this.props.onSearch({ params: values });
      }
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
      labelCol: { span: 9 },
      wrapperCol: { span: 15 },
    };

    // col布局
    const colSpan = {
      md: 8,
      xxl: 8,
    };

    // const { getFieldDecorator } = this.props.form;

    return (
      <Form className={styles.searchForm} ref={this.formRef}>
        <SearchBox
          hideSwitch={true}
          openChange={() => this.props.openChange()}
          TopItem={
            <Row>
              <Col {...colSpan}>
                <FormItem
                  name="identificationNumber"
                  {...formItemLayout}
                  label="身份证号:"
                >
                  <Input maxLength={40} />
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
