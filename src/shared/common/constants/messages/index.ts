import { CommonMessages, CommonDynamicMessages } from './common.messages';
import { AuthMessages, AuthDynamicMessages } from './auth.messages';
import { ApiMessages, ApiDynamicMessages } from './api.messages';
import { ModuleMessages, ModuleDynamicMessages } from './module.messages';
import { FeatureMessages, FeatureDynamicMessages } from './feature.messages';
import { UserMessages, UserDynamicMessages } from './user.messages';
import { RoleMessages, RoleDynamicMessages } from './role.messages';
import { ClientMessages } from './client.messages';
import { LocationMessages } from './location.messages';
import {
  NotificationMessages,
  NotificationDynamicMessages,
} from './notification.messages';
import { SmsMessages } from './sms.message';
import { EmailMessages } from './email.messages';
import { TagMessages } from './tag.message';
import { AttachmentMessages } from './attachment.message';
import { AppointmentMessages } from './appointment.messages';
import { ChatWithPatinetsMessages } from './cwp.messages';
import { ReminderMessages } from './reminder.message';
import { VoipMessages } from './voip.messages';
import { PhoneMessages } from './phone.messages';
import { FormsMessages } from './forms.messages';
import { CronMessages } from './cron.messages';
import { PracticeAnalyticsMessages } from './practice-analytics.messages';
import { GenerateEmrMessages } from './emr.messages';
import { RecentSearchMessages } from './recent-search.messages';
import { ReviewsMessages } from './reviews.messages';
import { AutoReplyRuleMessages } from './auto-reply-rule.messages';

/**
 * Centralized Response Messages
 */
export const RESPONSE_MESSAGES = {
  COMMON: CommonMessages,
  AUTH: AuthMessages,
  API: ApiMessages,
  MODULE: ModuleMessages,
  FEATURE: FeatureMessages,
  USER: UserMessages,
  ROLE: RoleMessages,
  CLIENT: ClientMessages,
  LOCATION: LocationMessages,
  NOTIFICATION: NotificationMessages,
  SMS: SmsMessages,
  EMAIL: EmailMessages,
  TAG: TagMessages,
  ATTACHMENT: AttachmentMessages,
  APPOINTMENT: AppointmentMessages,
  CWP: ChatWithPatinetsMessages,
  REMINDER: ReminderMessages,
  VOIP: VoipMessages,
  PHONE: PhoneMessages,
  FORMS: FormsMessages,

  CRON: CronMessages,
  PRACTICEANALYTICS: PracticeAnalyticsMessages,
  EMR: GenerateEmrMessages,
  RECENTSEARCH: RecentSearchMessages,
  REVIEWS: ReviewsMessages,
  AUTO_REPLY_RULE: AutoReplyRuleMessages,
} as const;

export const DYNAMIC_MESSAGES = {
  COMMON: CommonDynamicMessages,
  AUTH: AuthDynamicMessages,
  API: ApiDynamicMessages,
  MODULE: ModuleDynamicMessages,
  FEATURE: FeatureDynamicMessages,
  USER: UserDynamicMessages,
  ROLE: RoleDynamicMessages,
  NOTIFICATION: NotificationDynamicMessages,
} as const;
