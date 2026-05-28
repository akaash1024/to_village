import { NOTFOUND } from 'dns';

export const TagMessages = {
  CREATE: 'Tag created successfully',
  UPDATE: 'Tag updated successfully',
  DELETE: 'Tag deleted successfully',
  FETCHED: 'Tag details fetched successfully',
  REMOVE: 'Tag Remove successfully',
  FAILED: 'Failed to remove tag.',
  TAG_ALREDY: 'Tag already exists',
  NOTFOUND: 'Tag not found.',
  FAILED_TO_CREATE_TAG: 'Failed to Create Tag',
  FAILED_TO_UPDATE_TAG: 'Failed to Update Tag',
} as const;
