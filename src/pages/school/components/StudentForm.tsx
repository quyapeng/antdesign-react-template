import React, { useEffect, useRef, memo, useState } from 'react';
import {
  ModalForm,
  ProFormDatePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import { STATUS, SEX } from '@/constant';
import { Form, Input, Space } from 'antd';

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
  const [OPTION, setOption] = useState({});
  const RELATION = useRef('FATHER');
  //

  useEffect(() => {
    if (values.id) {
      formRef?.current?.setFieldsValue(values);
    }
  }, [visible]);
  useEffect(() => {
    //
  }, [formRef?.current?.getFieldValue('schoolId')]);
  const onChange = async (e: any, option: any) => {
    console.log(e, option);
    if (e) {
      setOption(option);
    }
  };
  const changeDate = async (e: any) => {
    console.log(e);
    console.log(OPTION);
  };
  useEffect(() => {
    //
    console.log('orderDate', OPTION);
  }, [formRef?.current?.getFieldValue('orderDate')]);

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
        label="园所名称"
        name="schoolId"
        placeholder="请选择园所名称"
        request={async () => schoolData}
        rules={[
          {
            required: true,
            message: '请选择园所名称',
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
        placeholder="请输入学生姓名"
        rules={[
          {
            required: true,
            message: '请输入学生姓名',
          },
        ]}
        label="学生姓名"
        width="md"
      />
      <ProFormDatePicker
        name="birthday"
        placeholder="请选择学生生日"
        rules={[
          {
            required: true,
            message: '请选择学生生日',
          },
        ]}
        label="学生生日"
        width="md"
      />
      <ProFormRadio.Group
        name="sex"
        label="性别"
        rules={[
          {
            required: true,
            message: '请选择性别',
          },
        ]}
        options={SEX}
      />

      <Form.Item style={{ transform: 'translateX(145px)' }}>
        {/* parents */}
        <Form.List name="FATHER">
          {() => (
            <>
              {[{ fieldKey: 0, isListField: true, key: 0, name: 0 }].map((field) => (
                <Space key={field.key} align="baseline">
                  <Form.Item
                    label="爸爸"
                    labelAlign="right"
                    name={[field.name, 'name']}
                    labelCol={{ xs: { span: 24 }, sm: { span: 6 } }}
                    wrapperCol={{ xs: { span: 24 }, sm: { span: 14 } }}
                  >
                    <Input placeholder={`请输入爸爸姓名`} style={{ width: '140px' }} />
                  </Form.Item>
                  <Form.Item name={[field.name, 'mobile']}>
                    <Input placeholder={`请输入爸爸手机号`} style={{ width: '180px' }} />
                  </Form.Item>
                  <Form.Item name={[field.name, 'relation']}>
                    <Input value={'RELATION'} hidden />
                  </Form.Item>
                </Space>
              ))}
            </>
          )}
        </Form.List>
      </Form.Item>

      <ProFormSelect
        label="课程产品"
        placeholder="请选择课程产品"
        name="productId"
        request={async () => productData}
        rules={[
          {
            required: true,
            message: '请选择课程产品',
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
        placeholder="请选择开始日期"
        rules={[
          {
            required: true,
            message: '请选择开始日期',
          },
        ]}
        fieldProps={{
          onChange: async (e) => changeDate(e),
        }}
        label="开始日期"
        width="md"
      />
      <ProFormDatePicker initialValue={endDate} disabled label="结束日期" width="md" />
    </ModalForm>
  );
};

export default memo(StudentForm);
