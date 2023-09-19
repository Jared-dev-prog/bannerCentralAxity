export interface IBannerCentralAxityProps {
    isDarkTheme: boolean;
    environmentMessage: string;
    hasTeamsContext: boolean;
    userDisplayName: any;
    infoBanner: InfoBanner;
    collectionData: any[];
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
export interface InfoBanner {
    breadcrumbs: IBreadcrumbs[];
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
//# sourceMappingURL=IBannerCentralAxityProps.d.ts.map