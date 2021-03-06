/*
 * @Author: fuzhenghao
 * @Date: 2022-02-28 23:16:00
 * @LastEditTime: 2022-04-26 19:25:26
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\pages\keyPersonEditPage\index.tsx
 */
import styles from './index.less';
import { Input, Calendar, Button, Modal, message, Row } from 'antd';
import AddModal from './addModal/index';
import React, { Component } from 'react';
import moment from 'moment';
import {
  logPost,
  recordAddPost,
  recordDeletePost,
  searchQuery,
} from './service';
import { recordTypeListPost } from '@/commonService';
import Search from './search/search';
const { TextArea } = Input;

function onPanelChange(value, mode) {}

let keyPerson_account = JSON.parse(localStorage.getItem('keyPerson_account'));
let id = keyPerson_account?.id;

export default class index extends Component {
  state = {
    logList: [],
    dateInfo: moment().format('YYYY-MM-DD'),
    addModal_isVisible: false,
    recordTypeList: [],
  };

  componentDidMount() {
    recordTypeListPost({}, (recordTypeList) => {
      this.setState({
        recordTypeList,
      });
    });
    this.indexQuery();
  }

  get_kId = () => {
    return JSON.parse(localStorage.getItem('keyPerson_account'))?.id;
  };

  addModalChange = () => {
    let { addModal_isVisible } = this.state;
    this.setState({
      addModal_isVisible: !addModal_isVisible,
    });
  };

  dateChange = (date) => {
    this.setState(
      {
        dateInfo: date,
      },
      () => {
        this.indexQuery();
      },
    );
  };

  indexQuery = () => {
    let { dateInfo } = this.state;
    let startTime = moment(dateInfo).startOf('day').format('YYYY/MM/DD HH:mm');
    let endTime = moment(dateInfo).endOf('day').format('YYYY/MM/DD HH:mm');
    logPost({ startTime, endTime, kId: id }, (logList) => {
      this.setState({
        logList,
      });
    });
  };

  addRecord_confirm = () => {
    let { dateInfo } = this.state;
    this.formRef_add.current
      .validateFields()
      .then((values) => {
        values.kpId = id;
        values.createTime = moment(dateInfo).format('YYYY/MM/DD hh:mm:ss');
        recordAddPost(values, (data: any) => {
          message.success('????????????');
          this.addModalChange();
          this.indexQuery();
        });
      })
      .catch((errorInfo) => {});
  };

  deleteRecord = (record) => {
    recordDeletePost(record.id, {}, () => {
      this.indexQuery();
    });
  };

  recordTypeChangeToText = (record) => {
    let { recordTypeList } = this.state;
    let type_text;
    console.log(record);
    console.log(recordTypeList);

    recordTypeList.map((list, index) => {
      list.name === record && (type_text = list.viewName);
    });
    return type_text;
  };

  // ??????
  onSearch = (params) => {
    console.log(params);
    let kId = this.get_kId();
    // if (params.params.time) {
    searchQuery(
      {
        startTime: moment(params.time[0]).format('YYYY/MM/DD'),
        endTime: moment(params.time[1]).format('YYYY/MM/DD'),
        kId: kId,
      },
      (logList) => {
        console.log(logList);
        this.setState({
          logList,
        });
      },
    );
    // }
  };

  // ?????????????????????table?????????
  openChange = (open) => {
    if (this.tableBoxRef) {
      this.tableBoxRef.setHeight();
    }
  };

  render() {
    let { dateInfo, logList, addModal_isVisible } = this.state;
    return (
      <>
        <div className={styles.keyPersonPage}>
          <div className={styles.editArea}>
            <Search
              onSearch={this.onSearch}
              openChange={() => this.openChange()}
            />
            <div
              className={styles.funtionButtonArea}
              style={{ textAlign: 'center' }}
            >
              <h1>
                {`?????????${moment(dateInfo).format('YYYY')}??? ${moment(
                  dateInfo,
                ).format('M')}??? ${moment(dateInfo).format('D')}????????????`}
              </h1>
              <Button onClick={this.addModalChange} type="primary">
                ????????????
              </Button>
            </div>
            <div className={styles.logList}>
              {logList.length > 0 ? (
                logList.map((record, index) => {
                  return (
                    <div key={index} className={styles.record}>
                      <div className={styles.record_number}>
                        <div className={styles.number_square}>{index + 1}</div>
                      </div>
                      <div className={styles.record_content}>
                        <p>{record.title}</p>
                        <p>{record.mainInfo}</p>
                        <p>
                          ????????????:
                          {this.recordTypeChangeToText(record.recordType)}
                        </p>
                        <p>????????????:{record.details}</p>
                        <p>
                          ????????????:
                          {moment(record.createTime).format(
                            'YYYY-MM-DD HH:mm:ss',
                          )}
                        </p>
                      </div>
                      <Button
                        onClick={this.deleteRecord.bind(this, record)}
                        type="text"
                        danger
                      >
                        ??????
                      </Button>
                    </div>
                  );
                })
              ) : (
                <div className={styles.record_noInfo}>????????????</div>
              )}
            </div>
            {/* <TextArea
              showCount
              maxLength={100}
              style={{ height: 120 }}
              onChange={onChange}
              autoSize={{ minRows: 30, maxRows: 40 }}
            /> */}
          </div>
          <div className={styles.calender}>
            <Calendar
              fullscreen={false}
              onPanelChange={onPanelChange}
              onSelect={this.dateChange}
            />
          </div>
          <Modal
            title="????????????"
            visible={addModal_isVisible}
            closable={false}
            width={1000}
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
                // loading={loading}
                onClick={() => {
                  this.addRecord_confirm();
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
        </div>
      </>
    );
  }
}
