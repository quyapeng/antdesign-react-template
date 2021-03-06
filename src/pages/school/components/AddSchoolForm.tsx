import React, { useEffect, useRef, memo, useState } from 'react';
import {
  ModalForm,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
  // ProFormCascader,
} from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';

import { SCHOOL_TYPE, FRANCH_TYPE } from '@/constant/common';
import { areaList } from '@/services/common';
import { Button, Form, Input, Select, Space, Upload } from 'antd';
import { UPLOAD } from '@/constant/common';
import UploadService from '@/services/upload';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

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

  const [franchiseType, setFType] = useState<string>('');
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
      // setOptions(areaData);
      formRef?.current?.setFieldsValue(values);
      let list: any = [];
      console.log(values.contractPapers, '222222');
      if (!!values.contractPapers && values.contractPapers.indexOf(',') > -1) {
        values.contractPapers?.split(',').map((i: any) => {
          list.push({ url: i });
        });
      } else if (values.contractPapers == '') {
        list = [];
      } else {
        list.push({ url: values.contractPapers });
      }
      setFileList(list);
      formRef?.current?.setFieldsValue({ contractPapers: list });
      setFType(values.franchiseType);
      if (values.areaId) {
        formRef?.current?.setFieldsValue({
          areaId: values?.areaId,
        });
        setTimeout(() => {
          if (values?.area?.parent?.parent?.id) {
            // 3
            onChange(values.area.parent.parent.id, 'province');
            onChange(values.area.parent.id, 'city');
            onChange(values.areaId, 'area');
          } else {
            onChange(values?.area?.parent?.id, 'province');
            onChange(values.areaId, 'city');
          }
        }, 0);
      }
    } else {
      formRef?.current?.resetFields();
    }
  }, [visible]);

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
    getAreaList(value, code);
  };

  // ??????
  const getAreaList = (id: string | number, type?: string) => {
    areaList(id).then((res) => {
      if (type == 'province') {
        // ??????
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
        console.log('area', id);
        formRef?.current?.setFieldsValue({ areaId: id });
      }
    });
  };

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
      onFinish={async (value: any) => {
        if (values.id) {
          value.id = values.id;
        }
        value.areaId = areaCode || cityCode;
        console.log('value', value, areaCode, cityCode);

        onSubmit(value);
      }}
      modalProps={{
        onCancel: () => onCancel(),
      }}
    >
      <ProFormText
        name="name"
        label="????????????"
        rules={[
          {
            required: true,
            message: '?????????????????????',
          },
        ]}
        width="md"
      />
      <ProFormSelect
        label="????????????"
        name="type"
        rules={[
          {
            required: true,
            message: '?????????????????????',
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
        label="?????????"
        name="salesId"
        request={async () => salesData}
        rules={[
          {
            required: true,
            message: '??????????????????',
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
        label="????????????"
        required={true}
        rules={[{ required: true, message: '?????????????????????' }]}
      >
        <Select
          placeholder="???????????????"
          value={provinceCode}
          onChange={(e) => onChange(e, 'province')}
          style={Object.assign(style, { marginRight: '15px' })}
        >
          {areaData?.map((i: any) => {
            return (
              <Select.Option value={i.id} key={i.id}>
                {i.name}
              </Select.Option>
            );
          })}
        </Select>
        <Select
          placeholder="????????????"
          value={cityCode}
          onChange={(e) => onChange(e, 'city')}
          style={Object.assign(style, { marginRight: '15px' })}
        >
          {sub?.map((i: any) => {
            return (
              <Select.Option value={i.id} key={i.id}>
                {i.name}
              </Select.Option>
            );
          })}
        </Select>
        {subNext && subNext.length > 0 ? (
          <Select
            placeholder="????????????"
            value={areaCode}
            onChange={(e) => onChange(e, 'area')}
            style={style}
          >
            {subNext?.map((i: any) => {
              return (
                <Select.Option value={i.id} key={i.id}>
                  {i.name}
                </Select.Option>
              );
            })}
          </Select>
        ) : null}
      </Form.Item>
      <ProFormTextArea
        name="address"
        width="md"
        label={'????????????'}
        placeholder={'?????????????????????'}
      />
      <ProFormSelect
        fieldProps={{ onChange: (e) => changeType(e) }}
        label="????????????"
        name="franchiseType"
        rules={[
          {
            required: true,
            message: '?????????????????????',
          },
        ]}
        valueEnum={FRANCH_TYPE}
        width="md"
      />
      {franchiseType == 'THIRD_PARTY' ? (<ProFormSelect
          label="?????????"
          name="agentId"
          request={async () => agentData}
          rules={[
            {
              required: true,
              message: '??????????????????',
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
        
      ) : null}

      <ProFormText
        name="monitorDeviceSerial"
        label="?????????????????????"
        rules={[
          {
            required: true,
            message: '??????????????????????????????',
          },
        ]}
        width="md"
      />
      <ProFormText
        name="monitorDeviceValidateCode"
        label="?????????????????????"
        rules={[
          {
            required: true,
            message: '?????????????????????',
          },
        ]}
        width="md"
      />
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
          beforeUpload={beforeUpload}
          defaultFileList={defaultFileList}
          fileList={defaultFileList}
          onRemove={deleteFile}
          data={fileData}
          onChange={handleChange}
        >
          + ??????
        </Upload>
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
                    // label={index === 0 ? '????????????' : ''}
                    name={[field.name, 'channelNo']}
                    rules={[{ required: true, message: '??????????????????' }]}
                  >
                    <Input placeholder="??????????????????" />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, 'name']}
                    rules={[{ required: true, message: '?????????????????????' }]}
                  >
                    <Input placeholder="?????????????????????" />
                  </Form.Item>
                  <MinusCircleOutlined
                    onClick={() => remove(field.name)}
                    style={{ marginRight: '20px' }}
                  />
                </Space>
              ))}

              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  ??????????????????
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
    </ModalForm>
  );
};

export default memo(AddSchoolForm);
