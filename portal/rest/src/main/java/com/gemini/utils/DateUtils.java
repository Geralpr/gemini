package com.gemini.utils;

import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;

import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/12/18
 * Time: 8:17 PM
 */
public final class DateUtils {

    public static LocalDate toLocalDate(Date input) {
        return LocalDate.fromDateFields(input);
    }

    public static Date toDate(LocalDate input) {
        return input.toDate();
    }


    public static Date toDate(LocalDateTime input) {
        return input.toDate();
    }

    public static  Date getCurrentDate() {
        return new Date();
    }

    public static void main(String[] args) {
        LocalDate now = LocalDate.now();
        System.out.println(now.toDate());

        LocalDateTime dateTime = LocalDateTime.now();
        System.out.println(dateTime.toDate());
        
    }

}