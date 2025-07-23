export type CookieKey = 'current-project' | 'react-resizable-panels-layout' | 'is-shuffling-enabled' | 'likes' | 'auth_token'
  | 'user-device';

import { ProjectTypes } from "@/sanity/schema/schema-types";

export type CurrentProjectCookieKey = {
  category: ProjectTypes;
  project_slug: string;
}

// default is desktop
export type UserDeviceValue = 'mobile' | 'tablet' | 'console' | 'smarttv' | 'wearable' | 'embedded' | 'desktop';

export type UserDeviceCookie = {
  'device-type': UserDeviceValue
}