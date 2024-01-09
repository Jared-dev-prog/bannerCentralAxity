import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";

import {
  PropertyFieldCollectionData,
  CustomCollectionFieldType,
} from "@pnp/spfx-property-controls/lib/PropertyFieldCollectionData";

import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

import * as strings from "BannerCentralAxityWebPartStrings";
import BannerCentralAxity from "./components/BannerCentralAxity";
import {
  IBannerCentralAxityProps,
  IBreadcrumbs,
  ICollectionsInfo,
  IDirectoryBreadcrumbsList,
  InfoBanner,
} from "./components/IBannerCentralAxityProps";
import { SPComponentLoader } from "@microsoft/sp-loader";
import { NAMEROUTES, NAME_LIST, ROUTES } from "./constants/routes";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

export interface IBannerCentralAxityWebPartProps {
  description: string;
  title: string;
  collectionData: ICollectionsInfo[];
}

export default class BannerCentralAxityWebPart extends BaseClientSideWebPart<IBannerCentralAxityWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = "";
  private infoBannerSubmit: InfoBanner = {
    breadcrumbs: [],
    description: "",
    title: "",
    img: "",
  };

  public render(): void {
    const element: React.ReactElement<IBannerCentralAxityProps> =
      React.createElement(BannerCentralAxity, {
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: SPComponentLoader.loadCss(
          "https://intellego365.sharepoint.com/sites/CentralAxity/_catalogs/masterpage/CentralAxity/css/nav_fix.css"
        ),
        infoBanner: this.infoBannerSubmit,
        collectionData: this.properties.collectionData,
      });

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return this._getBreadcrumbs().then((info) => {
      this.infoBannerSubmit = info;
    });
  }

  private async _getBreadcrumbs(): Promise<InfoBanner> {
    const listTitle = NAME_LIST.breadcrumbs; // Reemplaza con el nombre real de la lista
    const endpointList = `${this._getUrlStyle()}/_api/web/lists/getbytitle('${listTitle}')/items`;
    const response: SPHttpClientResponse = await this.context.spHttpClient.get(
      endpointList,
      SPHttpClient.configurations.v1
    );
    const dataResponse = await response.json();
    const dataBreadcrumbs = this._generateDataBreadcrumbs(dataResponse.value);
    const endpointImgs = `${this.context.pageContext.web.absoluteUrl}${ROUTES.siteImg}`;
    const info: InfoBanner = {
      breadcrumbs: this._generateBreadcrumbs(dataBreadcrumbs),
      description: "",
      title: "",
      img: `${endpointImgs}`,
    };
    return Promise.resolve(info);
  }
  private _getUrlStyle(): string {
    const urlAbsolute = this.context.pageContext.web.absoluteUrl;
    const indexAlias = urlAbsolute.indexOf(NAMEROUTES.consultancyAlias);
    const index = urlAbsolute.indexOf(NAMEROUTES.consultancy);
    return indexAlias !== -1
      ? `${urlAbsolute.substring(0, indexAlias)}${NAMEROUTES.consultancyAlias}`
      : `${urlAbsolute.substring(0, index)}${NAMEROUTES.consultancy}`;
  }
  private _generateDataBreadcrumbs(
    dataResponse: IDirectoryBreadcrumbsList[]
  ): IDirectoryBreadcrumbsList[] {
    return dataResponse.map((item: IDirectoryBreadcrumbsList) => ({
      ...item,
    }));
  }
  private _generateBreadcrumbs(
    dataBreadcrumbs: IDirectoryBreadcrumbsList[]
  ): IBreadcrumbs[] {
    const routeLocation = this.context.pageContext.web.absoluteUrl;
    const routes = routeLocation.replace(ROUTES.generic, "");
    const arrayBread = routes.split("/");
    const lengthMax = arrayBread.length - 1;
    const listBreadcrumbs = arrayBread.map((route: string, index: number) => ({
      titleBreadcrumbs: this._getAliasRoute(dataBreadcrumbs, route),
      url: this._getRoute(routeLocation, route),
      isActive: index >= lengthMax,
      separator: index < lengthMax,
    }));
    return listBreadcrumbs;
  }
  private _getAliasRoute(
    dataBreadcrumbs: IDirectoryBreadcrumbsList[],
    aliasRoute: string
  ): string {
    const itemData = dataBreadcrumbs.filter(
      (data: IDirectoryBreadcrumbsList) => {
        return data.Alias.toLowerCase() === aliasRoute.toLowerCase();
      }
    );
    return itemData.length > 0 ? itemData[0]?.Title : aliasRoute;
  }
  private _getRoute(routeLocation: string, route: string): string {
    const index = routeLocation.indexOf(route);
    return index !== -1 ? `${routeLocation.substring(0, index)}${route}` : "";
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const { semanticColors } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty(
        "--bodyText",
        semanticColors.bodyText || null
      );
      this.domElement.style.setProperty("--link", semanticColors.link || null);
      this.domElement.style.setProperty(
        "--linkHovered",
        semanticColors.linkHovered || null
      );
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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
                      title:
                        "Nombre de la imagen almacenada en 'SiteAssets/imgs/'",
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
  }
}
