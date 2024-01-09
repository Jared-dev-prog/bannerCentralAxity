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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { PropertyPaneTextField, } from "@microsoft/sp-property-pane";
import { PropertyFieldCollectionData, CustomCollectionFieldType, } from "@pnp/spfx-property-controls/lib/PropertyFieldCollectionData";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import * as strings from "BannerCentralAxityWebPartStrings";
import BannerCentralAxity from "./components/BannerCentralAxity";
import { SPComponentLoader } from "@microsoft/sp-loader";
import { NAMEROUTES, NAME_LIST, ROUTES } from "./constants/routes";
import { SPHttpClient } from "@microsoft/sp-http";
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
        return __awaiter(this, void 0, void 0, function () {
            var listTitle, endpointList, response, dataResponse, dataBreadcrumbs, endpointImgs, info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        listTitle = NAME_LIST.breadcrumbs;
                        endpointList = "".concat(this._getUrlStyle(), "/_api/web/lists/getbytitle('").concat(listTitle, "')/items");
                        return [4 /*yield*/, this.context.spHttpClient.get(endpointList, SPHttpClient.configurations.v1)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        dataResponse = _a.sent();
                        dataBreadcrumbs = this._generateDataBreadcrumbs(dataResponse.value);
                        endpointImgs = "".concat(this.context.pageContext.web.absoluteUrl).concat(ROUTES.siteImg);
                        info = {
                            breadcrumbs: this._generateBreadcrumbs(dataBreadcrumbs),
                            description: "",
                            title: "",
                            img: "".concat(endpointImgs),
                        };
                        return [2 /*return*/, Promise.resolve(info)];
                }
            });
        });
    };
    BannerCentralAxityWebPart.prototype._getUrlStyle = function () {
        var urlAbsolute = this.context.pageContext.web.absoluteUrl;
        var indexAlias = urlAbsolute.indexOf(NAMEROUTES.consultancyAlias);
        var index = urlAbsolute.indexOf(NAMEROUTES.consultancy);
        return indexAlias !== -1
            ? "".concat(urlAbsolute.substring(0, indexAlias)).concat(NAMEROUTES.consultancyAlias)
            : "".concat(urlAbsolute.substring(0, index)).concat(NAMEROUTES.consultancy);
    };
    BannerCentralAxityWebPart.prototype._generateDataBreadcrumbs = function (dataResponse) {
        return dataResponse.map(function (item) { return (__assign({}, item)); });
    };
    BannerCentralAxityWebPart.prototype._generateBreadcrumbs = function (dataBreadcrumbs) {
        var _this = this;
        var routeLocation = this.context.pageContext.web.absoluteUrl;
        var routes = routeLocation.replace(ROUTES.generic, "");
        var arrayBread = routes.split("/");
        var lengthMax = arrayBread.length - 1;
        var listBreadcrumbs = arrayBread.map(function (route, index) { return ({
            titleBreadcrumbs: _this._getAliasRoute(dataBreadcrumbs, route),
            url: _this._getRoute(routeLocation, route),
            isActive: index >= lengthMax,
            separator: index < lengthMax,
        }); });
        return listBreadcrumbs;
    };
    BannerCentralAxityWebPart.prototype._getAliasRoute = function (dataBreadcrumbs, aliasRoute) {
        var _a;
        var itemData = dataBreadcrumbs.filter(function (data) {
            return data.Alias.toLowerCase() === aliasRoute.toLowerCase();
        });
        return itemData.length > 0 ? (_a = itemData[0]) === null || _a === void 0 ? void 0 : _a.Title : aliasRoute;
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
                                    panelHeader: "Ingrese al información del banner",
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
                                            id: "img",
                                            title: "Nombre de la imagen almacenada en 'SiteAssets/imgs/'",
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