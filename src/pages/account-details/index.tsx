import { useEffect, useState } from 'react';
import { history } from 'umi';
import { NavBar, List } from 'antd-mobile';
import { request } from '@/request';

export default function AccountList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    request.get(`/account/list${window.location.search}`).then((res) => {
      setList(res.body || []);
    });
  }, []);
  return (
    <>
      <NavBar
        onBack={() => history.goBack()}
        right={
          <span onClick={() => history.push(`charts${window.location.search}`)}>
            统计
          </span>
        }
      >
        账单
      </NavBar>
      <List>
        {list.map((item) => {
          return (
            <List.Item
              description={item.date}
              extra={`¥ ${parseInt(item?.account)}`}
            >
              {item.type}
              {item.remark ? `(${item.remark})` : null}
            </List.Item>
          );
        })}
      </List>
    </>
  );
}
