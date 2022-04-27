/*
 * @Author: fuzhenghao
 * @Date: 2022-04-26 15:00:01
 * @LastEditTime: 2022-04-26 17:40:42
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\pages\mainPage\staffManager\importModal\index.tsx
 */
import React, { Component } from 'react';
import { Upload, Button, message, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { staffFilesImport } from '@/commonService';

export default class index extends Component {
  state = {
    fileList: [],
    uploading: true,
  };
  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      console.log(file);
      formData.append('file', file);
    });
    this.setState({
      uploading: true,
    });
    console.log(fileList);
    console.log(formData);

    // You can use any AJAX library you like
    // fetch('https://wfileww.mocky.io/v2/5cc8019d300000980a055e76', {
    //   method: 'POST',
    //   body: formData,
    // })
    //   .then((res) => res.json())
    //   .then(() => {
    //     this.setState({
    //       fileList: [],
    //     });
    //     message.success('upload successfully.');
    //   })
    //   .catch(() => {
    //     message.error('upload failed.');
    //   })
    //   .finally(() => {
    //     this.setState({
    //       uploading: false,
    //     });
    //   });

    //获取警员id
    let createId = JSON.parse(
      localStorage.getItem('police_account'),
    )?.policeNumber;
    formData.append('createId', createId);
    staffFilesImport(formData, (res) => {
      console.log(res);
      message.success('导入成功');
    });
  };

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        console.log(file.type);
        const isExcel = file.type === 'application/vnd.ms-excel';
        if (!isExcel) {
          message.error(
            `${file.name} 不是一个execl文件，请重新检查文件类型，并仔细阅读要求`,
          );
        } else {
          this.setState((state) => ({
            fileList: [...state.fileList, file],
          }));
        }
        // return isPNG || Upload.LIST_IGNORE;

        return false;
      },
      fileList,
    };
    return (
      <div>
        <Row>
          <Col span={22}>1、文件必须采用excel格式，文件大小不得超过2MB</Col>
        </Row>
        <Row>
          <Col span={22}>
            {' '}
            2、文件需符合
            <p style={{ display: 'inline', color: 'blue' }}>样例需求</p>规范
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            {' '}
            2、文件最多上传
            <p style={{ display: 'inline', color: 'blue' }}>3</p>个
          </Col>
        </Row>
        <Row>
          <Col span={22}>4、数据的导入时间可能比较长，请耐心等候......</Col>
        </Row>

        <Upload {...props} maxCount={3} multiple>
          <Button icon={<UploadOutlined />}>选择文件</Button>
        </Upload>
      </div>
    );
  }
}
