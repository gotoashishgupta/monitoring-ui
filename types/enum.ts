
export enum BasicStatus {
  DISABLE,
  ENABLE,
}

export enum ResultEnum {
  SUCCESS = 0,
  ERROR = -1,
  TIMEOUT = 401,
}

export enum StorageEnum {
  Auth = 'auth',
  User = 'user',
  Token = 'token',
  Settings = 'settings',
  I18N = 'i18nextLng',
  NavMenu = 'navMenu',
  ServiceMap = 'serviceMap',
  AIStatus = 'aiStatus'
}

export enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
}

export enum ThemeLayout {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
  Mini = 'mini',
}

export enum ThemeColorPresets {
  Default = 'default',
  Cyan = 'cyan',
  Purple = 'purple',
  Blue = 'blue',
  Orange = 'orange',
  Red = 'red',
}

export enum LocalEnum {
  en_US = 'en_US',
}

export enum MultiTabOperation {
  FULLSCREEN = 'fullscreen',
  REFRESH = 'refresh',
  CLOSE = 'close',
  CLOSEOTHERS = 'closeOthers',
  CLOSEALL = 'closeAll',
  CLOSELEFT = 'closeLeft',
  CLOSERIGHT = 'closeRight',
}

export enum PermissionType {
  CATALOGUE = 'CATALOGUE',
  MENU = 'MENU',
  BUTTON = 'BUTTON',
}

export enum MenuStatus {
  DISABLE,
  ENABLE,
}

export enum MenuType {
  CATALOGUE = 'CATALOGUE',
  MENU = 'MENU',
  BUTTON = 'BUTTON',
}


export interface IMenuItem {
  id: string;
  parentId: string;
  name: string;
  label: string | JSX.Element | TemplateStringsArray;
  type: MenuType;
  route: string;
  status?: MenuStatus;
  order?: number;
  icon?: string | JSX.Element;
  component?: string;
  hide?: boolean;
  hideTab?: boolean;
  frameSrc?: string;
  newFeature?: boolean;
  children?: IMenuItem[];
  key?: string;
  disabled?: boolean;
}
