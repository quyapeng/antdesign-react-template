import React, { useEffect, useRef, memo, useState } from 'react';
import { ModalForm, ProFormText, ProFormSelect, ProFormTextArea } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';

import { SCHOOL_TYPE, FRANCH_TYPE } from '@/constant/common';
import { areaList } from '@/services/common';
import { Button, Form, Input, Select, Space, Upload } from 'antd';
import { UPLOAD } from '@/constant/common';
import UploadService from '@/services/upload';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { CityFlags } from '@/constant/flag';

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
    if (visible) {
      if (values.id) {
        formRef?.current?.setFieldsValue(values);
        let list: any = [];
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
          if (values?.area?.parent?.parent?.id) {
            onChangeList(values.area.parent.parent.id, values.area.parent.id, values.area.id);
          } else {
            onChangeList(values?.area?.parent?.id, values?.area?.id);
          }
        }

        values.areaId ? setAreaCode(values.areaId) : null;
      } else {
        formRef?.current?.resetFields();
        setCityCode(null);
        setAreaCode(null);
        setProv(null);
        subNextData([]);
        subData([]);
      }
    }
  }, [visible]);

  const onChange = async (value: any, code: string) => {
    if (value) {
      switch (code) {
        case CityFlags.PROVINCE:
          setProv(value);
          getAreaList(value, (res: any) => {
            subData(res);
            subNextData([]);
            setCityCode(null);
            setAreaCode(null);
          });
          break;
        case CityFlags.CITY:
          setCityCode(value);
          getAreaList(value, (res: any) => {
            subNextData(res);
            setAreaCode(null);
          });
          break;
        case CityFlags.AREA:
          setAreaCode(value);
          break;
        default:
          break;
      }
    } else {
      console.log(value, code);
    }
  };
  const onChangeList = async (
    province: string | number,
    city: string | number,
    area?: string | number,
  ) => {
    console.log('data', province, city, area);
    setProv(province);
    getAreaList(province, (res: any) => {
      console.log(res);
      subData(res);
      setCityCode(city);
      getAreaList(city, (res: any) => {
        subNextData(res);
        setAreaCode(area);
      });
    });
  };

  // 地区
  const getAreaList = async (id: string | number, callback: any) => {
    console.log(id);
    if (id) {
      areaList(id).then((res) => {
        callback && callback(res);
      });
    } else {
      //
    }
  };

  const changeType = (value: any) => {
    setFType(value);
  };
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
        label="所在地区"
        required={true}
        rules={[{ required: true, message: '请选择所在地区' }]}
      >
        <Select
          placeholder="请选择省份"
          value={provinceCode}
          defaultValue={provinceCode}
          onChange={(e) => onChange(e, CityFlags.PROVINCE)}
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
          placeholder="请选择市"
          value={cityCode}
          defaultValue={cityCode}
          onChange={(e) => onChange(e, CityFlags.CITY)}
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
            placeholder="请选择区"
            value={areaCode}
            defaultValue={areaCode}
            onChange={(e) => onChange(e, CityFlags.AREA)}
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
        label={'详细地址'}
        placeholder={'请输入详细地址'}
      />
      <ProFormSelect
        fieldProps={{ onChange: (e) => changeType(e) }}
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
      {franchiseType == 'THIRD_PARTY' ? (
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
      ) : null}

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
          beforeUpload={beforeUpload}
          defaultFileList={defaultFileList}
          fileList={defaultFileList}
          onRemove={deleteFile}
          data={fileData}
          onChange={handleChange}
        >
          + 上传
        </Upload>
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
                    // label={index === 0 ? '监控设备' : ''}
                    name={[field.name, 'channelNo']}
                    rules={[{ required: true, message: '请输入通道号' }]}
                  >
                    <Input placeholder="请输入通道号" />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, 'name']}
                    rules={[{ required: true, message: '请输入通道名称' }]}
                  >
                    <Input placeholder="请输入通道名称" />
                  </Form.Item>
                  <MinusCircleOutlined
                    onClick={() => remove(field.name)}
                    style={{ marginRight: '20px' }}
                  />
                </Space>
              ))}

              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  新增设备信息
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
