import * as React from "react";
import styles from "./BannerCentralAxity.module.scss";
var BannerInfo = function (props) {
    var title = props.title, description = props.description;
    return (React.createElement("div", { className: styles.info_banner },
        React.createElement("div", { className: styles.text_title }, title),
        React.createElement("div", { className: styles.text_description }, description)));
};
export default BannerInfo;
//# sourceMappingURL=BannerInfo.js.map