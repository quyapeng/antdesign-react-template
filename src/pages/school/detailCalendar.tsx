import { Badge, Card, Col, message, Radio, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { Calendar } from 'antd';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import { Message } from '@/constant/common';

import { getCalendarDetail, handleHoliday } from '@/services/school';
import { useParams } from 'umi';
import dayjs from 'dayjs';

const FORMAT = 'YYYY-MM-DD';
const style: any = {
  display: 'inline-block',
  width: '4px',
  height: '4px',
  borderRadius: '50%',
  marginRight: '4px',
  verticalAlign: 'middle',
};

const detailCalendar: React.FC = () => {
  const params: any = useParams();
  const [detail, setDetail] = useState([]);
  const [value, setValue] = useState(0);
  const [current, setCurrent] = useState(dayjs(new Date()).format(FORMAT));
  const onPanelChange = (value: any, mode: CalendarMode) => {
    console.log(value.format(FORMAT), mode);
    getDetail(params.id, value.get('month') + 1);
  };
  const headerRender = ({ value, type, onChange, onTypeChange }: any) => {
    const start = 0;
    const end = 12;
    const monthOptions = [];
    const current = value.clone();
    const localeData = value.localeData();
    const months = [];
    for (let i = start; i < end; i++) {
      current.month(i);
      months.push(localeData.monthsShort(current));
    }
    for (let i = start; i < end; i++) {
      monthOptions.push(
        <Select.Option key={i} value={i} className="month-item">
          {i + 1}月
        </Select.Option>,
      );
    }

    const month = value.month();

    return (
      <div
        style={{
          padding: 8,
        }}
      >
        <Row gutter={8}>
          <Col>
            <Select
              dropdownMatchSelectWidth={false}
              value={month}
              onChange={(newMonth: any) => {
                const now = value.clone().month(newMonth);
                onChange(now);
              }}
            >
              {monthOptions}
            </Select>
          </Col>
        </Row>
      </div>
    );
  };
  const dateFullCellRender = (date: any | undefined) => {
    let list = detail.map((i: any) => i.date);
    const formatDate = dayjs(date).format(FORMAT);
    let show = list.includes(formatDate);
    let newStyle = Object.assign(style, { backgroundColor: show ? '#faad14' : '#52c41a' });
    return (
      <>
        <div
          style={show ? { backgroundColor: '#faad14' } : {}}
          className={'ant-picker-cell-inner ant-picker-calendar-date mycalendar'}
        >
          <div>{dayjs(date).get('date')}</div>
          <div style={{ height: '40px' }}>
            <span style={{ ...newStyle }}></span>
            {show ? '休息' : '上课'}
          </div>
        </div>
      </>
    );
  };
  const onChange = (date: any) => {
    let list = detail.map((i: any) => i.date);
    const formatDate = dayjs(date).format(FORMAT);
    setValue(list.includes(formatDate) ? 1 : 0);
    setCurrent(formatDate);
  };
  const onChangeRadio = (e: any) => {
    const val = e.target.value;
    setValue(val);
    setValueStatus(val);
  };

  const setValueStatus = async (val: any) => {
    //
    let param = {
      schoolCalendarId: params.id,
      date: current,
    };
    console.log(param);
    try {
      const success = await handleHoliday(param);
      if (success) {
        message.success({
          content: Message.Edit,
        });
        setValue(val);
        getDetail(params.id, new Date().getMonth() + 1);
      } else {
        console.log(success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDetail = (id: any, month: any) => {
    getCalendarDetail(id, month).then((res) => {
      setDetail(res.data);
    });
  };
  useEffect(() => {
    getDetail(params.id, new Date().getMonth() + 1);
  }, [params]);

  return (
    <div>
      <Card title="2022" bordered={false}>
        <Row>
          <Col span={18}>
            <Calendar
              onPanelChange={onPanelChange}
              headerRender={headerRender}
              dateFullCellRender={dateFullCellRender}
              onChange={onChange}
            />
          </Col>
          <Col span={6}>
            <Radio.Group
              onChange={onChangeRadio}
              value={value}
              style={{ float: 'right', marginTop: '80px' }}
            >
              <Radio value={0}>上课</Radio>
              <Radio value={1}>休息</Radio>
            </Radio.Group>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default detailCalendar;
