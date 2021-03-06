/*
 * @Author: fuzhenghao
 * @Date: 2022-02-28 23:16:00
 * @LastEditTime: 2022-04-26 17:32:59
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\pages\mainPage\policeManager\index.tsx
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
import ImportModal from './importModal/index';
import { policeQuery, policeAdd, policeChange, policeDelete } from './service';
import { defaultPageListSetting } from '@/projectConfig';
import { policeFilesExport } from '@/commonService';
import moment from 'moment';
import AddModal from './addModal/index';
import ChangeModal from './changeModal/index';

import styles from './index.less';

let police_account = JSON.parse(localStorage.getItem('police_account'));
let id = police_account?.policeNumber;

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      loading: false,
      dataSource: [],
      addModal_isVisible: false,
      importModal_isVisible: false,
      changeModal_isVisible: false,
      editingColumn: {},
    };
  }

  importRef = React.createRef();

  params = {
    pageSize: defaultPageListSetting.pageSize,
    pageNum: 1,
  };

  componentDidMount() {
    this.indexQuery();
  }

  indexQuery = () => {
    this.setState({
      loading: true,
    });

    let { pageSize, pageNum } = this.params;
    // this.params = { ...this.params, ...params};
    // let values = {
    //   ...this.params,
    //   ...params,};
    let params_clone = {
      pageSize,
      pageNum: pageNum - 1,
    };

    policeQuery(params_clone, (data) => {
      this.setState({
        loading: false,
        dataSource: data.rows,
        total: data.total,
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

  freezePoliceInfo = (record) => {
    policeDelete(record.id, {}, () => {
      this.indexQuery();
    });
  };

  unFreezePoliceInfo = (record) => {
    policeChange({ id: record.id, status: 'Normal' }, () => {
      this.indexQuery();
    });
  };

  changePoliceInfo = (record) => {
    let { changeModal_isVisible } = this.state;

    this.setState({
      changeModal_isVisible: !changeModal_isVisible,
      editingColumn: record,
    });
  };

  addPoliceInfo_confirm = () => {
    this.formRef_add.current
      .validateFields()
      .then((values) => {
        values.createBy = id;
        policeAdd(values, (data: any) => {
          message.success('????????????');
          this.addModalChange();
          this.indexQuery();
        });
      })
      .catch((errorInfo) => {});
  };

  changePoliceInfo_confirm = () => {
    this.formRef_change.current
      .validateFields()
      .then((values) => {
        policeChange(values, (data: any) => {
          message.success('????????????');
          this.changeModalChange();
        });
      })
      .catch((errorInfo) => {});
  };

  importModalChange = () => {
    const { importModal_isVisible } = this.state;
    this.setState({
      importModal_isVisible: !importModal_isVisible,
    });
  };

  // ????????????
  pageChange = (pageNum) => {
    this.params.pageNum = pageNum;
    this.indexQuery();
  };

  // ????????????
  onShowSizeChange = (current, pageSize) => {
    this.params.pageNum = 1;
    this.params.pageSize = pageSize;
    this.indexQuery();
  };

  render() {
    const columns = [
      {
        title: '??????',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '??????',
        dataIndex: 'policeNumber',
        key: 'policeNumber',
      },
      {
        title: '???????????????',
        dataIndex: 'createBy',
        key: 'createBy',
      },
      {
        title: '????????????',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text) => {
          return moment(text).format('YYYY-MM-DD');
        },
      },
      {
        title: '??????',
        key: 'status',
        dataIndex: 'status',
        render: (text) => (
          <Tag color={text === 'Normal' ? 'green' : 'red'} key={text}>
            {text.toUpperCase()}
          </Tag>
        ),
      },
      {
        title: '??????',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <a
              onClick={() => {
                this.changePoliceInfo(record);
              }}
            >
              ??????
            </a>
            {record.status !== 'Frozen' ? (
              <a
                style={{ color: 'red' }}
                onClick={() => {
                  this.freezePoliceInfo(record);
                }}
              >
                ??????
              </a>
            ) : (
              <a
                style={{ color: 'green' }}
                onClick={() => {
                  this.unFreezePoliceInfo(record);
                }}
              >
                ??????
              </a>
            )}
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
      importModal_isVisible,
    } = this.state;
    let { pageSize, pageNum } = this.params;

    return (
      <div className={styles.rootPgae}>
        <Space>
          <Button
            type="primary"
            onClick={() => {
              this.addModalChange();
            }}
          >
            ??????
          </Button>
          <Button onClick={this.importModalChange}>??????</Button>
          {/* <Button
            onClick={() => {
              policeFilesExport({}, (res) => {
                console.log(res);
                const aLink = document.createElement('a');
                document.body.appendChild(aLink);
                aLink.style.display = 'none';
                const objectUrl = URL.createObjectURL(new Blob([res]));
                aLink.href = objectUrl;
                // aLink.download = this.props.excelName + '.xlsx';
                aLink.download = '????????????.xlsx';
                aLink.click();
                document.body.removeChild(aLink);
              });
            }}
          >
            ??????
          </Button> */}
          {/* <Button target="lzy4bizz.cn/v1/staff/export">??????</Button> */}
          <Button href="http://lzy4bizz.cn/v1/staff/export">??????</Button>
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
              ??????{pageSize}????????? , ???{total ? total : 0}?????????
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
          title="??????????????????"
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
              ??????
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={() => {
                this.addPoliceInfo_confirm();
              }}
            >
              ??????
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
          title="??????????????????"
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
              ??????
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={() => {
                this.changePoliceInfo_confirm();
              }}
            >
              ??????
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
          title="????????????"
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
              ??????
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
                  //????????????
                  console.log('??????');
                  this.importRef.current.handleUpload();
                }
              }}
            >
              ??????
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
  }
}
