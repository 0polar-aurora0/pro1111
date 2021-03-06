/*
 * @Author: fuzhenghao
 * @Date: 2022-04-22 15:17:25
 * @LastEditTime: 2022-04-22 15:18:23
 * @LastEditors: fuzhenghao
 * @Description: 
 * @FilePath: \pro1111\src\components\SearchBox\index.js
 */

'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Row, Col } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

export default class SearchBox extends React.Component {
  static propTypes = {
    hideSwitch: PropTypes.bool,
    defaultOpen: PropTypes.bool,
    openChange: PropTypes.func,
  };
  static defaultProps = {
    hideSwitch: false,
    defaultOpen: false, //默认状态
    openChange: Function.prototype,
  };

  constructor(props) {
    super(props);
    const { defaultOpen } = props;
    this.state = {
      open: props.defaultOpen,
      title: defaultOpen ? '收起' : '展开',
    };
  }

  // 开关
  setOpen = () => {
    this.setState(
      {
        open: !this.state.open,
        title: !this.state.open ? '收起' : '展开',
      },
      () => {
        this.props.openChange(!this.state.open);
      },
    );
  };

  render() {
    const { className, hideSwitch, TopItem, Btn, title, children } = this.props;

    return (
      <div className={classNames(classNames, styles.box)}>
        <div className={styles.box_top}>
          <div className={styles.box_l}>
            <div className={styles.inner}>
              {TopItem}
              {this.state.open ? <div>{children}</div> : null}
            </div>
          </div>
          <div className={styles.box_r}>
            {Btn}
            {!hideSwitch ? (
              <div className={styles.btn} onClick={this.setOpen}>
                {this.state.open ? <Icon type="up" /> : <Icon type="down" />}
                <span>{this.state.title}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
