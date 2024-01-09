import { Version } from "@microsoft/sp-core-library";
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { ICollectionsInfo } from "./components/IBannerCentralAxityProps";
export interface IBannerCentralAxityWebPartProps {
    description: string;
    title: string;
    collectionData: ICollectionsInfo[];
}
export default class BannerCentralAxityWebPart extends BaseClientSideWebPart<IBannerCentralAxityWebPartProps> {
    private _isDarkTheme;
    private _environmentMessage;
    private infoBannerSubmit;
    render(): void;
    protected onInit(): Promise<void>;
    private _getBreadcrumbs;
    private _getUrlStyle;
    private _generateDataBreadcrumbs;
    private _generateBreadcrumbs;
    private _getAliasRoute;
    private _getRoute;
    protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void;
    protected onDispose(): void;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=BannerCentralAxityWebPart.d.ts.map