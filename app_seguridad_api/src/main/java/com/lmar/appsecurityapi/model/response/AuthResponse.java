package com.lmar.appsecurityapi.model.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.lmar.appsecurityapi.model.Menu;
import com.lmar.appsecurityapi.model.UserInfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
	private int status;
	private String message;
	private String token;
	
	@JsonIgnoreProperties({"password" })
	private UserInfo user;
	
	private List<Menu> menuOptions;
}
