import React, { useEffect, useRef, memo, useState } from 'react';
import {
  ModalForm,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
  ProFormUploadButton,
  // ProFormCascader,
} from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';

import { SCHOOL_TYPE, FRANCH_TYPE } from '@/constant/common';
import { areaList } from '@/services/common';
import { Form, Select, Upload } from 'antd';
import { UPLOAD } from '@/constant/common';
import UploadService from '@/services/upload';

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
  const formRef = useRef<ProFormInstance>();
  const [options, setOptions] = useState<API.Option[]>(areaData);
  const [sub, subData] = useState<API.Option[]>([]);
  const [subNext, subNextData] = useState<API.Option[]>([]);
  const [areaCode, setAreaCode] = useState<any>(null);
  const [cityCode, setCityCode] = useState<any>(null);
  const [provinceCode, setProv] = useState<any>(null);
  // file
  const [fileData, setFile] = useState({});
  const [defaultFileList, setFileList]: any = useState([]);
  const style = {
    width: '100px',
    display: 'inline-block',
  };

  const deleteFile = (e: any) => {
    console.log(e);
    // setFile()
  };

  const handleChange: any = ({ fileList, file }: any, type: string) => {
    const { status, response } = file;
    if (status == 'done') {
      fileList[0].url = response.data.url;
    }
    setFileList([...fileList]);
  };

  // 地区
  const getAreaList = (id?: string | number, type?: string) => {
    areaList(id).then((res) => {
      if (type == 'province') {
        // 一级
        setProv(id);
        subData(res);
        subNextData([]);
        setCityCode(null);
        setAreaCode(null);
        formRef?.current?.setFieldsValue({ areaId: null });
      } else if (type == 'city') {
        setCityCode(id);
        subNextData(res);
        setAreaCode(null);
        formRef?.current?.setFieldsValue({ areaId: res && res.length == 0 ? id : null });
      } else if (type == 'area') {
        setAreaCode(id);
        formRef?.current?.setFieldsValue({ areaId: id });
      }
    });
  };

  useEffect(() => {
    if (values.id) {
      formRef?.current?.setFieldsValue(values);
    } else {
      formRef?.current?.resetFields();
    }
    setOptions(areaData);
  }, [values]);

  const beforeUpload = async (e: any) => {
    const { name } = e;
    const {
      data: { accessId: OSSAccessKeyId, callback, dir, expire, host, policy, signature },
    } = await UploadService.uploadConfig();
    const params: API.OSSDataType = {
      key: `${dir}manager.${name}`,
      OSSAccessKeyId,
      callback,
      dir,
      expire,
      host,
      policy,
      signature,
    };
    setFile(params);
    return e;
  };

  const onChange = (value: any, code: string) => {
    console.log('onChange', value, code);

    getAreaList(value, code);
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
      <Form.Item
        name="areaId"
        label="所在地区"
        required={true}
        rules={[{ required: true, message: '请选择' }]}
      >
        <Select
          placeholder="请选择省份"
          value={provinceCode}
          onChange={(e) => onChange(e, 'province')}
          style={Object.assign(style, { marginRight: '15px' })}
        >
          {areaData?.map((i: any) => {
            return <Select.Option value={i.id}>{i.name}</Select.Option>;
          })}
        </Select>
        <Select
          placeholder="请选择市"
          value={cityCode}
          onChange={(e) => onChange(e, 'city')}
          style={Object.assign(style, { marginRight: '15px' })}
        >
          {sub?.map((i: any) => {
            return <Select.Option value={i.id}>{i.name}</Select.Option>;
          })}
        </Select>
        {subNext && subNext.length > 0 ? (
          <Select
            placeholder="请选择区"
            value={areaCode}
            onChange={(e) => onChange(e, 'area')}
            style={style}
          >
            {subNext?.map((i: any) => {
              return <Select.Option value={i.id}>{i.name}</Select.Option>;
            })}
          </Select>
        ) : null}
      </Form.Item>
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
      <Form.Item
        required
        label="合同归档"
        rules={[
          {
            required: true,
            message: '请上传教案文档',
          },
        ]}
      >
        <Upload
          listType="picture-card"
          // extra={
          //   <p style={{ color: 'red' }}>
          //     1.签章处盖章上传 /n2.补充协议上传 3.合作期限上传 4.合作条件上传
          //   </p>
          // }
          name="file"
          action={UPLOAD}
          accept=".pdf,.jpg"
          beforeUpload={beforeUpload}
          defaultFileList={defaultFileList}
          fileList={defaultFileList}
          onRemove={deleteFile}
          data={fileData}
          onChange={handleChange}
        >
          + Upload
        </Upload>
      </Form.Item>
    </ModalForm>
  );
};

export default memo(AddSchoolForm);
