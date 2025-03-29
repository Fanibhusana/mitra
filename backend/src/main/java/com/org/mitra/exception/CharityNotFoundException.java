package com.org.mitra.exception;

public class CharityNotFoundException extends RuntimeException{
    public CharityNotFoundException(String charityId) {
        super("Charity with ID " + charityId + " not found.");
    }
}
