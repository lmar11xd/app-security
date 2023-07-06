package com.lmar.appsecurityapi.model.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {
	private int status;
	private String message;
	private String request;
	private LocalDateTime timeStamp;
}
