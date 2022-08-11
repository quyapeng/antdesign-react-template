import { areaList } from '@/services/common';
import { Select } from 'antd';
import React, { memo, useState } from 'react';

export type CityFormProps = {
  type: string;
  value: string;
  provinceData: [];
  onChangeSub: any;
};

export type DataValueType = {
  id: number;
  name: string;
};

export type Code = string | number | undefined;

const City: React.FC<CityFormProps> = ({ provinceData, onChangeSub }: any) => {
  const [province, setCode] = useState<Code>(undefined);
  const [city, setCity] = useState<Code>(undefined);
  const [area, setArea] = useState<Code>(undefined);

  // const [provinceData, setProvData] = useState<[]>([]);
  const [cityData, setCityData] = useState<[]>([]);
  const [areaData, setAreaData] = useState<[]>([]);

  const style = {
    width: '90px',
    display: 'inline-block',
  };
  const getList = (id: Code, type: string) => {
    areaList(id).then((res) => {
      switch (type) {
        case 'province':
          setCode(id);
          setCity(undefined);
          setArea(undefined);
          setCityData(res);
          setAreaData([]);
          console.log('city', city);
          break;
        case 'city':
          setArea(undefined);
          setCity(id);
          setAreaData(res);
          break;
        case 'area':
          setArea(id);
          break;
        default:
          break;
      }
    });
  };

  const onChange = (e: Code, type: string) => {
    if (e) {
      getList(e, type);
      onChangeSub(e);
    }
  };

  return (
    <>
      <Select
        placeholder="请选择省份"
        defaultValue={province}
        value={province}
        onChange={(e) => onChange(e, 'province')}
        style={Object.assign(style, { marginRight: '8px' })}
      >
        {provinceData?.map((i: DataValueType) => {
          return (
            <Select.Option value={i.id} key={i.id}>
              {i.name}
            </Select.Option>
          );
        })}
      </Select>
      <Select
        placeholder="请选择市"
        defaultValue={city}
        value={city}
        onChange={(e) => onChange(e, 'city')}
        style={Object.assign(style, { marginRight: '8px' })}
      >
        {cityData?.map((i: DataValueType) => {
          return (
            <Select.Option value={i.id} key={i.id}>
              {i.name}
            </Select.Option>
          );
        })}
      </Select>
      {areaData && areaData.length > 0 ? (
        <Select
          placeholder="请选择区"
          defaultValue={area}
          value={area}
          style={style}
          onChange={(e) => onChange(e, 'area')}
        >
          {areaData?.map((i: DataValueType) => {
            return (
              <Select.Option value={i.id} key={i.id}>
                {i.name}
              </Select.Option>
            );
          })}
        </Select>
      ) : null}
    </>
  );
};

export default memo(City);
