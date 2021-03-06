import React, { useEffect, useRef, memo, useState } from 'react';
import { ModalForm, ProFormDatePicker, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import dayjs from 'dayjs';

export type UpdateProps = {
  type: string;
  title: string;
  visible: boolean;
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: any) => Promise<void>;
  values: Partial<any>;
  productData: [];
};

export type FormValueType = {};

const OrderForm: React.FC<UpdateProps> = ({
  type,
  title,
  visible,
  onCancel,
  onSubmit,
  values,
  productData,
}: any) => {
  const formRef = useRef<ProFormInstance>();
  const [endDate, setEndDate] = useState('');
  const [OPTION, setOption]: any = useState({});
  const [orderDate, setOrderDate] = useState('');

  useEffect(() => {
    if (values.id) {
      formRef?.current?.setFieldsValue(values);
      setOption(values.product);
      foramtProductDate(values.orderStartDate, values.product);
    } else {
      formRef?.current?.resetFields();
      setEndDate('');
    }
  }, [visible]);
  useEffect(() => {
    if (OPTION) {
      foramtProductDate(orderDate, OPTION);
    }
  }, [OPTION]);
  const onChange = async (e: any, option: any) => {
    setOption(e ? option : {});
  };
  const changeDate = async (e: any) => {
    setOrderDate(e || '');
  };
  useEffect(() => {
    if (orderDate) {
      foramtProductDate(orderDate, OPTION);
    } else {
      setEndDate('');
    }
  }, [orderDate]);
  const foramtProductDate = async (orderDate: string, OPTION: any) => {
    if (!orderDate) return;
    const TYPE_UNIT = {
      YEAR: 'years',
      MONTH: 'months',
      DAY: 'days',
    };
    const { quantity, unit } = OPTION;
    if (unit && quantity) {
      const newDate = dayjs(orderDate).add(quantity, TYPE_UNIT[unit]);
      setEndDate(dayjs(newDate).format('YYYY-MM-DD'));
    }
  };

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
      onFinish={async (value: any) => {
        const id = type == 'new' ? {} : { id: values.id };
        onSubmit(Object.assign({ ...id, ...value }));
      }}
      modalProps={{
        onCancel: () => onCancel(),
      }}
    >
      <ProFormSelect
        label="????????????"
        placeholder="?????????????????????"
        name="productId"
        request={async () => productData}
        rules={[
          {
            required: true,
            message: '?????????????????????',
          },
        ]}
        fieldProps={{
          fieldNames: {
            label: 'name',
            value: 'id',
            date: 'date',
          },
          onChange: async (e, option) => onChange(e, option),
        }}
        width="md"
      />
      <ProFormDatePicker
        name="orderStartDate"
        placeholder="?????????????????????"
        rules={[
          {
            required: true,
            message: '?????????????????????',
          },
        ]}
        fieldProps={{
          onChange: async (e) => changeDate(e),
          disabledDate: (current: any) => {
            return current && current <= dayjs().endOf('day');
          },
        }}
        label="????????????"
        width="md"
      />
      <ProFormText
        disabled
        fieldProps={{ value: endDate, placeholder: '????????????' }}
        label="????????????"
        width="md"
      />
    </ModalForm>
  );
};

export default memo(OrderForm);
