/*
 * @Author: fuzhenghao
 * @Date: 2022-02-28 22:55:28
 * @LastEditTime: 2022-04-27 13:48:13
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\pages\mainPage\layouts\index.tsx
 */
import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import styles from './index.less';
import logo_pic from '@/assets/images/logo_pic.png';
import { TeamOutlined, ToolOutlined } from '@ant-design/icons';
import { history } from 'umi';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

let defaultStartMenu = 0;

export default class sliderPage extends Component {
  state = {
    collapsed: false,
    localMenu: defaultStartMenu,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  logOut = () => {
    //清空缓存
    localStorage.removeItem('police_account');
    localStorage.removeItem('keyPerson_account');
    history.push('/index');
  };

  render() {
    const menuList = [
      {
        content: '其他警员管理',
        route: '/mainPage/policeManager',
        showIcon: <TeamOutlined />,
      },
      {
        content: '重要人员管理',
        route: '/mainPage/staffManager',
        showIcon: <TeamOutlined />,
      },
      // {
      //   content: '个人资料修改',
      //   route: '/mainPage/personInfoModification',
      //   showIcon: <ToolOutlined />,
      // },
    ];

    let { localMenu } = this.state;

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ height: '64px', background: '#fff', padding: 0 }}>
          <div className={styles.logo}>
            <img src={logo_pic}></img>
          </div>

          <div className={styles.functionArea}>
            <Button onClick={this.logOut} type="link">
              登出
            </Button>
          </div>
        </Header>

        <Layout>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <Menu
              theme="dark"
              defaultSelectedKeys={[`${defaultStartMenu}`]}
              mode="inline"
            >
              {menuList.map((item, index) => {
                return (
                  <Menu.Item
                    key={index}
                    onClick={() => {
                      history.push(item.route);
                      this.setState({
                        localMenu: index,
                      });
                    }}
                  >
                    {item.showIcon}
                    <span>{item.content}</span>
                  </Menu.Item>
                );
              })}
            </Menu>
          </Sider>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>{menuList[localMenu].content}</Breadcrumb.Item>
            </Breadcrumb>
            <div
              style={{
                height: 'calc(100% - 124px)',
                background: '#fff',
                minHeight: 360,
              }}
            >
              {this.props.children}
            </div>
            {/* <Footer style={{ textAlign: 'center' }}>重要人员管理系统</Footer> */}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
