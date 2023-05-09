package com.passionroad.passionroad.exception;

import org.springframework.http.HttpStatus;

public class BusinessException extends RuntimeException {
    HttpStatus code = HttpStatus.NOT_FOUND;

    public BusinessException(String message) {
        super(message);
    }

    public BusinessException(String message, HttpStatus code) {
        super(message);
        this.code = code;
    }

    public HttpStatus getCode() {
        return code;
    }
}
