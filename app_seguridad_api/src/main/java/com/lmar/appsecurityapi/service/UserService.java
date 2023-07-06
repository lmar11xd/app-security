package com.lmar.appsecurityapi.service;

import com.lmar.appsecurityapi.exception.UserException;
import com.lmar.appsecurityapi.model.UserInfo;
import com.lmar.appsecurityapi.model.request.RegisterUserRequest;

public interface UserService {
	public UserInfo registerSimple(RegisterUserRequest request) throws UserException;
	public UserInfo findByEmail(String email);
	public UserInfo findByUsernameEmail(String query);
}
