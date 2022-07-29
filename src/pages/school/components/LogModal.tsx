import { ModalForm } from '@ant-design/pro-form';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Modal } from 'antd';
import React, { memo } from 'react';

export type CityFormProps = {
  type: string;
  title: string;
  visible: boolean;
  onCancel: (flag?: boolean, formVals?: any) => void;
  onSubmit: (values: any) => Promise<void>;
  values: Partial<any>;
};

const LogModal: React.FC<CityFormProps> = ({ title, values, visible, onCancel }: any) => {
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
    },
  ];
  return (
    <Modal title={title} visible={visible} onOk={onCancel} onCancel={onCancel} width={'800px'}>
      <ProTable<any>
        rowKey="id"
        columns={columns}
        dataSource={values.data}
        toolBarRender={false}
        search={false}
      />
    </Modal>
  );
};

export default memo(LogModal);
