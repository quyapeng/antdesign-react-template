import React, { useEffect, useRef, memo, useState } from 'react';
import {
  ModalForm,
  ProFormDatePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import { SEX } from '@/constant';
import { Form, Input, Space } from 'antd';
import dayjs from 'dayjs';

export type UpdateProps = {
  type: string;
  title: string;
  visible: boolean;
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: any) => Promise<void>;
  values: Partial<any>;
  schoolData: [];
  productData: [];
};

export type FormValueType = {};

const styleH = { marginBottom: '0', height: '32px' };
const styleT = { transform: 'translateX(142px)' };
const StudentForm: React.FC<UpdateProps> = ({
  type,
  title,
  visible,
  onCancel,
  onSubmit,
  values,
  schoolData,
  productData,
}: any) => {
  const formRef = useRef<ProFormInstance>();
  const [endDate, setEndDate] = useState('');
  const [OPTION, setOption]: any = useState({});
  const [orderDate, setOrderDate] = useState('');

  useEffect(() => {
    if (values.id) {
      const obj = {};
      values.user.parents.map((i: any) => {
        obj[i.relation] = [i];
      });
      console.log(obj);
      const params = Object.assign(values, obj);
      formRef?.current?.setFieldsValue(params);
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

  const setSubmitValues = (value: any) => {
    value.parents = [];
    if (value.MOTHER && value.MOTHER.length > 0 && value.MOTHER[0].name && value.MOTHER[0].mobile) {
      value.parents.push({ relation: 'MOTHER', ...value.MOTHER[0] });
      delete value.MOTHER;
    }
    if (value.FATHER && value.FATHER.length > 0 && value.FATHER[0].name && value.FATHER[0].mobile) {
      value.parents.push({ relation: 'FATHER', ...value.FATHER[0] });
      delete value.FATHER;
    }
    return value;
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
        onSubmit(Object.assign({ ...id, ...setSubmitValues(value) }));
      }}
      modalProps={{
        onCancel: () => onCancel(),
      }}
    >
      <ProFormSelect
        label="????????????"
        name="schoolId"
        disabled={type == 'edit'}
        placeholder="?????????????????????"
        request={async () => schoolData}
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
          },
        }}
        width="md"
      />
      <ProFormText
        name="name"
        placeholder="?????????????????????"
        rules={[
          {
            required: true,
            message: '?????????????????????',
          },
        ]}
        label="????????????"
        width="md"
      />
      <ProFormDatePicker
        name="birthday"
        placeholder="?????????????????????"
        rules={[
          {
            required: true,
            message: '?????????????????????',
          },
        ]}
        label="????????????"
        width="md"
      />
      <ProFormRadio.Group
        name="sex"
        label="??????"
        rules={[
          {
            required: true,
            message: '???????????????',
          },
        ]}
        options={SEX}
      />

      <Form.Item style={styleT}>
        <Form.List name="FATHER">
          {() => (
            <>
              {[{ fieldKey: 0, isListField: true, key: 0, name: 0 }].map((field) => (
                <Space key={field.key} align="baseline" style={styleH}>
                  <Form.Item
                    label="??????"
                    labelAlign="right"
                    name={[field.name, 'name']}
                    labelCol={{ xs: { span: 24 }, sm: { span: 6 } }}
                    wrapperCol={{ xs: { span: 24 }, sm: { span: 14 } }}
                  >
                    <Input placeholder={`?????????????????????`} style={{ width: '140px' }} allowClear />
                  </Form.Item>
                  <Form.Item name={[field.name, 'mobile']}>
                    <Input placeholder={`????????????????????????`} style={{ width: '184px' }} allowClear />
                  </Form.Item>
                </Space>
              ))}
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item style={styleT}>
        <Form.List name="MOTHER">
          {() => (
            <>
              {[{ fieldKey: 0, isListField: true, key: 0, name: 0 }].map((field) => (
                <Space key={field.key} align="baseline" style={styleH}>
                  <Form.Item
                    label="??????"
                    labelAlign="right"
                    name={[field.name, 'name']}
                    labelCol={{ xs: { span: 24 }, sm: { span: 6 } }}
                    wrapperCol={{ xs: { span: 24 }, sm: { span: 14 } }}
                  >
                    <Input placeholder={`?????????????????????`} style={{ width: '140px' }} allowClear />
                  </Form.Item>
                  <Form.Item name={[field.name, 'mobile']}>
                    <Input placeholder={`????????????????????????`} style={{ width: '184px' }} allowClear />
                  </Form.Item>
                </Space>
              ))}
            </>
          )}
        </Form.List>
      </Form.Item>
      {type == 'new' ? (
        <>
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
            name="orderDate"
            placeholder="?????????????????????"
            rules={[
              {
                required: true,
                message: '?????????????????????',
              },
            ]}
            fieldProps={{
              onChange: async (e) => changeDate(e),
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
        </>
      ) : null}
    </ModalForm>
  );
};

export default memo(StudentForm);
