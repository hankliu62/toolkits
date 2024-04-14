import { SyncOutlined } from "@ant-design/icons";
import classNames from "classnames";
import * as React from "react";
import { Waypoint } from "react-waypoint";

export interface LoadMoreProps extends Waypoint.WaypointProps {
  visible?: boolean;
  indicator?: React.ReactElement;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onEnter?: (e: any) => void;
}

function DefaultLoadMoreIndicator() {
  return (
    <div className="flex justify-center">
      <SyncOutlined spin className="text-lg text-[#1677ff]" rev={undefined} />
    </div>
  );
}

function LoadMore({
  className,
  style,
  visible = true,
  disabled = false,
  indicator = <DefaultLoadMoreIndicator />,
  onEnter,
  ...rest
}: LoadMoreProps) {
  const handleEnter = (e: any) => {
    if (disabled) return;
    if (onEnter) {
      onEnter(e);
    }
  };
  if (!visible) return null;
  return (
    <div className={classNames("py-3 text-center", className)} style={style}>
      {disabled ? null : <Waypoint {...rest} onEnter={handleEnter} />}
      {indicator}
    </div>
  );
}

export default LoadMore;
