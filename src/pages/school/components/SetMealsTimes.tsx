import React, { useEffect, useRef, memo } from 'react';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';

export type UpdateProps = {
  title: string;
  visible: boolean;
  onCancel: (flag?: boolean, formVals?: any) => void;
  onSubmit: (values: any) => Promise<void>;
  values: Partial<any>;
  mealData: [];
};

const SetMealsTimes: React.FC<UpdateProps> = ({
  title,
  visible,
  onCancel,
  onSubmit,
  values,
  mealData,
}: any) => {
  const formRef = useRef<ProFormInstance>();
  useEffect(() => {
    const { year, mealIds } = values;
    formRef.current?.setFieldsValue({
      year,
      mealIds,
    });
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
      onFinish={async (value: any) => {
        onSubmit(Object.assign({ id: values.id, mealIds: value.mealIds }));
      }}
      modalProps={{
        onCancel: () => onCancel(),
      }}
    >
      <ProFormText name="year" label="年份" width="md" disabled />
      <ProFormSelect
        label="餐次"
        name="mealIds"
        mode="multiple"
        request={async () => mealData}
        rules={[
          {
            required: true,
            message: '请选择餐次',
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

export default memo(SetMealsTimes);
