package com.gemini.resources;

import com.gemini.beans.forms.PreEnrollmentAddressBean;
import com.gemini.beans.forms.PreEnrollmentBean;
import com.gemini.beans.requests.PreEnrollmentInitialRequest;
import com.gemini.beans.responses.ResponseBase;
import com.gemini.services.PreEnrollmentService;
import com.gemini.utils.ValidationUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/16/18
 * Time: 2:24 PM
 */
@RestController
@RequestMapping("/enrollment/pre")
public class PreEnrollmentRequestResource {

    @Autowired
    private PreEnrollmentService preEnrollmentService;

    @RequestMapping(value = "/{requestId}")
    public ResponseEntity<ResponseBase> retrieve(@PathVariable Long requestId) {
        return ResponseEntity.ok(ResponseBase.success(requestId));
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<ResponseBase<PreEnrollmentBean>> savePreEnrollmentRequest(@RequestBody PreEnrollmentInitialRequest initialRequest) {
        PreEnrollmentBean preEnrollmentBean;
        if (ValidationUtils.valid(initialRequest.getStudentNumber())
                || ValidationUtils.valid(
                initialRequest.getFirstName(),
                initialRequest.getFatherLastName(),
                initialRequest.getMotherLastName(),
                initialRequest.getDateOfBirth(),
                initialRequest.getGender()))
            preEnrollmentBean = preEnrollmentService.createPreEnrollment(initialRequest);
        else
            return ResponseEntity.badRequest().body(ResponseBase.error("Missing fields to create pre-enrollment"));

        ResponseBase<PreEnrollmentBean> response;
        if (preEnrollmentBean != null)
            response = ResponseBase.<PreEnrollmentBean>success(preEnrollmentBean.getId(), preEnrollmentBean);
        else
            response = ResponseBase.error("Error saving pre-enrollment");
        return ResponseEntity.ok(response);

    }

    @RequestMapping(value = "/{requestId}/address")
    public ResponseEntity<PreEnrollmentAddressBean> getPreEnrollmentAddress(@PathVariable Long requestId) {
        PreEnrollmentAddressBean addressBean = preEnrollmentService.getAddress(requestId);
        return ResponseEntity.ok(addressBean);
    }


    @RequestMapping(value = "/{requestId}/address/save", method = RequestMethod.POST)
    public ResponseEntity<ResponseBase> savePreEnrollmentAddress(@PathVariable Long requestId, @RequestBody PreEnrollmentAddressBean request) {
        boolean validRequest = preEnrollmentService.validAddressForRequestId(requestId, request.getPhysical(), request.getPostal());
        if (validRequest) {
            boolean saved;
            saved = preEnrollmentService.updateStudentAddress(request.getPhysical());
            saved &= preEnrollmentService.updateStudentAddress(request.getPostal());
            return ResponseEntity.ok(saved ? ResponseBase.success(requestId) : ResponseBase.error("Error saving address"));
        }
        return ResponseEntity.badRequest().body(ResponseBase.error("Address are not attached to this request"));
    }


}