import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

import * as strings from "BannerCentralAxityWebPartStrings";
import BannerCentralAxity from "./components/BannerCentralAxity";
import {
  IBannerCentralAxityProps,
  IBreadcrumbs,
  InfoBanner,
} from "./components/IBannerCentralAxityProps";
import { SPComponentLoader } from "@microsoft/sp-loader";
import { ROUTES } from "./constants/routes";

export interface IBannerCentralAxityWebPartProps {
  description: string;
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
      });

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return this._getBreadcrumbs().then((info) => {
      this.infoBannerSubmit = info;
    });
  }

  private _getBreadcrumbs(): Promise<InfoBanner> {
    const endpointImgs = `${this.context.pageContext.web.absoluteUrl}${ROUTES.generic}`;
    const info: InfoBanner = {
      breadcrumbs: this._generateBreadcrumbs(),
      description: "",
      title: "",
      img: `${endpointImgs}`,
    };
    return Promise.resolve(info);
  }
  private _generateBreadcrumbs(): IBreadcrumbs[] {
    const routeLocation = this.context.pageContext.web.absoluteUrl;
    const routes = routeLocation.replace(ROUTES.generic, "");
    const arrayBread = routes.split("/");
    const lengthMax = arrayBread.length - 1;
    const listBreadcrumbs = arrayBread.map((route: string, index: number) => ({
      titleBreadcrumbs: route,
      url: this._getRoute(routeLocation, route),
      isActive: index >= lengthMax,
      separator: index < lengthMax,
    }));
    return listBreadcrumbs;
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
              ],
            },
          ],
        },
      ],
    };
  }
}
