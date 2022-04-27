/*
 * @Author: fuzhenghao
 * @Date: 2022-02-28 22:55:28
 * @LastEditTime: 2022-04-27 13:53:59
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\pages\keyPersonEditPage\layouts\index.tsx
 */
import React, { Component } from 'react';
import { Layout, Button, Breadcrumb } from 'antd';
import styles from './index.less';
import logo_pic from '@/assets/images/logo_pic.png';
import { TeamOutlined } from '@ant-design/icons';
import { history } from 'umi';
import routes from 'config/routes';

const { Header, Content, Footer } = Layout;

export default class sliderPage extends Component {
  logOut = () => {
    //清空缓存
    localStorage.removeItem('police_account');
    localStorage.removeItem('keyPerson_account');
    history.push('/index');
  };

  goto_personInfoModification = () => {
    history.push('/keyPersonEditPage/personInfoModification');
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ height: '64px', background: '#fff', padding: 0 }}>
          <div className={styles.logo}>
            <img src={logo_pic}></img>
          </div>

          <div className={styles.functionArea}>
            <Button onClick={this.goto_personInfoModification} type="link">
              个人资料修改
            </Button>
            <Button onClick={this.logOut} type="link">
              登出
            </Button>
          </div>
        </Header>

        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>日历登记</Breadcrumb.Item>
          </Breadcrumb>
          <div className={styles.keyPersonPage_layout}>
            {this.props.children}
          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>重要人员管理系统</Footer> */}
      </Layout>
    );
  }
}
