/*
 * @Author: fuzhenghao
 * @Date: 2022-03-01 15:45:34
 * @LastEditTime: 2022-03-01 16:23:08
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\mock\policeManager.ts
 */
import mockjs from 'mockjs';

export default {
  '/api/policeInfo': mockjs.mock({
    code: 200,
    'data|10-100': [
      {
        'id|+1': 1,
        name: '@cname',
        enrollDate: '@date',
        'status|0-1': 1,
        'value|1-100': 50,
        'type|0-2': 1,
        'adjust|1': true,
        portrait: '@image(320x480)',
      },
    ],
  }),
  '/api/policeInfoList': mockjs.mock({
    code: 200,
    data: {
      total: 100,
      'rows|15': [
        {
          'id|+1': 1,
          name: '@cname',
          enrollDate: '@date',
          'status|0-1': 1,
          'value|1-100': 50,
          'type|0-2': 1,
          'adjust|1': true,
          portrait: '@image(320x480)',
        },
      ],
    },
  }),
};

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    status: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    status: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    status: ['cool', 'teacher'],
  },
];
