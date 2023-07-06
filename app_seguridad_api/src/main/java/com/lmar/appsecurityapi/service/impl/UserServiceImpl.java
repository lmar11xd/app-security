package com.lmar.appsecurityapi.service.impl;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.lmar.appsecurityapi.exception.UserException;
import com.lmar.appsecurityapi.model.UserInfo;
import com.lmar.appsecurityapi.model.request.RegisterUserRequest;
import com.lmar.appsecurityapi.repository.UserRepository;
import com.lmar.appsecurityapi.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public UserInfo registerSimple(RegisterUserRequest request) throws UserException {
		UserInfo userFound = userRepository.findByUsername(request.getUsername());
		if(userFound != null) {
			throw new UserException("¡Username <<" + request.getUsername() + ">> ya está registrado!");
		}
		
		userFound = userRepository.findByEmail(request.getEmail());
		if(userFound != null) {
			throw new UserException("¡Email <<" + request.getEmail() + ">> ya está registrado!");
		}
		
		UserInfo newUser = new UserInfo();
		newUser.setUsername(request.getUsername());
		newUser.setEmail(request.getEmail());
		newUser.setPassword(passwordEncoder.encode(request.getPassword()));
		newUser.setCreatedDate(new Date());
		return userRepository.save(newUser);
	}

	@Override
	public UserInfo findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	@Override
	public UserInfo findByUsernameEmail(String query) {
		return userRepository.findByUsernameEmail(query);
	}

}
