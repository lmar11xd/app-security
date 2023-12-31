package com.lmar.appsecurityapi.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterUserRequest {
	private int appCode;
	private String username;
	private String email;
	private String password;
}
