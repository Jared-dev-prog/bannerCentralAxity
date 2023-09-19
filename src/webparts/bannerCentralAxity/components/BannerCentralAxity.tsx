import * as React from "react";
import { IBannerCentralAxityProps } from "./IBannerCentralAxityProps";
import Bread from "./Bread";
import BannerInfo from "./BannerInfo";

let title = "";
let description = "";
let imageURL = "";

const BannerCentralAxity: React.FC<IBannerCentralAxityProps> = (props) => {
  const { infoBanner, collectionData } = props;
  console.log("info", infoBanner);
  if (collectionData !== undefined) {
    title = collectionData[0].title;
    description = collectionData[0].description;
    imageURL = infoBanner.img + collectionData[0].imageURL;
  }
  console.log(imageURL);
  const backgroundImage = { backgroundImage: `url(${imageURL})` };
  return (
    <div className={`BannMod3`}>
      <div
        id="vpc_WebPart.BannerPortadaWebPart.external.c3998efa-dd20-46d5-8c8f-1b0046c402b5"
        data-viewport-id="WebPart.BannerPortadaWebPart.external.c3998efa-dd20-46d5-8c8f-1b0046c402b5"
        className={`BannMod2`}>
        <div
          data-sp-feature-tag="BannerPortadaWebPart web part (BannerPortada)"
          data-sp-feature-instance-id="c3998efa-dd20-46d5-8c8f-1b0046c402b5"
          data-sp-web-part-id="cea4fcce-bad2-4ded-bc1a-12aa7c48730c"
          className={`ms-SPLegacyFabricBlock BannMod1`}>
          <div id={`depurador`} />
          <div id={`xcontainer`} style={backgroundImage}>
            <Bread breadcrumbs={infoBanner.breadcrumbs} />
            <BannerInfo title={title} description={description} imageURL={imageURL} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerCentralAxity;
