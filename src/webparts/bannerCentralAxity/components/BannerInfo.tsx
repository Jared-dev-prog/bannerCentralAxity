import * as React from "react";
import { IBannerInfoProps } from "./IBannerCentralAxityProps";

const BannerInfo: React.FC<IBannerInfoProps> = (props) => {
  const { title } = props;
  return <div>{title}</div>;
};

export default BannerInfo;
