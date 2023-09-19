import * as React from "react";
import styles from "./BannerCentralAxity.module.scss";
var Bread = function (props) {
    var breadcrumbs = props.breadcrumbs;
    var handleRedirect = function (breadcrumbs) {
        if (breadcrumbs.url)
            window.open(breadcrumbs.url, "_self");
    };
    return (React.createElement("div", { className: "".concat(styles.breadcrumbs) }, breadcrumbs !== undefined
        ? breadcrumbs.map(function (breadcrumb, index) { return (React.createElement("div", { key: index },
            React.createElement("div", { className: styles.item_breadcrumbs },
                React.createElement("div", { onClick: function () {
                        handleRedirect(breadcrumb);
                    }, className: "".concat(breadcrumb.isActive
                        ? styles.breadcrumbs_active
                        : styles.breadcrumbs_inactive) }, breadcrumb.titleBreadcrumbs),
                React.createElement("div", null, breadcrumb.separator ? (React.createElement("span", null,
                    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: " ".concat(styles.icon_breadcrumbs, " bi bi-chevron-right"), viewBox: "0 0 16 16" },
                        " ",
                        React.createElement("path", { "fill-rule": "evenodd", d: "M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" })))) : (""))))); })
        : ""));
};
export default Bread;
//# sourceMappingURL=Bread.js.map