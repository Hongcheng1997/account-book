import React, { RefObject, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Form,
  Input,
  Button,
  NavBar,
  DatePicker,
  Cascader,
  TextArea,
  Toast,
} from 'antd-mobile';
import { history } from 'umi';
import { request } from '@/request';
import dayjs from 'dayjs';
import type { DatePickerRef } from 'antd-mobile/es/components/date-picker';
import styles from './index.less';

export default function Login() {
  const [type, setType] = useState();
  const [total, setTotal] = useState();
  const query = useQuery({
    queryKey: [],
    queryFn: () => request('/expenseType/list'),
  });
  const getTotalAmount = async () => {
    const data = await request('/account/getTotalAmount', {
      params: {
        startTime: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-01`,
        endTime: `${new Date().getFullYear()}-${new Date().getMonth() + 2}-01`,
      },
    });
    setTotal(data.body?.total);
  };

  const onFinish = (values) => {
    const { date, account, remark } = values;
    request.post('/account/create', {
      params: {
        date: dayjs(date).format('YYYY-MM-DD'),
        account,
        remark,
        typeId: values.type.pop(),
      },
    });
    Toast.show({
      content: '提交成功',
    });
  };

  useEffect(() => {
    getTotalAmount();
  }, []);

  return (
    <div>
      <NavBar
        onBack={() => history.goBack()}
        right={<span onClick={() => history.push('accountList')}>账单</span>}
      />
      <h1 className={styles.total}>当月消费: {total}</h1>
      <Form
        layout="horizontal"
        onFinish={onFinish}
        footer={
          <Button block type="submit" color="primary" size="large">
            提交
          </Button>
        }
      >
        <Form.Item
          name="date"
          label="日期"
          rules={[{ required: true, message: '日期不能为空' }]}
          trigger="onConfirm"
          onClick={(e, datePickerRef: RefObject<DatePickerRef>) => {
            datePickerRef.current?.open();
          }}
        >
          <DatePicker>
            {(value) =>
              value ? dayjs(value).format('YYYY-MM-DD') : '请选择日期'
            }
          </DatePicker>
        </Form.Item>
        <Form.Item
          name="type"
          label="类型"
          rules={[{ required: true, message: '类型不能为空' }]}
          trigger="onConfirm"
          onClick={(e, Ref: RefObject<DatePickerRef>) => {
            Ref.current?.open();
          }}
        >
          <Cascader
            options={query.data?.body}
            value={type}
            onConfirm={(v) => setType(v)}
            onSelect={(val, extend) => {
              console.log('onSelect', val, extend.items);
            }}
          >
            {(items) => {
              if (items.every((item) => item === null)) {
                return '请选择类型';
              } else {
                return items.map((item) => item?.label ?? '未选择').join('-');
              }
            }}
          </Cascader>
        </Form.Item>
        <Form.Item
          name="account"
          label="金额"
          rules={[{ required: true, message: '金额不能为空' }]}
        >
          <Input placeholder="请输入金额" />
        </Form.Item>
        <Form.Item name="remark" label="备注">
          <TextArea
            placeholder="请输入地址"
            maxLength={100}
            rows={2}
            showCount
          />
        </Form.Item>
      </Form>
    </div>
  );
}
