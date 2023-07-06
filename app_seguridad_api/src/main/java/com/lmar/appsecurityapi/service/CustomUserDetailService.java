package com.lmar.appsecurityapi.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.lmar.appsecurityapi.model.UserInfo;
import com.lmar.appsecurityapi.repository.UserRepository;

@Service
public class CustomUserDetailService implements UserDetailsService {

	@Autowired
	private UserRepository repository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserInfo user = getUserDetails(username);
		if(user != null && (username.equals(user.getUsername()) || username.equals(user.getEmail()))){
			return new User(user.getUsername(), user.getPassword(), new ArrayList<>());
		} else {
			throw new UsernameNotFoundException("¡Usuario no encontrado!");
		}
	}
	
	public UserInfo getUserDetails(String username) {
		UserInfo userData = repository.findByUsernameEmail(username);;
		return userData;
	}

}
