import { Select } from 'antd';
import React, { memo, useState } from 'react';

export type CityFormProps = {
  type: string;
};

export type FormValueType = {};

const City: React.FC<CityFormProps> = ({ type }: any) => {
  const [province, setCode] = useState<any>();
  const [city, setCity] = useState<any>();
  const [area, setArea] = useState<any>();

  const [provinceData, setProvData] = useState<[]>([]);
  const [cityData, setCityData] = useState<[]>([]);
  const [areaData, setAreaData] = useState<[]>([]);

  const style = {
    width: '100px',
    display: 'inline-block',
  };

  const onChange = (e: string | number, type: string) => {
    console.log(e, type);
  };

  return (
    <>
      <Select
        placeholder="请选择省份"
        value={province}
        onChange={(e) => onChange(e, 'city')}
        style={Object.assign(style, { marginRight: '15px' })}
      >
        {provinceData?.map((i: any) => {
          return <Select.Option value={i.id}>{i.name}</Select.Option>;
        })}
      </Select>
      <Select
        placeholder="请选择市"
        value={city}
        style={Object.assign(style, { marginRight: '15px' })}
      >
        {cityData?.map((i: any) => {
          return <Select.Option value={i.id}>{i.name}</Select.Option>;
        })}
      </Select>
      <Select placeholder="请选择区" value={area} style={style}>
        {areaData?.map((i: any) => {
          return <Select.Option value={i.id}>{i.name}</Select.Option>;
        })}
      </Select>
    </>
  );
};

export default memo(City);
