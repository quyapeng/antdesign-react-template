import React, { useEffect, useRef, memo, useState } from 'react';
import {
  ModalForm,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
  ProFormCascader,
} from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';

import { roleOperationList } from '@/services/user';
import { useRequest } from 'umi';
import { Message, STATUS_SCHOOL, SCHOOL_TYPE, FRANCH_TYPE } from '@/constant/common';
import { areaList } from '@/services/common';

export type UpdateFormProps = {
  title: string;
  type: string;
  visible: boolean;
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: any) => Promise<void>;
  values: Partial<any>;
  agentData: [];
  salesData: [];
  areaData: [];
};

export type FormValueType = {};

const AddSchoolForm: React.FC<UpdateFormProps> = ({
  title,
  type,
  visible,
  onCancel,
  onSubmit,
  values,
  agentData,
  salesData,
  areaData,
}: any) => {
  // 地区
  // const { data, run } = useRequest(areaList, {
  //   manual: true,
  // });
  console.log('areaData', areaData);
  useEffect(() => {
    // run();
    if (values.id) {
      formRef?.current?.setFieldsValue(values);
    } else {
      formRef?.current?.resetFields();
    }
    // setOptions()
  }, [values]);
  const formRef = useRef<ProFormInstance>();

  const [options, setOptions] = useState<API.Option[]>(areaData);

  const loadData = (selectedOptions: API.Option[]) => {
    console.log('loadData', selectedOptions);
  };

  const onChange = (value: string[], selectedOptions: API.Option[]) => {
    console.log('onChange', value, selectedOptions);
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
        if (values.id) {
          value.id = values.id;
        }
        onSubmit(value);
      }}
      modalProps={{
        onCancel: () => onCancel(),
      }}
    >
      <ProFormText
        name="name"
        label="园所名称"
        rules={[
          {
            required: true,
            message: '请输入园所名称',
          },
        ]}
        width="md"
      />
      <ProFormSelect
        label="园所类型"
        name="type"
        rules={[
          {
            required: true,
            message: '请选择园所类型',
          },
        ]}
        valueEnum={SCHOOL_TYPE}
        fieldProps={{
          fieldNames: {
            label: 'label',
            value: 'value',
          },
        }}
        width="md"
      />
      <ProFormSelect
        label="业务员"
        name="salesId"
        request={async () => salesData}
        rules={[
          {
            required: true,
            message: '请选择业务员',
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
      <ProFormCascader
        label="所在地区"
        name="areaId"
        rules={[
          {
            required: true,
            message: '请选择所在地区',
          },
        ]}
        fieldProps={{
          options,
          fieldNames: {
            label: 'name',
            value: 'id',
          },
          loadData: (e: any) => loadData(e),
          onChange: (e: any, i: any) => onChange(e, i),
          changeOnSelect: true,
        }}
        width="md"
      />
      <ProFormTextArea
        name="address"
        width="md"
        label={'详细地址'}
        placeholder={'请输入详细地址'}
      />
      <ProFormSelect
        label="代理模式"
        name="franchiseType"
        rules={[
          {
            required: true,
            message: '请选择代理模式',
          },
        ]}
        valueEnum={FRANCH_TYPE}
        width="md"
      />
      {/* {franchiseType == ''} */}
      <ProFormSelect
        label="代理商"
        name="agentId"
        request={async () => agentData}
        rules={[
          {
            required: true,
            message: '请选择代理商',
          },
        ]}
        fieldProps={{
          fieldNames: {
            label: 'companyName',
            value: 'id',
          },
        }}
        width="md"
      />
      <ProFormText
        name="monitorDeviceSerial"
        label="监控设备序列号"
        rules={[
          {
            required: true,
            message: '请输入监控设备序列号',
          },
        ]}
        width="md"
      />
      <ProFormText
        name="monitorDeviceValidateCode"
        label="监控设备验证码"
        rules={[
          {
            required: true,
            message: '监控设备验证码',
          },
        ]}
        width="md"
      />
      {/* 合同归档 */}
    </ModalForm>
  );
};

export default memo(AddSchoolForm);
