package com.gemini.database.dao.beans;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/20/18
 * Time: 7:36 PM
 */
public class StudentAddress {
    private Long familyId;
    private Long studentId;
    private Long extStudentNumber;

    private String postalAddress_1;
    private String postalAddress_2;
    private String postalCity;
    private String postalState;
    private String postalZipcode;

    private String physicalAddress_1;
    private String physicalAddress_2;
    private String physicalCity;
    private String physicalState;
    private String physicalZipcode;

    public Long getFamilyId() {
        return familyId;
    }

    public void setFamilyId(Long familyId) {
        this.familyId = familyId;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getExtStudentNumber() {
        return extStudentNumber;
    }

    public void setExtStudentNumber(Long extStudentNumber) {
        this.extStudentNumber = extStudentNumber;
    }

    public String getPostalAddress_1() {
        return postalAddress_1;
    }

    public void setPostalAddress_1(String postalAddress_1) {
        this.postalAddress_1 = postalAddress_1;
    }

    public String getPostalAddress_2() {
        return postalAddress_2;
    }

    public void setPostalAddress_2(String postalAddress_2) {
        this.postalAddress_2 = postalAddress_2;
    }

    public String getPostalCity() {
        return postalCity;
    }

    public void setPostalCity(String postalCity) {
        this.postalCity = postalCity;
    }

    public String getPostalState() {
        return postalState;
    }

    public void setPostalState(String postalState) {
        this.postalState = postalState;
    }

    public String getPostalZipcode() {
        return postalZipcode;
    }

    public void setPostalZipcode(String postalZipcode) {
        this.postalZipcode = postalZipcode;
    }

    public String getPhysicalAddress_1() {
        return physicalAddress_1;
    }

    public void setPhysicalAddress_1(String physicalAddress_1) {
        this.physicalAddress_1 = physicalAddress_1;
    }

    public String getPhysicalAddress_2() {
        return physicalAddress_2;
    }

    public void setPhysicalAddress_2(String physicalAddress_2) {
        this.physicalAddress_2 = physicalAddress_2;
    }

    public String getPhysicalCity() {
        return physicalCity;
    }

    public void setPhysicalCity(String physicalCity) {
        this.physicalCity = physicalCity;
    }

    public String getPhysicalState() {
        return physicalState;
    }

    public void setPhysicalState(String physicalState) {
        this.physicalState = physicalState;
    }

    public String getPhysicalZipcode() {
        return physicalZipcode;
    }

    public void setPhysicalZipcode(String physicalZipcode) {
        this.physicalZipcode = physicalZipcode;
    }
}