export const REGISTER_START = "REGISTERING_START";
export const REGISTER_END = "REGISTERING_END";
export const VALIDATE_REGISTER_FORM = "VALIDATE_REG_FORM";
export const USER_LOCATION_START = "USR_LOCATION_START";
export const USER_LOCATION_END = "USR_LOCATION_END";

export const ACTIVATION_USER_START = "ACTIVATION_USR_START";
export const ACTIVATION_USER_END = "ACTIVATION_USR_END";

export const PROFILE_UPDATE_START = "PROFILE_UPDATE_START";
export const PROFILE_UPDATE_END = "PROFILE_UPDATE_END";

export const AUTHENTICATING_START = "AUTHENTICATING_START";
export const AUTHENTICATING_END = "AUTHENTICATING_END";
export const AUTHENTICATED = "AUTHENTICATED";
export const INVALID_CREDENTIALS = "INVALID_CREDENTIALS";
export const FETCH_USER_INFO_START = "FETCH_USER_INFO_START";
export const FETCH_USER_INFO_END = "FETCH_USER_INFO_END";
export const UNKNOWN_LOGIN_ERROR = "ERROR_LOG_IN";
export const CLEAN_LOGIN = "CLEAN_LOGIN";
export const LOGOUT_START = "LOGOUT_START";
export const LOGOUT_END = "LOGOUT_END";

export const SESSION_CHECK_START = "SESSION_CHECK_START";
export const SESSION_CHECK_END = "SESSION_CHECK_END";

export const HOME_LOAD_START = "HOME_LOAD_START";
export const HOME_LOAD_END = "HOME_LOAD_END";

export const ON_WIZARD_LOAD_START = "WIZARD_LOAD_START";
export const ON_WIZARD_LOAD_END = "WIZARD_LOAD_END";
export const ON_WIZARD_NEXT_START = "NEXT_START";
export const ON_WIZARD_NEXT_END = "NEXT_END";
export const ON_WIZARD_PREVIOUS_START = "PREVIOUS_START";
export const ON_WIZARD_PREVIOUS_END = "PREVIOUS_END";
export const ON_WIZARD_COMPLETED = "WIZARD_COMPLETED";
export const ON_WIZARD_RESET = "ON_WIZARD_RESET";

export const STUDENT_LOOKUP_FORM_CHANGE = "STUDENT_LOOKUP_FORM_CHANGE";
export const STUDENT_SEARCH_START = "STUDENT_SEARCH_START";
export const STUDENT_SEARCH_END = "STUDENT_SEARCH_END";
export const STUDENT_FOUND = "STUDENT_FOUND";
export const STUDENT_NOT_FOUND = "STUDENT_NOT_FOUND";

export const ON_FOUND_CALLBACK = "FOUND";
export const ON_NOT_FOUND_CALLBACK = "NOT_FOUND";

export const STUDENT_PERSONAL_INFO_LOAD = "STUDENT_LOAD";
export const STUDENT_CREATE_PRE_ENROLLMENT_START = "CREATE_PRE_ENROLLMENT_START";
export const STUDENT_CREATE_PRE_ENROLLMENT_END = "CREATE_PRE_ENROLLMENT_END";

export const STUDENT_CPY_PHY_TO_POS_ADDRESS = "STUDENT_CPY_PHY_TO_POS_ADDRESS";
export const STUDENT_LOAD_ADDRESS_START = "STUDENT_LOAD_ADDRESS_START";
export const STUDENT_LOAD_ADDRESS_END = "STUDENT_LOAD_ADDRESS_END";

export const STUDENT_SAVE_ADDRESS_START = "STUDENT_SAVE_ADDRESS_START";
export const STUDENT_SAVE_ADDRESS_END = "STUDENT_SAVE_ADDRESS_END";

export const REGION_LOAD_START = "REGION_LOAD_START";
export const REGION_LOAD_END = "REGION_LOAD_END";

export const GRADELEVEL_LOAD_START = "GRADELEVEL_LOAD_START";
export const GRADELEVEL_LOAD_END = "GRADELEVEL_LOAD_END";

export const SCHOOL_LOAD_START = "SCHOOL_LOAD_START";
export const SCHOOL_LOAD_END = "SCHOOL_LOAD_END";

export const PRE_ENROLLMENT_SUBMIT_START = "PRE_ENROLLMENT_SUBMIT_START";
export const PRE_ENROLLMENT_SUBMIT_END = "PRE_ENROLLMENT_SUBMIT_END";


export let blockUIActions = [
    REGISTER_START
    , ACTIVATION_USER_START
    , AUTHENTICATING_START
    , STUDENT_SEARCH_START
    , STUDENT_CREATE_PRE_ENROLLMENT_START
    , STUDENT_LOAD_ADDRESS_START
    , STUDENT_SAVE_ADDRESS_START
    , PRE_ENROLLMENT_SUBMIT_START
    , PROFILE_UPDATE_START
    , SESSION_CHECK_START
    , HOME_LOAD_START];

export let unblockUIActions = [
    REGISTER_END
    , ACTIVATION_USER_END
    , AUTHENTICATING_END
    , STUDENT_SEARCH_END
    , STUDENT_CREATE_PRE_ENROLLMENT_END
    , STUDENT_LOAD_ADDRESS_END
    , STUDENT_SAVE_ADDRESS_END
    , PRE_ENROLLMENT_SUBMIT_END
    , PROFILE_UPDATE_END
    , SESSION_CHECK_END
    , HOME_LOAD_END];


