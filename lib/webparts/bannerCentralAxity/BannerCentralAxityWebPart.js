var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { PropertyPaneTextField } from "@microsoft/sp-property-pane";
import { PropertyFieldCollectionData, CustomCollectionFieldType, } from "@pnp/spfx-property-controls/lib/PropertyFieldCollectionData";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import * as strings from "BannerCentralAxityWebPartStrings";
import BannerCentralAxity from "./components/BannerCentralAxity";
import { SPComponentLoader } from "@microsoft/sp-loader";
import { ROUTES } from "./constants/routes";
var BannerCentralAxityWebPart = /** @class */ (function (_super) {
    __extends(BannerCentralAxityWebPart, _super);
    function BannerCentralAxityWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isDarkTheme = false;
        _this._environmentMessage = "";
        _this.infoBannerSubmit = {
            breadcrumbs: [],
            description: "",
            title: "",
            img: "",
        };
        return _this;
    }
    BannerCentralAxityWebPart.prototype.render = function () {
        var element = React.createElement(BannerCentralAxity, {
            isDarkTheme: this._isDarkTheme,
            environmentMessage: this._environmentMessage,
            hasTeamsContext: !!this.context.sdks.microsoftTeams,
            userDisplayName: SPComponentLoader.loadCss("https://intellego365.sharepoint.com/sites/CentralAxity/_catalogs/masterpage/CentralAxity/css/nav_fix.css"),
            infoBanner: this.infoBannerSubmit,
            collectionData: this.properties.collectionData,
        });
        ReactDom.render(element, this.domElement);
    };
    BannerCentralAxityWebPart.prototype.onInit = function () {
        var _this = this;
        return this._getBreadcrumbs().then(function (info) {
            _this.infoBannerSubmit = info;
        });
    };
    BannerCentralAxityWebPart.prototype._getBreadcrumbs = function () {
        var endpointImgs = "".concat(this.context.pageContext.web.absoluteUrl).concat(ROUTES.siteImg);
        var info = {
            breadcrumbs: this._generateBreadcrumbs(),
            description: "",
            title: "",
            img: "".concat(endpointImgs),
        };
        return Promise.resolve(info);
    };
    BannerCentralAxityWebPart.prototype._generateBreadcrumbs = function () {
        var _this = this;
        var routeLocation = this.context.pageContext.web.absoluteUrl;
        var routes = routeLocation.replace(ROUTES.generic, "");
        var arrayBread = routes.split("/");
        var lengthMax = arrayBread.length - 1;
        var listBreadcrumbs = arrayBread.map(function (route, index) { return ({
            titleBreadcrumbs: route,
            url: _this._getRoute(routeLocation, route),
            isActive: index >= lengthMax,
            separator: index < lengthMax,
        }); });
        return listBreadcrumbs;
    };
    BannerCentralAxityWebPart.prototype._getRoute = function (routeLocation, route) {
        var index = routeLocation.indexOf(route);
        return index !== -1 ? "".concat(routeLocation.substring(0, index)).concat(route) : "";
    };
    BannerCentralAxityWebPart.prototype.onThemeChanged = function (currentTheme) {
        if (!currentTheme) {
            return;
        }
        this._isDarkTheme = !!currentTheme.isInverted;
        var semanticColors = currentTheme.semanticColors;
        if (semanticColors) {
            this.domElement.style.setProperty("--bodyText", semanticColors.bodyText || null);
            this.domElement.style.setProperty("--link", semanticColors.link || null);
            this.domElement.style.setProperty("--linkHovered", semanticColors.linkHovered || null);
        }
    };
    BannerCentralAxityWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(BannerCentralAxityWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse("1.0");
        },
        enumerable: false,
        configurable: true
    });
    BannerCentralAxityWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription,
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField("description", {
                                    label: strings.DescriptionFieldLabel,
                                }),
                                PropertyPaneTextField("title", {
                                    label: strings.tituloSeccion,
                                }),
                                PropertyFieldCollectionData("collectionData", {
                                    key: "collectionData",
                                    label: "Collection data",
                                    panelHeader: "Collection data panel header",
                                    manageBtnLabel: "Manage collection data",
                                    value: this.properties.collectionData,
                                    fields: [
                                        {
                                            id: "title",
                                            title: "Titulo de la sección",
                                            type: CustomCollectionFieldType.string,
                                            required: true,
                                        },
                                        {
                                            id: "description",
                                            title: "Descripción de la sección",
                                            type: CustomCollectionFieldType.string,
                                            required: true,
                                        },
                                        {
                                            id: "imageURL",
                                            title: "Nombre de la imagen 'SiteAssets/imgs/'",
                                            type: CustomCollectionFieldType.string,
                                            required: true,
                                        },
                                    ],
                                    disabled: false,
                                }),
                            ],
                        },
                    ],
                },
            ],
        };
    };
    return BannerCentralAxityWebPart;
}(BaseClientSideWebPart));
export default BannerCentralAxityWebPart;
//# sourceMappingURL=BannerCentralAxityWebPart.js.map