export interface IBannerCentralAxityProps {
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: any;
  infoBanner: InfoBanner;
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
