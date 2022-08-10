import { areaList } from '@/services/common';
import { Select } from 'antd';
import React, { memo, useState } from 'react';

export type CityFormProps = {
  type: string;
  value: string;
  provinceData: [];
  onChangeSub: any;
};

export type FormValueType = {};

const City: React.FC<CityFormProps> = ({ provinceData, onChangeSub }: any) => {
  const [province, setCode] = useState<any>();
  const [city, setCity] = useState<any>();
  const [area, setArea] = useState<any>();

  // const [provinceData, setProvData] = useState<[]>([]);
  const [cityData, setCityData] = useState<[]>([]);
  const [areaData, setAreaData] = useState<[]>([]);

  const style = {
    width: '90px',
    display: 'inline-block',
  };
  const getList = (id: string | number, type: string) => {
    areaList(id).then((res) => {
      switch (type) {
        case 'province':
          setCity(undefined);
          setArea(undefined);
          setCityData(res);
          setAreaData([]);
          break;
        case 'city':
          setArea(undefined);
          setAreaData(res);
          break;
        case 'area':
          break;
        default:
          break;
      }
    });
  };

  const onChange = (e: string | number, type: string) => {
    if (e) {
      getList(e, type);
      onChangeSub(e);
    }
    // if (type == 'province') {
    //   setCity(undefined);
    //   setArea(undefined);
    // }
  };

  return (
    <>
      <Select
        placeholder="请选择省份"
        value={province}
        onChange={(e) => onChange(e, 'province')}
        style={Object.assign(style, { marginRight: '8px' })}
      >
        {provinceData?.map((i: any) => {
          return (
            <Select.Option value={i.id} key={i.id}>
              {i.name}
            </Select.Option>
          );
        })}
      </Select>
      <Select
        placeholder="请选择市"
        value={city}
        onChange={(e) => onChange(e, 'city')}
        style={Object.assign(style, { marginRight: '8px' })}
      >
        {cityData?.map((i: any) => {
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
          value={area}
          style={style}
          onChange={(e) => onChange(e, 'area')}
        >
          {areaData?.map((i: any) => {
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
