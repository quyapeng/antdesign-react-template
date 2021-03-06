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
        okText: type == 'check' ? '??????' : '??????',
      }}
    >
      <ProFormText name="name" label="????????????" width="md" disabled />
      <ProFormSelect
        label="????????????"
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
        label="?????????"
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
      <Form.Item label="????????????" rules={[{ required: true, message: '?????????????????????' }]}>
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
        label={'????????????'}
        placeholder={'?????????????????????'}
      />
      <ProFormSelect
        fieldProps={{ onChange: (e) => changeType(e) }}
        label="????????????"
        disabled
        name="franchiseType"
        valueEnum={FRANCH_TYPE}
        width="md"
      />
      {franchiseType == 'THIRD_PARTY' ? (
        <ProFormSelect
          label="?????????"
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

      <ProFormText name="monitorDeviceSerial" label="?????????????????????" disabled width="md" />
      <ProFormText name="monitorDeviceValidateCode" label="?????????????????????" disabled width="md" />
      {/* ???????????? */}
      <Form.Item
        required
        label="????????????"
        name="contractPapers"
        rules={[
          {
            required: true,
            message: '?????????????????????',
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
          1.????????????????????? 2.?????????????????? 3.?????????????????? 4.??????????????????
        </p>
      </Form.Item>
      <Form.Item
        required
        label="????????????"
        rules={[
          {
            required: true,
            message: '?????????????????????',
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
                    rules={[{ required: true, message: '??????????????????' }]}
                  >
                    <Input disabled placeholder="??????????????????" />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, 'name']}
                    rules={[{ required: true, message: '?????????????????????' }]}
                  >
                    <Input disabled placeholder="?????????????????????" />
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
