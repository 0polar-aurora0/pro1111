/*
 * @Author: fuzhenghao
 * @Date: 2022-04-22 18:14:12
 * @LastEditTime: 2022-04-25 23:22:40
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\pages\mainPage\staffManager\analysisDataPage\index.tsx
 */

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
import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Line } from '@ant-design/plots';
import { querylineChartData } from './service';

export default (props) => {
  const [data, setData] = useState([]);
  console.log(props.kId);

  const asyncFetch = () => {
    querylineChartData({ kId: props.kId, isWeekly: false }, (json) => {
      setData(json);
    });
  };

  useEffect(() => {
    asyncFetch();
  }, []);

  const config = {
    data,
    xField: 'changedTime',
    yField: 'changedLocationSize',
    seriesField: 'changedType',
    xAxis: {
      type: 'time',
    },
    yAxis: {
      label: {
        // 数值格式化为千分位
        formatter: (v) =>
          `${v}`.replace(/\d{1,2}(?=(\d{2})+$)/g, (s) => `${s},`),
      },
      // type: 'changedLocationSize',
    },
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          props.goToPersonListPage();
        }}
      >
        返回
      </Button>
      <Line className={styles.lineChart} {...config} />
    </>
  );
};
