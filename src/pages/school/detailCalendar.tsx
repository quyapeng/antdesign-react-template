import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, message, Row, Select } from 'antd';
import React, { useEffect } from 'react';
import { Calendar } from 'antd';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import ProTable from '@ant-design/pro-table';
import { commonRequestList } from '@/utils/index';
import { Message } from '@/constant/common';

import { getCalendarDetail } from '@/services/school';
import { useParams } from 'umi';

const detailCalendar: React.FC = () => {
  useEffect(() => {
    //
  }, []);
  const params: any = useParams();
  useEffect(() => {
    console.log('detailCalendar');
    // getCalendarDetail(params.id);
  }, [params]);

  const onPanelChange = (value: any, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
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
    console.log('localeData', current);

    for (let i = start; i < end; i++) {
      monthOptions.push(
        <Select.Option key={i} value={i} className="month-item">
          {i + 1}月
        </Select.Option>,
      );
    }

    const year = value.year();
    const month = value.month();
    const options = [];

    for (let i = year - 10; i < year + 10; i += 1) {
      options.push(
        <Select.Option key={i} value={i} className="year-item">
          {i}
        </Select.Option>,
      );
    }

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
              className="my-year-select"
              value={year}
              onChange={(newYear) => {
                const now = value.clone().year(newYear);
                onChange(now);
              }}
            >
              {options}
            </Select>
          </Col>
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
  return (
    <div>
      <Card title="Card title" bordered={false} style={{ width: '80%', height: '60%' }}>
        <Calendar onPanelChange={onPanelChange} headerRender={headerRender} />
      </Card>
    </div>
  );
};

export default detailCalendar;
