/*
 * @Author: fuzhenghao
 * @Date: 2022-02-28 22:55:28
 * @LastEditTime: 2022-03-05 00:13:30
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\pages\mainPage\staffManager\staffManagerController\index.tsx
 */
import React, { Component } from 'react';
import { Layout, Tree } from 'antd';
import StaffManager from '../index.tsx';
import { treeListQuery } from '@/commonService';
import styles from './index.less';

const { Content, Sider } = Layout;

export default class IndexPage extends Component {
  state = {
    collapsed: false,
    treeListData: [],
    localSelectNode: null,
  };

  componentDidMount() {
    treeListQuery({}, (data) => {
      let treeListData = [
        {
          title: '全部',
          key: 'all',
        },
      ];
      data.map((value, index) => {
        (value.key = value.name), (value.title = value.viewName);
      });
      treeListData[0].children = data;
      this.setState({
        treeListData,
      });
      console.log(treeListData);
    });
  }

  selectTreeNode = (selectTreeNode, e) => {
    console.log(selectTreeNode);
    console.log(e);
    this.setState(
      {
        localSelectNode: selectTreeNode[0],
      },
      () => {
        this.child.indexQuery();
      },
    );
  };

  render() {
    let { treeListData, localSelectNode } = this.state;

    return (
      <Layout style={{ height: '100%' }}>
        <Sider
          style={{ padding: '20px' }}
          theme="light"
          breakpoint="lg"
          collapsedWidth="0"
        >
          <Tree onSelect={this.selectTreeNode} treeData={treeListData} />
        </Sider>
        <Content
          style={{
            margin: '0 16px',
            backgroundColor: 'white',
            padding: '20px',
          }}
        >
          <StaffManager
            onRef={(ref) => {
              this.child = ref;
            }}
            localSelectNode={localSelectNode}
          />
        </Content>
      </Layout>
    );
  }
}
