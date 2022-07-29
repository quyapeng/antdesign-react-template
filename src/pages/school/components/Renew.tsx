import React, { useEffect, useRef, memo } from 'react';
import { ModalForm, ProFormDatePicker } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import dayjs from 'dayjs';

export type UpdateProps = {
  title: string;
  visible: boolean;
  onCancel: (flag?: boolean, formVals?: any) => void;
  onSubmit: (values: any) => Promise<void>;
  values: Partial<any>;
};

const Renew: React.FC<UpdateProps> = ({ title, visible, onCancel, onSubmit, values }: any) => {
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {}, [visible]);

  return (
    <ModalForm
      title={title}
      formRef={formRef}
      visible={visible}
      onVisibleChange={() => {}}
      {...{
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      }}
      layout="horizontal"
      onFinish={async () => {
        onSubmit(Object.assign({ id: values.id, ...formRef.current?.getFieldsValue() }));
      }}
      modalProps={{
        onCancel: () => onCancel(),
      }}
    >
      <ProFormDatePicker
        name="endDate"
        placeholder="请选择结束日期"
        rules={[
          {
            required: true,
            message: '请选择结束日期',
          },
        ]}
        fieldProps={{
          disabledDate: (current: any) => {
            return current && current < dayjs(values.startDate).subtract(1, 'day').endOf('day');
          },
        }}
        label="结束日期"
        width="md"
      />
    </ModalForm>
  );
};

export default memo(Renew);
