import * as types from "../types";

const initialState = {
    requestId: null,
    info: {
        regionId: null,
        schoolId: null,
        schoolName: null,
        schoolAddress: null,
        nextGradeLevel: null,
        nextGradeLevelDescription: null
    },
    vocationalEnrollments: [],
    currentVocationalEnrollment: {
        id: null,
        nextGradeLevel: null,
        schoolId: null,
        programs: []
    },
    foundPreviousEnrollment: false,
    initialPreEnrollmentSaved: false,
    completePreEnrollment: false
};

const preEnrollment = (state = initialState, action) => {
    switch (action.type) {
        case types.STUDENT_CREATE_PRE_ENROLLMENT_START:
            return state;
        case types.STUDENT_CREATE_PRE_ENROLLMENT_END:
            let resp = action.response.content;
            return {
                ...state,
                info: resp,
                requestId: action.response.requestId,
                initialPreEnrollmentSaved: true
            };
        case types.PRE_ENROLLMENT_SUBMIT_START:
            return state;
        case types.PRE_ENROLLMENT_SUBMIT_END:
            return {...state, completePreEnrollment: action.response.successfulOperation};
        default:
            return state;
    }
};

export default preEnrollment;