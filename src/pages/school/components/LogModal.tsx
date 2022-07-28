import { ModalForm } from '@ant-design/pro-form';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import React, { memo } from 'react';

export type CityFormProps = {
  type: string;
  title: string;
  visible: boolean;
  onCancel: (flag?: boolean, formVals?: any) => void;
  onSubmit: (values: any) => Promise<void>;
  values: Partial<any>;
};

const LogModal: React.FC<CityFormProps> = ({
  type,
  title,
  values,
  visible,
  onSubmit,
  onCancel,
}: any) => {
  const columns: ProColumns[] = [
    {
      title: '延期原因',
      dataIndex: 'reason',
      hideInSearch: true,
    },
    {
      title: '具体事由',
      dataIndex: 'remark',
      hideInSearch: true,
    },
    {
      title: '延期天数',
      dataIndex: 'extendDays',
      hideInSearch: true,
    },
    {
      title: '合同原结束时间',
      dataIndex: 'lastEndDate',
      hideInSearch: true,
    },
    {
      title: '合同新结束日期',
      dataIndex: 'newEndDate',
      hideInSearch: true,
      // render: (_, record) => <>{record?.endDate}</>,
    },
  ];
  return (
    <ModalForm
      title={title}
      visible={visible}
      onVisibleChange={() => {}}
      {...{
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      }}
      layout="horizontal"
      onFinish={async () => onCancel()}
      modalProps={{
        onCancel: () => onCancel(),
      }}
    >
      <ProTable<any>
        rowKey="id"
        columns={columns}
        dataSource={values.data}
        toolbar={{
          actions: [],
          settings: [],
        }}
      />
    </ModalForm>
  );
};

export default memo(LogModal);
