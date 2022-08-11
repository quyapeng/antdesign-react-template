import React, { useEffect, useRef, memo, useState } from 'react';
import { ModalForm, ProFormSelect } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';

import { allClassroom } from '@/services/school';

export type UpdateProps = {
  title: string;
  visible: boolean;
  onCancel: (flag?: boolean) => void;
  onSubmit: (values: any) => Promise<void>;
  values: Partial<any>;
};

const EnterClassroom: React.FC<UpdateProps> = ({
  title,
  visible,
  onCancel,
  onSubmit,
  values,
}: any) => {
  const formRef = useRef<ProFormInstance>();
  const [classData, setClassData] = useState([]);

  const getClassroom = async (id: string | number) => {
    allClassroom({ schoolId: id }).then((res) => {
      console.log(res);
      setClassData(res.data || []);
    });
  };
  useEffect(() => {
    if (values.id) {
      getClassroom(values?.school?.id);
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
        options={classData}
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
