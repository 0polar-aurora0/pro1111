/*
 * @Author: fuzhenghao
 * @Date: 2022-03-03 22:35:53
 * @LastEditTime: 2022-03-04 21:19:13
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\pages\mainPage\staffManager\recordCheckPage\index.tsx
 */
import React, { Component } from 'react';
import { defaultPageListSetting } from '@/projectConfig';
import {
  Table,
  Tag,
  Space,
  Button,
  Modal,
  message,
  Row,
  Col,
  Pagination,
} from 'antd';
import moment from 'moment';

import { queryByKpPost } from './service';
import { recordTypeListPost } from '@/commonService';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      loading: false,
      dataSource: [],
      recordTypeList: [],
    };
  }

  params = {
    pageSize: defaultPageListSetting.pageSize,
    pageNum: 1,
  };

  componentDidMount() {
    recordTypeListPost({}, (recordTypeList) => {
      this.setState({
        recordTypeList,
      });
    });
    this.indexQuery();
  }

  indexQuery = () => {
    let { record_id } = this.props;

    this.setState({
      loading: true,
    });

    let { pageSize, pageNum } = this.params;
    let params_clone = {
      pageSize,
      pageNum: pageNum - 1,
    };

    queryByKpPost(record_id, params_clone, (data) => {
      this.setState({
        loading: false,
        dataSource: data.rows,
        total: data.total,
      });
    });
  };

  onShowSizeChange = (current, pageSize) => {
    this.params.pageNum = 1;
    this.params.pageSize = pageSize;
    this.indexQuery();
  };

  // 切换页数
  pageChange = (pageNum) => {
    this.params.pageNum = pageNum;
    this.indexQuery();
  };

  goToPersonListPage = () => {
    this.props.goToPersonListPage();
  };

  render() {
    let _this = this;

    const columns = [
      {
        title: '记录类型',
        dataIndex: 'recordType',
        key: 'recordType',
        render: (record, text) => {
          let { recordTypeList } = _this.state;
          let show_text;
          recordTypeList.map((row, index) => {
            record === row.name && (show_text = row.viewName);
          });

          return show_text;
        },
      },
      {
        title: '详细信息',
        dataIndex: 'details',
        key: 'details',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text) => {
          return moment(text).format('YYYY-MM-DD');
        },
      },
    ];
    let { dataSource, total } = this.state;
    let { pageSize, pageNum } = this.params;
    return (
      <>
        <Button
          type="primary"
          onClick={() => {
            this.goToPersonListPage();
          }}
        >
          返回
        </Button>
        <Table columns={columns} dataSource={dataSource} pagination={false} />
        <Row className="page_pagination" gutter={24}>
          <Col span={6}>
            <span
              style={{
                lineHeight: '32px',
                fontSize: '14px',
              }}
            >
              每页{pageSize}条记录 , 共{total ? total : 0}条记录
            </span>
          </Col>
          <Col span={18} className="tr">
            <Pagination
              showLessItems
              showQuickJumper
              showSizeChanger
              current={pageNum}
              total={total}
              onShowSizeChange={this.onShowSizeChange}
              pageSize={pageSize}
              pageSizeOptions={defaultPageListSetting.pageSizeOption}
              onChange={this.pageChange}
            />
          </Col>
        </Row>
      </>
    );
  }
}
