import * as React from "react";
import Bread from "./Bread";
import BannerInfo from "./BannerInfo";
import { ROUTES } from "../constants/routes";
import styles from "./BannerCentralAxity.module.scss";
var title = "";
var description = "";
var imageURL = ROUTES.routeImgDefault;
var BannerCentralAxity = function (props) {
    var infoBanner = props.infoBanner, collectionData = props.collectionData;
    if (collectionData !== undefined) {
        title = collectionData[0].title;
        description = collectionData[0].description;
        imageURL = infoBanner.img + collectionData[0].img;
    }
    var backgroundImage = { backgroundImage: "url(".concat(imageURL, ")") };
    return (React.createElement("div", { className: "BannMod3 width100 noPadding noMargin width100" },
        React.createElement("div", { id: "vpc_WebPart.BannerPortadaWebPart.external.c3998efa-dd20-46d5-8c8f-1b0046c402b5", "data-viewport-id": "WebPart.BannerPortadaWebPart.external.c3998efa-dd20-46d5-8c8f-1b0046c402b5", className: "BannMod2" },
            React.createElement("div", { "data-sp-feature-tag": "BannerPortadaWebPart web part (BannerPortada)", "data-sp-feature-instance-id": "c3998efa-dd20-46d5-8c8f-1b0046c402b5", "data-sp-web-part-id": "cea4fcce-bad2-4ded-bc1a-12aa7c48730c", className: "ms-SPLegacyFabricBlock BannMod1" },
                React.createElement("div", { id: "depurador" }),
                React.createElement("div", { id: "xcontainer", style: backgroundImage },
                    React.createElement("div", { className: styles.content_banner },
                        React.createElement(Bread, { breadcrumbs: infoBanner.breadcrumbs }),
                        React.createElement(BannerInfo, { title: title, description: description, imageURL: imageURL })))))));
};
export default BannerCentralAxity;
//# sourceMappingURL=BannerCentralAxity.js.map