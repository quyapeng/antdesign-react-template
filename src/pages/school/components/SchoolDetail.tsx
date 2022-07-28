import React, { useEffect, useRef, memo, useState } from 'react';
import { ModalForm, ProFormText, ProFormSelect, ProFormTextArea } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';

import { SCHOOL_TYPE, FRANCH_TYPE } from '@/constant/common';
import { Form, Input, Space, Upload } from 'antd';
import { UPLOAD } from '@/constant/common';

export type UpdateFormProps = {
  title: string;
  type: string;
  visible: boolean;
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: any) => Promise<void>;
  values: Partial<any>;
  salesData: [];
  agentData: [];
};

export type FormValueType = {};

const SchoolDetail: React.FC<UpdateFormProps> = ({
  title,
  type,
  visible,
  onCancel,
  onSubmit,
  values,
  salesData,
  agentData,
}: any) => {
  const formRef = useRef<ProFormInstance>();
  const [provinceCode, setProv] = useState<any>(null);
  const [franchiseType, setFType] = useState<string>('');
  // file
  const [fileData, setFile] = useState({});
  const [defaultFileList, setFileList]: any = useState([]);
  const style = {
    width: '100px',
    display: 'inline-block',
  };

  const handleChange: any = ({ fileList, file }: any, type: string) => {
    const { status } = file;
    setFileList([...fileList]);
    if (status == 'done') {
      fileList.map((i: any) => {
        i.url = i.url || i.response.data.url;
      });
    }
    setFileList([...fileList]);
    let contractPapers = fileList
      .map((i: any) => {
        return i.url;
      })
      ?.join(',');
    formRef?.current?.setFieldsValue({
      contractPapers,
    });
  };

  useEffect(() => {
    if (values.id) {
      formRef?.current?.setFieldsValue(values);
      let list: any = [];
      if (!!values.contractPapers && values.contractPapers.indexOf(',') > -1) {
        values.contractPapers?.split(',').map((i: any) => {
          list.push({ url: i });
        });
      } else {
        list.push({ url: values.contractPapers });
      }
      setFileList(list);
      formRef?.current?.setFieldsValue({ contractPapers: list });
      setFType(values.franchiseType);
    } else {
      formRef?.current?.resetFields();
    }
  }, [visible]);

  const changeType = (value: any) => {
    setFType(value);
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
      style={{ height: '600px', overflow: 'scroll' }}
      layout="horizontal"
      onFinish={async () => {
        onSubmit(values.id);
      }}
      modalProps={{
        onCancel: () => onCancel(),
        okText: type == 'check' ? '审批' : '确认',
      }}
    >
      <ProFormText name="name" label="园所名称" width="md" disabled />
      <ProFormSelect
        label="园所类型"
        name="type"
        disabled
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
        disabled
        fieldProps={{
          fieldNames: {
            label: 'name',
            value: 'id',
          },
        }}
        width="md"
      />
      <Form.Item label="所在地区" rules={[{ required: true, message: '请选择所在地区' }]}>
        {values.area?.parent?.parent?.name ? (
          <Input
            style={Object.assign(style, { marginRight: '15px' })}
            disabled
            value={values.area?.parent?.parent?.name}
          />
        ) : null}
        <Input
          style={Object.assign(style, { marginRight: '15px' })}
          disabled
          value={values.area?.parent?.name}
        />
        <Input style={style} disabled value={values.area?.name} />
      </Form.Item>
      <ProFormTextArea
        name="address"
        width="md"
        disabled
        label={'详细地址'}
        placeholder={'请输入详细地址'}
      />
      <ProFormSelect
        fieldProps={{ onChange: (e) => changeType(e) }}
        label="代理模式"
        disabled
        name="franchiseType"
        valueEnum={FRANCH_TYPE}
        width="md"
      />
      {franchiseType == 'THIRD_PARTY' ? (
        <ProFormSelect
          label="代理商"
          name="agentId"
          request={async () => agentData}
          disabled
          fieldProps={{
            fieldNames: {
              label: 'companyName',
              value: 'id',
            },
          }}
          width="md"
        />
      ) : null}

      <ProFormText name="monitorDeviceSerial" label="监控设备序列号" disabled width="md" />
      <ProFormText name="monitorDeviceValidateCode" label="监控设备验证码" disabled width="md" />
      {/* 合同归档 */}
      <Form.Item
        required
        label="合同归档"
        name="contractPapers"
        rules={[
          {
            required: true,
            message: '请上传合同归档',
          },
        ]}
      >
        <Upload
          listType="picture-card"
          name="file"
          action={UPLOAD}
          accept=".pdf,.jpg,.png"
          defaultFileList={defaultFileList}
          fileList={defaultFileList}
          data={fileData}
          onChange={handleChange}
          disabled
        ></Upload>
      </Form.Item>
      <Form.Item colon={false} label>
        <p style={{ color: 'red' }}>
          1.签章处盖章上传 2.补充协议上传 3.合作期限上传 4.合作条件上传
        </p>
      </Form.Item>
      <Form.Item
        required
        label="监控设备"
        rules={[
          {
            required: true,
            message: '请输入监控设备',
          },
        ]}
      >
        <Form.List name="monitors">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space key={field.key} align="baseline">
                  <Form.Item
                    name={[field.name, 'channelNo']}
                    rules={[{ required: true, message: '请输入通道号' }]}
                  >
                    <Input disabled placeholder="请输入通道号" />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, 'name']}
                    rules={[{ required: true, message: '请输入通道名称' }]}
                  >
                    <Input disabled placeholder="请输入通道名称" />
                  </Form.Item>
                </Space>
              ))}
            </>
          )}
        </Form.List>
      </Form.Item>
    </ModalForm>
  );
};

export default memo(SchoolDetail);
