import React, { useEffect, useRef, memo } from 'react';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';

export type UpdateProps = {
  title: string;
  visible: boolean;
  onCancel: (flag?: boolean, formVals?: any) => void;
  onSubmit: (values: any) => Promise<void>;
  values: Partial<any>;
  classData: [];
};

const EnterClassroom: React.FC<UpdateProps> = ({
  title,
  visible,
  onCancel,
  onSubmit,
  values,
  classData,
}: any) => {
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    if (values.id) {
      formRef?.current?.setFieldsValue(values);
    }
  }, [visible]);

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
      onFinish={async () => {
        onSubmit(Object.assign({ id: values.id, ...formRef.current?.getFieldsValue() }));
      }}
      modalProps={{
        onCancel: () => onCancel(),
      }}
    >
      <ProFormSelect
        label="班级"
        name="classroomId"
        request={async () => classData}
        rules={[
          {
            required: true,
            message: '请选择班级',
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
    </ModalForm>
  );
};

export default memo(EnterClassroom);
