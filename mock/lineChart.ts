/*
 * @Author: fuzhenghao
 * @Date: 2022-04-22 18:53:23
 * @LastEditTime: 2022-04-27 00:05:39
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\mock\lineChart.ts
 */
import mockjs from 'mockjs';

export default {
  // 'Post /local/v1/record/analyzer': mockjs.mock({
  //   code: 200,
  //   'data|100': [
  //     {
  //       'id|+1': 1,
  //       changedLocation: '@county(true)',
  //       'changedType|1': [0, 1],
  //       changedTime: '@datetime',
  //     },
  //   ],
  // }),

  'Post /local/v1/record/analyzer': mockjs.mock({
    code: 200,
    data: [
      {
        'changedLocation|1-10': ['@county(true)'],
        'changedLocationSize|1-100': 100,
        'changedType|1': ['0', '1'],
        // changedTime: '@date',
        'changedTime|1': '1999-04-01',
      },
      {
        'changedLocation|1-10': ['@county(true)'],
        'changedLocationSize|1-100': 100,
        'changedType|1': ['0', '1'],
        // changedTime: '@date',
        'changedTime|1': '1999-04-02',
      },
      {
        'changedLocation|1-10': ['@county(true)'],
        'changedLocationSize|1-100': 100,
        'changedType|1': ['0', '1'],
        // changedTime: '@date',
        'changedTime|1': '1999-04-04',
      },
      {
        'changedLocation|1-10': ['@county(true)'],
        'changedLocationSize|1-100': 100,
        'changedType|1': ['0', '1'],
        // changedTime: '@date',
        'changedTime|1': '1999-04-06',
      },
      {
        'changedLocation|1-10': ['@county(true)'],
        'changedLocationSize|1-100': 100,
        'changedType|1': ['0', '1'],
        // changedTime: '@date',
        'changedTime|1': '1999-04-08',
      },
      {
        'changedLocation|1-10': ['@county(true)'],
        'changedLocationSize|1-100': 100,
        'changedType|1': ['0', '1'],
        // changedTime: '@date',
        'changedTime|1': '1999-04-10',
      },
      {
        'changedLocation|1-10': ['@county(true)'],
        'changedLocationSize|1-100': 100,
        'changedType|1': ['0', '1'],
        // changedTime: '@date',
        'changedTime|1': '1999-04-12',
      },
      {
        'changedLocation|1-10': ['@county(true)'],
        'changedLocationSize|1-100': 100,
        'changedType|1': ['0', '1'],
        // changedTime: '@date',
        'changedTime|1': '1999-04-13',
      },
      {
        'changedLocation|1-10': ['@county(true)'],
        'changedLocationSize|1-100': 100,
        'changedType|1': ['0', '1'],
        // changedTime: '@date',
        'changedTime|1': '1999-04-17',
      },
    ],
  }),
};
