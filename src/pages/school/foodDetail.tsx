import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { useEffect } from 'react';
import ProTable from '@ant-design/pro-table';
import { commonRequestList } from '@/utils/index';
import { Message } from '@/constant/common';

import { getCalendarDetail } from '@/services/school';
import { useParams } from 'umi';

const foodDetail: React.FC = () => {
  useEffect(() => {
    //
  }, []);
  const params: any = useParams();
  useEffect(() => {
    console.log('foodDetail');
    // getCalendarDetail(params.id);
  }, [params]);

  return <div></div>;
};

export default foodDetail;
