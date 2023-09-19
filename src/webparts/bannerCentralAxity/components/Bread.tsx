import * as React from "react";
import { ICollectionBreadcrumbs } from "./IBannerCentralAxityProps";
import styles from "./BannerCentralAxity.module.scss";

const Bread: React.FC<ICollectionBreadcrumbs> = (props) => {
  const { breadcrumbs } = props;
  console.log("breadcrumbs", breadcrumbs);
  return (
    <div className={`${styles.breadcrumbs}`}>
      {breadcrumbs !== undefined ? (
        breadcrumbs.map((breadcrumb, index) => (
          <div key={index}>
            <div className={styles.item_breadcrumbs}>
              <div
                className={`${
                  breadcrumb.isActive
                    ? styles.breadcrumbs_active
                    : styles.breadcrumbs_inactive
                }`}
              >
                {breadcrumb.titleBreadcrumbs}
              </div>
              <div>
                {breadcrumb.separator ? (
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className={` ${styles.icon_breadcrumbs} bi bi-chevron-right`}
                      viewBox="0 0 16 16"
                    >
                      {" "}
                      <path
                        fill-rule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>NO existe nada</div>
      )}
    </div>
  );
};

export default Bread;
