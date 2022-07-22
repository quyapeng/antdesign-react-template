import React, { useEffect, useRef, memo, useState, Fragment } from 'react';
import {
  ModalForm,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
  ProFormUploadButton,
  ProFormRadio,
  ProFormTreeSelect,
  ProFormDateRangePicker,
} from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import { TreeSelect, UploadFile, UploadProps } from 'antd';
import moment from 'moment';

import { STATUS } from '@/constant/index';
import { UPLOAD } from '@/constant/common';
import UploadService from '@/services/upload';
import { PlusCircleOutlined } from '@ant-design/icons';

export type UpdateFormProps = {
  title: string;
  visible: boolean;
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  type: string;
  values: Partial<API.RoleItem>;
  activityList: [];
  categoryList: [];
};

export type FormValueType = {};
const getFileName = (url: string, type: string) => {
  if (!url) return;
  let d = url.split('/').filter((i: string) => {
    if (i.includes(type)) {
      return i;
    }
  });
  return d[0];
};
const AddSourceModelForm: React.FC<UpdateFormProps> = ({
  title,
  values,
  visible,
  onSubmit,
  onCancel,
  activityList,
  categoryList,
  type,
}: any) => {
  const formRef = useRef<ProFormInstance>();
  const [, setList] = useState([]);
  const [defaultFileList, setFileList]: any = useState([]);
  const [defaultMp4FileList, setMp4FileList]: any = useState([]);
  const [courseDates, setDate]: any = useState([]);
  const [fileData, setFile] = useState({});
  const [videoData, setVideoFile] = useState({});
  //

  useEffect(() => {
    const { id, teachPaper, videoResource, category, activity, courseDates } = values;
    if (id) {
      formRef?.current?.setFieldsValue(values);
      if (teachPaper) {
        setFileList([{ url: teachPaper, name: getFileName(teachPaper, '.pdf') }]);
      }
      if (videoResource) {
        setMp4FileList([{ url: videoResource, name: getFileName(videoResource, '.mp4') }]);
      }
      let params: any = {
        categoryId: category?.id || null,
        activityId: activity?.id || null,
      };
      if (courseDates && courseDates.length > 0) {
        params.courseDates = courseDates;
      }
      formRef?.current?.setFieldsValue(params);
    } else {
      formRef?.current?.resetFields();
      formRef?.current?.setFieldsValue({ courseDates });
    }
  }, [visible]);

  useEffect(() => {
    //活动类
    const tem: any = activityList?.map((i: any) => {
      if (i.subActivities && i.subActivities.length > 0) {
        i.disabled = true;
      }
      return i;
    });
    setList(tem);
  }, [activityList]);

  const deleteFile = (type: string) => {
    if (type == 'defaultFileList') {
      setFileList([]);
    } else {
      setMp4FileList([]);
    }
  };

  const beforeUpload = async (e: any, type: string) => {
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
    if (type == 'teachPaper') {
      setFile(params);
    } else {
      setVideoFile(params);
    }
    return e;
  };

  const handleChange: any = ({ fileList, file }: any, type: string) => {
    const { status, response } = file;
    if (status == 'done') {
      fileList[0].url = response.data.url;
    }
    if (type == 'teachPaper') {
      setFileList([...fileList]);
    } else {
      setMp4FileList([...fileList]);
    }
  };

  const MyDate: React.FC<{
    // value?: string;
    dates: object;
    onChange?: (value: string) => void;
  }> = (props) => {
    const { dates, onChange }: any = props;
    const dateFormat = 'YYYY-MM-DD';
    const remove = (e: any, j: number) => {
      console.log('remove', e, j);
    };
    return (
      <>
        {dates?.map((i: { id: string | number; fromDate: string; toDate: string }, j: number) => {
          const { id, fromDate, toDate } = i;
          return (
            <Fragment key={j}>
              <ProFormDateRangePicker
                key={id || null}
                name={'dateRange'}
                label={j == 0 ? '展示日期' : ' '}
                colon={j == 0}
                fieldProps={
                  fromDate && toDate
                    ? {
                        value: [moment(fromDate, dateFormat), moment(toDate, dateFormat)],
                        onChange,
                        // initialValue: [moment(fromDate, dateFormat), moment(toDate, dateFormat)]
                      }
                    : {}
                }
              />
              {j == 0 ? (
                <PlusCircleOutlined
                  onClick={() => remove(i, j)}
                  style={{ display: 'inline-block' }}
                />
              ) : null}
            </Fragment>
          );
        })}
      </>
    );
  };

  return (
    <ModalForm
      title={title}
      width="60%"
      formRef={formRef}
      visible={visible}
      onVisibleChange={() => {}}
      {...{
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      }}
      layout="horizontal"
      onFinish={async (value: any) => {
        const { id, teachPaper, videoResource } = values;
        id ? (value.id = id) : null;
        if (defaultFileList && defaultFileList.length > 0 && defaultFileList[0].url) {
          value.teachPaper = defaultFileList[0].url;
        }
        if (defaultMp4FileList && defaultMp4FileList.length > 0 && defaultMp4FileList[0].url) {
          value.videoResource = defaultMp4FileList[0].url;
        }
        console.log('defaultFileList', defaultFileList);
        console.log('value', value);
        onSubmit(value);
      }}
      modalProps={{
        onCancel: () => onCancel(),
      }}
    >
      <ProFormText
        name="code"
        label="课程编号"
        rules={[
          {
            required: true,
            message: '请输入课程编号',
          },
        ]}
        width="md"
      />
      <ProFormText
        name="name"
        label="课程名称"
        rules={[
          {
            required: true,
            message: '请输入课程名称',
          },
        ]}
        width="md"
      />
      <ProFormSelect
        name="categoryId"
        label="课程分类"
        options={categoryList}
        fieldProps={{
          fieldNames: { label: 'name', value: 'id' },
        }}
        width="md"
        rules={[
          {
            required: true,
            message: '请选择课程分类',
          },
        ]}
      />
      <ProFormTreeSelect
        label="活动类"
        name="activityId"
        request={async () => activityList}
        fieldProps={{
          fieldNames: { label: 'name', value: 'id', children: 'subActivities' },
          treeCheckable: false,
          showCheckedStrategy: TreeSelect.SHOW_CHILD,
          placeholder: '请选择活动类',
          treeDefaultExpandAll: true,
        }}
        rules={[
          {
            required: true,
            message: '请选择活动类',
          },
        ]}
      />
      <ProFormUploadButton
        required
        max={1}
        extra="支持扩展名：.pdf"
        label="教案文档"
        // name="file"
        title="上传"
        action={UPLOAD}
        // onChange={(e) => handleChange(e, 'teachPaper')}
        fieldProps={{
          accept: '.pdf',
          beforeUpload: (e) => beforeUpload(e, 'teachPaper'),
          defaultFileList,
          fileList: defaultFileList,
          onRemove: () => deleteFile('defaultFileList'),
          data: fileData,
        }}
        onChange={(e) => handleChange(e, 'teachPaper')}
        rules={[
          {
            required: true,
            message: '请上传教案文档',
          },
        ]}
      />
      <ProFormUploadButton
        max={1}
        accept={'.mp4'}
        extra="支持扩展名：.mp4"
        label="教案视屏"
        name="videoResource"
        title="上传"
        fieldProps={{
          accept: '.mp4',
          beforeUpload: (e) => beforeUpload(e, 'videoResource'),
          // videoData
          defaultFileList: defaultMp4FileList,
          fileList: defaultMp4FileList,
          onRemove: () => deleteFile('defaultMp4FileList'),
          data: videoData,
        }}
        onChange={(e) => handleChange(e, 'videoResource')}
      />
      <ProFormTextArea
        name="purpose"
        width="md"
        label={'课程目标'}
        placeholder={'请输入课程目标'}
      />
      <MyDate
        dates={values?.courseDates}
        onChange={(e) => {
          console.log('MyDate', e);
        }}
      />
      <ProFormRadio.Group
        name="status"
        label="状态"
        rules={[
          {
            required: true,
            message: '请选择状态',
          },
        ]}
        options={STATUS}
      />
    </ModalForm>
  );
};

export default memo(AddSourceModelForm);
