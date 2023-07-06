package com.lmar.appsecurityapi.exception;

import java.time.LocalDateTime;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

import com.lmar.appsecurityapi.model.response.ErrorResponse;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalException {
	private Logger logger = LoggerFactory.getLogger(GlobalException.class);
	
	@ExceptionHandler(UserException.class)
	public ResponseEntity<ErrorResponse> UserExceptionHandler(UserException ex, HttpServletRequest req) {
		ErrorResponse response = ErrorResponse.builder()
				.status(HttpStatus.BAD_REQUEST.value())
				.message(ex.getMessage())
				.request(req.getRequestURI())
				.timeStamp(LocalDateTime.now())
				.build();
		logger.error(response.getMessage());
		return new ResponseEntity<ErrorResponse>(response, HttpStatus.OK);
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorResponse> MessageExceptionHandler(MethodArgumentNotValidException ex, HttpServletRequest req) {
		String message = ex.getBindingResult().getFieldError().getDefaultMessage();
		ErrorResponse response = ErrorResponse.builder()
				.status(HttpStatus.BAD_REQUEST.value())
				.message(message)
				.request(req.getRequestURI())
				.timeStamp(LocalDateTime.now())
				.build();
		logger.error(response.getMessage());
		return new ResponseEntity<ErrorResponse>(response, HttpStatus.OK);
	}
	
	@ExceptionHandler(NoHandlerFoundException.class)
	public ResponseEntity<ErrorResponse> NoHandlerFound(NoHandlerFoundException ex, HttpServletRequest req) {
		ErrorResponse response = ErrorResponse.builder()
				.status(HttpStatus.NOT_FOUND.value())
				.message(ex.getMessage())
				.request(req.getRequestURI())
				.timeStamp(LocalDateTime.now())
				.build();
		logger.error(response.getMessage());
		return new ResponseEntity<ErrorResponse>(response, HttpStatus.OK);
	}
	
	@ExceptionHandler(HttpRequestMethodNotSupportedException.class)
	public ResponseEntity<ErrorResponse> NoHandlerFound(HttpRequestMethodNotSupportedException ex, HttpServletRequest req) {
		ErrorResponse response = ErrorResponse.builder()
				.status(HttpStatus.METHOD_NOT_ALLOWED.value())
				.message(ex.getMessage())
				.request(req.getRequestURI())
				.timeStamp(LocalDateTime.now())
				.build();
		logger.error(response.getMessage());
		return new ResponseEntity<ErrorResponse>(response, HttpStatus.OK);
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorResponse> OtherExceptionHandler(Exception ex, HttpServletRequest req) {
		ErrorResponse response = ErrorResponse.builder()
				.status(HttpStatus.BAD_REQUEST.value())
				.message(ex.getMessage())
				.request(req.getRequestURI())
				.timeStamp(LocalDateTime.now())
				.build();
		logger.error(response.getMessage());
		return new ResponseEntity<ErrorResponse>(response, HttpStatus.OK);
	}
}
