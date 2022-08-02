import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, message, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { commonRequestList } from '@/utils/index';
import { Message } from '@/constant/common';

import { getRecipeDetail } from '@/services/school';
import { useParams, useRequest } from 'umi';
import TabPane from '@ant-design/pro-card/lib/components/TabPane';
import TableMeal from './components/TableMeal';

const mealDetail: React.FC = () => {
  const [currentRow, setCurrentRow]: any = useState();

  const params: any = useParams();
  useEffect(() => {
    console.log('mealDetail');
    getRecipeDetail(params.id).then((res) => {
      setCurrentRow(res.data);
    });
  }, [params]);

  const columns: ProColumns & { editable?: boolean }[] = [
    {
      title: '餐次',
      dataIndex: 'meal',
      hideInSearch: true,
      width: '80px',
      render: (_: any, record: any) => <>{record?.meal?.name}</>,
    },
    {
      title: '周一',
      dataIndex: 'mondayData',
      editable: true,
      hideInSearch: true,
    },

    {
      title: '周二',
      dataIndex: 'tuesdayData',
      editable: true,
      hideInSearch: true,
    },
    {
      title: '周三',
      dataIndex: 'wednesdayData',
      editable: true,
      hideInSearch: true,
    },
    {
      title: '周四',
      dataIndex: 'thursdayData',
      editable: true,
      hideInSearch: true,
    },
    {
      title: '周五',
      dataIndex: 'fridayData',
      editable: true,
      hideInSearch: true,
    },
    {
      title: '周六',
      dataIndex: 'sta',
      hideInSearch: true,
    },
    {
      title: '周日',
      dataIndex: 'sun',
      hideInSearch: true,
    },
  ];
  return (
    <div>
      {currentRow?.year}年
      <Tabs defaultActiveKey="1" tabPosition="left">
        {currentRow?.details?.map((i: any) => (
          <TabPane tab={`第${i.week}周`} key={i.week} style={{ height: '600px', overflow: 'auto' }}>
            <TableMeal
              columns={columns}
              data={i.schoolRecipes}
              values={i}
              onSubmit={async (value: any) => {
                console.log(value);
              }}
              onCancel={() => {}}
            />
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default mealDetail;
