import { useEffect, useState } from 'react';
import { history } from 'umi';
import { NavBar, List } from 'antd-mobile';
import { request } from '@/request';

export default function AccountList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    request.get('/account/getDateList').then((res) => {
      setList(res.body?.list || []);
    });
  }, []);

  const toDetails = (item) => {
    const date = item.date.split('-');
    const lastDay = new Date(date[0], +date[1], 0).getDate();
    history.push(
      `accountDetails?startTime=${date[0]}-${date[1]}-01&endTime=${date[0]}-${date[1]}-${lastDay}`,
    );
  };

  return (
    <>
      <NavBar onBack={() => history.goBack()}>账单</NavBar>
      <List>
        {list.map((item) => {
          return (
            <List.Item
              description={`¥ ${parseInt(item?.sum)}`}
              clickable
              onClick={() => toDetails(item)}
            >
              {item.date}
            </List.Item>
          );
        })}
      </List>
    </>
  );
}
