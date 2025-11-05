import "uni-mini-router";

declare module "uni-mini-router" {
  interface Route {
    path: string;
    fullPath: string;
    meta?: {
      requireAuth?: boolean;
      [key: string]: any;
    };
  }
}
