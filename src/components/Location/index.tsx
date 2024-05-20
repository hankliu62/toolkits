import type { CascaderProps } from 'antd';
import { Cascader } from 'antd';
import { useMemo } from 'react';

import { locations } from './location';

interface TreeData {
  label: string;
  value: string;
  children?: TreeData[];
}

export type ILocationCascaderProps = CascaderProps<TreeData>;

export default function LocationCascader({
  placeholder = '省市 / 城市 / 县区',
  ...rest
}: ILocationCascaderProps) {
  const options = useMemo(() => {
    return convertLocationListToTree(locations);
  }, []);

  return (
    <Cascader
      className="location-select-cascader"
      options={options}
      placeholder={placeholder}
      {...rest}
    />
  );
}

function convertLocationListToTree(list: { id: string; name: string; superId: string }[]) {
  const result: TreeData[] = [];
  const temp: Record<string, TreeData> = {};
  for (const item of list) {
    const treeNode: TreeData = {
      label: item.name,
      value: item.id,
    };

    temp[item.id] = treeNode;
  }

  for (const item of list) {
    if (item.superId === '0') {
      result.push(temp[item.id]);
    } else if (item.superId) {
      const parent = temp[item.superId];
      if (!parent.children) parent.children = [];
      parent.children.push(temp[item.id]);
    }
  }
  return result;
}
