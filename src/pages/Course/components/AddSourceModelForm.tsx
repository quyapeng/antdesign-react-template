import React, { useEffect, useRef, memo, useState } from 'react';
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
import { STATUS } from '@/constant/index';
import { TreeSelect } from 'antd';

import UploadService from '@/services/upload';
import moment from 'moment';

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
  const [list, setList] = useState([]);
  const [defaultFileList, setFileList]: any = useState([]);
  const [defaultMp4FileList, setMp4FileList]: any = useState([]);
  const [courseDates, setDate]: any = useState([]);

  useEffect(() => {
    if (values.id) {
      formRef?.current?.setFieldsValue(values);
      if (values.teachPaper) {
        setFileList([{ url: values.teachPaper, name: getFileName(values.teachPaper, '.pdf') }]);
      }
      if (values.videoResource) {
        setMp4FileList([
          { url: values.videoResource, name: getFileName(values.videoResource, '.mp4') },
        ]);
      }
      let params = {
        categoryId: values.category.id,
        activityId: values.activity.id,
      };
      formRef?.current?.setFieldsValue(params);
    } else {
      formRef?.current?.resetFields();
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
  const customRequest = async (options: any) => {
    const { file } = options;
    console.log('sss', file);
    const res = await UploadService.upload(file);
    console.log('res', res);
  };

  const MyDate: React.FC<{
    state: {
      option: object;
      key: any;
    };
    value?: string;
    onChange?: (value: string) => void;
  }> = (props) => {
    const {
      state: { fromDate, toDate, id },
    }: any = props;
    console.log('state', props);
    const dateFormat = 'YYYY-MM-DD';

    return (
      <>
        <ProFormDateRangePicker
          key={id}
          name="dateRange"
          label="展示日期"
          initialValue={[moment(fromDate, dateFormat), moment(toDate, dateFormat)]}
        />
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
        values.id ? (value.id = values.id) : null;
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
        // initialValue={[]}
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
        max={1}
        extra="支持扩展名：.pdf"
        label="教案文档"
        name="teachPaper"
        title="上传"
        // onChange={onChangeTeach}
        // action={''}
        fieldProps={{
          accept: '.pdf',
          customRequest,
          defaultFileList,
          fileList: defaultFileList,
          onRemove: () => deleteFile('defaultFileList'),
        }}
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
          customRequest,
          defaultFileList: defaultMp4FileList,
          fileList: defaultMp4FileList,
          onRemove: () => deleteFile('defaultMp4FileList'),
        }}
      />
      <ProFormTextArea
        name="purpose"
        width="md"
        label={'课程目标'}
        placeholder={'请输入课程目标'}
      />

      {/* MyDate */}
      {values?.courseDates?.map((i: any, j: any) => {
        return <MyDate state={i} key={j} />;
      })}
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
