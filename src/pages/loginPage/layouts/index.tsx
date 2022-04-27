/*
 * @Author: fuzhenghao
 * @Date: 2022-03-01 01:59:41
 * @LastEditTime: 2022-04-27 13:45:35
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\pages\loginPage\layouts\index.tsx
 */
import React, { Component } from 'react';
import { Layout } from 'antd';

import { HomeOutlined, ExperimentOutlined } from '@ant-design/icons';
import logo_pic from '@/assets/images/logo_pic.png';
import styles from './index.less';

const { Header, Content, Footer } = Layout;

export default class index extends Component {
  render() {
    return (
      <div className={styles.loginPage_layout}>
        <Layout>
          <Header className={styles.loginPage_layout_top}>
            <div>
              <img src={logo_pic}></img>
            </div>
            <div className={styles.layout_func}>
              <div>
                <HomeOutlined />
                <p>设为首页</p>
              </div>
              <div>
                <ExperimentOutlined />
                <p>功能暂未开放</p>
              </div>
            </div>
          </Header>
          <Content className={styles.loginPage_layout_conatin}>
            {this.props.children}
          </Content>
          {/* <Footer className={styles.loginPage_layout_bottom}>、
            <p>项目内容:社区重点人口管理系统</p>
          </Footer> */}
        </Layout>
      </div>
    );
  }
}
