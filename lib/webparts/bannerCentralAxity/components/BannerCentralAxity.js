import * as React from "react";
import Bread from "./Bread";
var BannerCentralAxity = function (props) {
    var infoBanner = props.infoBanner;
    console.log("info", infoBanner);
    return (React.createElement("div", { className: "BannMod3" },
        React.createElement("div", { id: "vpc_WebPart.BannerPortadaWebPart.external.c3998efa-dd20-46d5-8c8f-1b0046c402b5", "data-viewport-id": "WebPart.BannerPortadaWebPart.external.c3998efa-dd20-46d5-8c8f-1b0046c402b5", className: "BannMod2" },
            React.createElement("div", { "data-sp-feature-tag": "BannerPortadaWebPart web part (BannerPortada)", "data-sp-feature-instance-id": "c3998efa-dd20-46d5-8c8f-1b0046c402b5", "data-sp-web-part-id": "cea4fcce-bad2-4ded-bc1a-12aa7c48730c", className: "ms-SPLegacyFabricBlock BannMod1" },
                React.createElement("div", { id: "depurador" }),
                React.createElement("div", { id: "xcontainer" },
                    React.createElement(Bread, { breadcrumbs: infoBanner.breadcrumbs }))))));
};
export default BannerCentralAxity;
//# sourceMappingURL=BannerCentralAxity.js.map