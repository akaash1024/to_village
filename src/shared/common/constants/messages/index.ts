import { CommonMessages, CommonDynamicMessages } from './common.messages';
import { AuthMessages, AuthDynamicMessages } from './auth.messages';
import {  ApiDynamicMessages } from './api.messages';
import {  ModuleDynamicMessages } from './module.messages';
import { UserDynamicMessages, UserMessages } from './user.messages';
import { LocationMessages } from './location.messages';



/**
 * Centralized Response Messages
 */
export const RESPONSE_MESSAGES = {
  COMMON: CommonMessages,
  AUTH: AuthMessages,
  LOCATION: LocationMessages,
  USER: UserMessages
} as const;

export const DYNAMIC_MESSAGES = {
  COMMON: CommonDynamicMessages,
  AUTH: AuthDynamicMessages,
  API: ApiDynamicMessages,
  MODULE: ModuleDynamicMessages,
  USER: UserDynamicMessages,
} as const;
