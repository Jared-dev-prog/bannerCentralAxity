export interface IBannerCentralAxityProps {
    isDarkTheme: boolean;
    environmentMessage: string;
    hasTeamsContext: boolean;
    userDisplayName: any;
    infoBanner: InfoBanner;
    collectionData: ICollectionsInfo[];
}
export interface IBreadcrumbs {
    titleBreadcrumbs: string;
    url: string;
    isActive: boolean;
    separator: boolean;
}
export interface ICollectionBreadcrumbs {
    breadcrumbs: IBreadcrumbs[];
}
export interface InfoBanner extends ICollectionsInfo {
    breadcrumbs: IBreadcrumbs[];
}
export interface ICollectionsInfo {
    description: string;
    title: string;
    img: string;
}
export interface ICollectionsBreadcrumbs {
    breadcrumbs: IBreadcrumbs[];
}
export interface IBannerInfoProps {
    title: string;
    imageURL: string;
    description: string;
}
export interface IDirectoryBreadcrumbsList {
    Title: string;
    Alias: string;
}
//# sourceMappingURL=IBannerCentralAxityProps.d.ts.map