import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';
import { NavBar } from 'antd-mobile';
import { request } from '@/request';
import { history } from 'umi';

export default function Charts() {
  const [data, setData] = useState([]);
  const accountMap = new Map();

  useEffect(() => {
    request.get(`/account/list${window.location.search}`).then((res) => {
      res.body?.forEach((item) => {
        const data = accountMap.get(item.typeId);
        if (data) {
          accountMap.set(item.typeId, {
            type: item.type,
            account: +data.account + +item.account,
          });
        } else {
          accountMap.set(item.typeId, {
            type: item.type,
            account: +item.account,
          });
        }
      });
      const col = Array.from(accountMap).map((item) => {
        return {
          type: item[1].type,
          sum: item[1].account,
        };
      });
      setData(col.sort((a, b) => b.sum - a.sum));
    });
  }, []);

  const config = {
    data,
    xField: 'type',
    yField: 'sum',
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '类别',
      },
      sales: {
        alias: '销售额',
      },
    },
    minColumnWidth: 10,
    maxColumnWidth: 10,
  };

  return (
    <>
      <NavBar onBack={() => history.goBack()}>统计</NavBar>
      <Column {...config} />
    </>
  );
}
