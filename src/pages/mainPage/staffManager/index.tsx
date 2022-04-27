/*
 * @Author: fuzhenghao
 * @Date: 2022-02-28 23:16:00
 * @LastEditTime: 2022-04-27 13:52:02
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\pages\mainPage\staffManager\index.tsx
 */
import React, { Component } from 'react';
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
// import { get_axios } from '@/utils/axios';
import {
  keyPersonQuery,
  keyPersonAdd,
  keyPersonDelete,
  keyPersonSearch,
} from './service';

import { keyPersonChange } from '@/commonService';

import { defaultPageListSetting } from '@/projectConfig';
import moment from 'moment';
import AddModal from './addModal/index';
import ChangeModal from './changeModal/index';
import RecordCheckPage from './recordCheckPage/index';
import AnalysisDataPage from './analysisDataPage/index';
import Search from './search/search';
import styles from './index.less';
import ImportModal from './importModal/index';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      loading: false,
      dataSource: [],
      addModal_isVisible: false,
      changeModal_isVisible: false,
      importModal_isVisible: false,
      editingColumn: {},
      status_page: 'personList',
      record_id: null,
      kId: null,
    };
  }

  params = {
    pageSize: defaultPageListSetting.pageSize,
    pageNum: 1,
  };

  importRef = React.createRef();

  componentDidMount() {
    this.props.onRef(this);
    this.indexQuery();
    console.log('this');
    console.log(this);
  }

  get_staffId = () => {
    let police_account = JSON.parse(localStorage.getItem('police_account'));
    let staffId = police_account?.policeNumber;
    return staffId;
  };

  indexQuery = () => {
    this.setState({
      loading: true,
    });

    let { localSelectNode } = this.props;
    let { pageSize, pageNum } = this.params;
    // this.params = { ...this.params, ...params};
    // let values = {
    //   ...this.params,
    //   ...params,};
    let params_clone = {
      pageSize,
      pageNum: pageNum - 1,
      kpType: localSelectNode === 'all' ? '' : localSelectNode,
    };

    keyPersonQuery(this.get_staffId(), params_clone, (data) => {
      this.setState({
        loading: false,
        dataSource: data.rows,
        total: data.total,
        status_page: 'personList',
      });
    });
  };

  addModalChange = () => {
    let { addModal_isVisible } = this.state;
    this.setState({
      addModal_isVisible: !addModal_isVisible,
    });
  };

  changeModalChange = () => {
    let { changeModal_isVisible } = this.state;
    this.setState({
      changeModal_isVisible: !changeModal_isVisible,
    });
  };

  deleteKeyPersonInfo = (record) => {
    keyPersonDelete(record.id, {}, () => {
      this.indexQuery();
    });
  };

  changeKeyPersonInfo = (record) => {
    let { changeModal_isVisible } = this.state;

    this.setState({
      changeModal_isVisible: !changeModal_isVisible,
      editingColumn: record,
    });
  };

  addKeyPersonInfo_confirm = () => {
    let staffId = this.get_staffId();
    this.formRef_add.current
      .validateFields()
      .then((values) => {
        values.createBy = staffId;
        console.log(staffId);
        values.staffId = staffId;
        keyPersonAdd(values, (data: any) => {
          message.success('添加成功');
          this.addModalChange();
          this.indexQuery();
        });
      })
      .catch((errorInfo) => {});
  };

  changeKeyPersonInfo_confirm = () => {
    let { editingColumn } = this.state;
    this.formRef_change.current
      .validateFields()
      .then((values) => {
        values.id = editingColumn.id;
        keyPersonChange(values, (data: any) => {
          message.success('修改成功');
          this.changeModalChange();
        });
      })
      .catch((errorInfo) => {});
  };

  checkCalender = (record) => {
    this.setState({
      status_page: 'canlenderList',
      record_id: record.identificationNumber,
    });
  };

  analysisData = (record) => {
    console.log(record.id);

    this.setState({
      kId: record.id,
      status_page: 'analysisDataPage',
    });
  };

  // 切换页数
  pageChange = (pageNum) => {
    this.params.pageNum = pageNum;
    this.indexQuery();
  };

  // 切换条数
  onShowSizeChange = (current, pageSize) => {
    this.params.pageNum = 1;
    this.params.pageSize = pageSize;
    this.indexQuery();
  };

  goToPersonListPage = () => {
    this.setState({ status_page: 'personList' });
  };

  // 搜索
  onSearch = (params) => {
    console.log(params);
    this.params.pageNo = 1;
    this.params = { ...this.params, ...params };
    this.searchQuery(params.params.identificationNumber);
  };

  searchQuery = (identificationNumber) => {
    console.log(identificationNumber);

    keyPersonSearch(
      identificationNumber,
      { staffId: this.get_staffId() },
      (data) => {
        console.log(data);

        this.setState({
          loading: false,
          dataSource: [data],
          total: 1,
        });
      },
    );
  };

  // 切换开关时改变table的高度
  openChange = (open) => {
    if (this.tableBoxRef) {
      this.tableBoxRef.setHeight();
    }
  };

  importModalChange = () => {
    const { importModal_isVisible } = this.state;
    this.setState({
      importModal_isVisible: !importModal_isVisible,
    });
  };

  render() {
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '身份证号',
        dataIndex: 'identificationNumber',
        key: 'identificationNumber',
      },
      {
        title: '创建者警员号',
        dataIndex: 'createBy',
        key: 'createBy',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text) => {
          return moment(text).format('YYYY-MM-DD');
        },
      },
      {
        title: '日历记录查看',
        dataIndex: 'check',
        key: 'check',
        render: (text, record) => {
          return (
            <Button
              onClick={() => {
                this.checkCalender(record);
              }}
              type="link"
            >
              查看
            </Button>
          );
        },
      },
      {
        title: '数据分析',
        dataIndex: 'fenxi',
        key: 'fenxi',
        render: (text, record) => {
          return (
            <Button
              onClick={() => {
                this.analysisData(record);
              }}
              type="link"
            >
              数据分析
            </Button>
          );
        },
      },
      {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        render: (text) => (
          <Tag color={text === 'Normal' ? 'green' : 'red'} key={text}>
            {text.toUpperCase()}
          </Tag>
        ),
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <a
              onClick={() => {
                this.changeKeyPersonInfo(record);
              }}
            >
              修改
            </a>
            {record.status !== 'Frozen' ? (
              <a
                style={{ color: 'red' }}
                onClick={() => {
                  this.deleteKeyPersonInfo(record);
                }}
              >
                删除
              </a>
            ) : null}
          </Space>
        ),
      },
    ];
    let {
      dataSource,
      addModal_isVisible,
      changeModal_isVisible,
      loading,
      editingColumn,
      total,
      status_page,
      record_id,
      kId,
      importModal_isVisible,
    } = this.state;
    let { pageSize, pageNum } = this.params;

    if (status_page === 'personList') {
      return (
        <div className={styles.rootPgae}>
          <Search
            onSearch={this.onSearch}
            openChange={() => this.openChange()}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => {
                this.addModalChange();
              }}
            >
              新增
            </Button>
            <Button onClick={this.importModalChange}>导入</Button>
            <Button
              onClick={() => {
                window.open(
                  `http://lzy4bizz.cn/v1/keyPer/export?staffId=${
                    JSON.parse(localStorage.getItem('police_account')).policeNumber
                  }`,
                );
              }}
            >
              导出
            </Button>
          </Space>
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
          <Modal
            title="重要人员信息人员新增"
            visible={addModal_isVisible}
            closable={false}
            // onOk={this.addModalChange}
            // onCancel={this.addModalChange}
            footer={[
              <Button
                key="back"
                onClick={() => {
                  this.addModalChange();
                }}
              >
                返回
              </Button>,
              <Button
                key="submit"
                type="primary"
                // loading={loading}
                onClick={() => {
                  this.addKeyPersonInfo_confirm();
                }}
              >
                确定
              </Button>,
            ]}
          >
            <AddModal
              setFormRef_add={(formRef_add) => {
                this.formRef_add = formRef_add;
              }}
            />
          </Modal>
          <Modal
            title="重要人员信息人员修改"
            visible={changeModal_isVisible}
            // onOk={this.addModalChange}
            // onCancel={this.addModalChange}
            closable={false}
            footer={[
              <Button
                key="back"
                onClick={() => {
                  this.changeModalChange();
                }}
              >
                返回
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={loading}
                onClick={() => {
                  this.changeKeyPersonInfo_confirm();
                }}
              >
                确定
              </Button>,
            ]}
          >
            <ChangeModal
              editingColumn={editingColumn}
              setFormRef_change={(formRef_change) => {
                this.formRef_change = formRef_change;
              }}
            />
          </Modal>
          <Modal
            title="文件导入"
            visible={importModal_isVisible}
            // onOk={this.addModalChange}
            // onCancel={this.addModalChange}
            closable={false}
            footer={[
              <Button
                key="back"
                onClick={() => {
                  this.importModalChange();
                }}
              >
                返回
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={loading}
                onClick={() => {
                  // this.changePoliceInfo_confirm();
                  let fileList = this.importRef.current.state.fileList;
                  console.log(fileList);
                  console.log(this.importRef.current);

                  if (fileList.length > 0) {
                    //上传文件
                    console.log('上传');
                    this.importRef.current.handleUpload();
                  }
                }}
              >
                确定
              </Button>,
            ]}
          >
            <ImportModal
              // editingColumn={editingColumn}
              ref={this.importRef}
            />
          </Modal>
        </div>
      );
    } else if (status_page === 'analysisDataPage') {
      return (
        <AnalysisDataPage
          kId={kId}
          goToPersonListPage={this.goToPersonListPage}
        />
      );
    } else if (status_page === 'canlenderList') {
      return (
        <RecordCheckPage
          record_id={record_id}
          goToPersonListPage={this.goToPersonListPage}
        />
      );
    }
  }
}
