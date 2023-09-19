import * as React from "react";
import { IBannerInfoProps } from "./IBannerCentralAxityProps";
import styles from "./BannerCentralAxity.module.scss";

const BannerInfo: React.FC<IBannerInfoProps> = (props) => {
  const { title, description } = props;
  return (
    <div className={styles.info_banner}>
      <div className={styles.text_title}>{title}</div>
      <div className={styles.text_description}>{description}</div>
    </div>
  );
};

export default BannerInfo;
