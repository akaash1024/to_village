export const PatientMessages = {
  // Create Patient
  PATIENT_CREATED_SUCCESS: 'Patient Created Successfully',
  FAILED_TO_CREATE_PATIENT: 'Failed to create patient',
  PATIENT_ALREADY_EXISTS: 'Patient already exists with same details',
  PLEASE_PROVIDE_REQUIRED_FIELDS: 'Please Provide Required fields',
  PATIENT_CREATED_FORM_SUCCESS: 'Patient Created By Form Successfully',
  FAILED_TO_CREATE_PATIENT_BY_FORM: 'Failed to create patient by form',
  FAILED_TO_CREATE_PATIENT_BY_TTP: 'Failed to create patient by TTP',

  //  Create Bulk Patient
  PATIENT_BULK_CREATION_SUCCESS: 'Bulk Creation Of Patient Successfull',
  FAILED_TO_CREATE_PATIENT_BULK: 'Failed to create bulk Patient',

  // Update Patient
  PATIENT_UPDATED_SUCCESS: 'Patient Updated Successfully',
  FAILED_TO_UPDATE_PATIENT: 'Failed to update patient',
  PATIENT_NOT_FOUND: 'Patient not found',
  FAILED_TO_DELETE_PATIENT: 'Failed to delete Patient',
  PATIENT_DELETED_SUCCESS: 'Patient deleted successfully',

  // Get All Patients
  PATIENT_LIST_FETCH_SUCCESS: 'Patient list fetched successfully',
  PATIENT_DROP_DOWN_LIST_FETCH_SUCCESS:
    'Patient dropdown list fetched successfully',
  FAILED_TO_FETCH_PATIENTS: 'Failed to fetch patients',
  FAILED_TO_FETCH_PATIENT_LIST: 'Failed to Fetch the Patient List',
  FAILED_TO_FETCH_PATIENT_DROP_DOWN_LIST:
    'Failed to Fetch Patient dropdown list',

  // Create/Update Patient Group
  PATIENT_GROUP_CREATED_SUCCESS: 'Patient group created successfully',
  PATIENT_GROUP_UPDATED_SUCCESS: 'Patient group updated successfully',
  PATIENT_GROUP_ALREADY_EXISTS:
    'A group with this name already exist please select different name',
  FAILED_TO_CREATE_UPDATE_PATIENT_GROUP: (action: 'create' | 'update') =>
    `Failed to ${action} Patient group`,
  PATIENT_GROUP_CREATED_UPDATED_SUCCESS: (action: 'created' | 'updated') =>
    `Patient group ${action} successfully`,
  PATIENT_GROUP_NOT_FOUND: 'Patient group not found',
  FAILED_TO_CREATE_OR_UPDATE_GROUP: 'Failed to create/update Patient group',
  FAILED_TO_CREATE_PATIENT_GROUP: 'Failed to create Patient group',
  FAILED_TO_DELETE_PATIENT_GROUP: 'Failed to delete Patient Group',
  PATIENT_GROUP_DELETED_SUCCESS: 'Patient Group deleted successfully',

  // Group Listing
  GROUP_FETCH_SUCCESS: 'Groups fetched successfully',

  // Get Patient Group by ID
  PATIENT_GROUP_DETAIL_FETCH_SUCCESS:
    'Patient Group Details fetched successfully',
  FAILED_TO_FETCH_PATIENT_GROUP_DETAIL: 'Failed to fetch Patient Group Details',

  // Get Patient Group List
  PATIENT_GROUPS_FETCH_SUCCESS: 'Patient Groups fetched successfully',
  FAILED_TO_FETCH_PATIENT_GROUPS: 'Failed to fetch Patient groups',

  // Get refresh count by Group Id
  PATIENT_GROUP_COUNT_FETCH_SUCCESS:
    'Patient group counts fetched successfully.',
  FAILED_TO_FETCH_PATIENT_GROUP_COUNT:
    'Failed to fetch Patient Refreshed Count',

  // Patient Tags
  PATIENT_TAG_ADDED_SUCCESS: 'Tag successfully added to the patient',
  PATIENT_TAG_ADDITION_FAILED: 'Patient tag addition failed',
  TAG_NOT_FOUND: 'Tag not found',
  TAG_NOT_ASSIGNED: 'TAG_NOT_ASSIGNED',
  TAG_ALREADY_ASSIGNED: 'The tag is already assigned to the patient.',
  REMOVE_TAGS_SUCCESS: 'Tags removed from the patient successfully',
  FAILED_TO_REMOVE_TAGS: 'Failed to remove tags from patient',
  TAG_NOT_ASSIGNED_TO_PATIENT: 'Tag not assigned to patient',
  TAG_ID_PATIENT_ID_REQUIRED: 'tagId and patientId are required',
  PATIENT_ID_TAG_ID_REQUIRED: 'patientId and tagId are required',
  DUPLICATE_TAG: 'Duplicate_tag',
  TAG_NOT_AVAILABLE: 'Tag not available!!',
  PATIENT_TAG_FTECH_SUCCESS: 'Patient tags fetched successfully',
  TAG_AND_PATIENT_FIELD_REQUIRED: 'The tagId and patientId fields are required',

  // Get Patient Details
  PATIENT_DETAILS_FETCH_SUCCESS: 'Patient Details fetched successfully',
  FAILED_TO_FETCH_PATIENT_DETAILS: 'Failed to fetch Patient Details',
  FAILED_TO_FETCH_PATIENT_GROUP_DETAILS:
    'Failed to fetch Patient Group Details',
  FAILED_TO_FETCH_PATIENT_GROUP_PARAMETER_DETAILS:
    'Failed to fetch Patient Group Parameter Details',
  GROUP_DETAILS_FETCH_SUCCESS: 'Group details fetched successfully',

  // Get Appointment status by Patinet ID
  APPOINTMENT_STATUS_BY_PATIENT_ID_SUCCESS:
    'Appointment status By Patient Id Fetched Successfully',
  FAILED_TO_FETCH_APPOINTMENT_STATUS_BY_PATIENT_ID:
    'Failed to Fetch the Appointment status By Patient Id',
  PATIENT_ID_REQUIRED: 'Patient id is required',

  // Get Patient Entity Field Names
  FAILDED_TO_FETCH_PATIENT_ENTITY_COLUMNS:
    'Error while fetching patient entity columns',
  PATIENT_ENTITY_FETCH_SUCCESS:
    'Patient entity field names fetched successfully',
  FAILED_TO_FETCH_PATIENT_ENTITY: 'Failed to fetch patient entity field names',

  // Excel Validation
  VALIDATED_PATIENT_LIST: 'Validated patient list',
  VALIDATED_PATIENT_LIST_FROM_EXCEL: 'Validated patient list from Excel',
  INVALID_BASE64_STRING: 'Please provide valid base64 encoded string',

  // General
  PLEASE_LOGIN_FIRST: 'Please login first',
  PAGE_EXCEEDS_GROUPS: 'Page number exceeds available groups',
  COUNTS_FETCHED_SUCCESSFULLY: 'Counts fetched successfully',
  FAILED_TO_FETCH_REFRESHED_COUNT: 'Failed to fetch Patient Refreshed Count',
  GROUPS_FETCHED_SUCCESSFULLY: 'Groups fetched successfully',
  INVALID_PHONE_NUMBER: 'Invalid phone number',
  NAME_CONTAIN_FIRST_NAME_OR_LAST_NAME:
    'Name must contain only first name or first and last name',
  INVALID_MOBILE_NUMBER: 'Invalid mobile number',
  MOBILE_NUMBER_START_WITH_ZERO: 'Mobile number cannot start with 0',
  DUMMY_EMAIL_NOT_ALLOWED: 'Dummy email addresses are not allowed',
};
