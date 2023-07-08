package com.lmar.appsecurityapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lmar.appsecurityapi.exception.UserException;
import com.lmar.appsecurityapi.helpers.JwtUtil;
import com.lmar.appsecurityapi.model.Menu;
import com.lmar.appsecurityapi.model.UserInfo;
import com.lmar.appsecurityapi.model.request.AuthRequest;
import com.lmar.appsecurityapi.model.request.RegisterUserRequest;
import com.lmar.appsecurityapi.model.response.AuthResponse;
import com.lmar.appsecurityapi.service.CustomUserDetailService;
import com.lmar.appsecurityapi.service.MenuService;
import com.lmar.appsecurityapi.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private CustomUserDetailService customUserDetailService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private MenuService menuService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody AuthRequest request) throws UserException {
		AuthResponse response = authenticate(request);
		return ResponseEntity.ok(response);
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody RegisterUserRequest request) throws UserException {
		AuthResponse response = new AuthResponse();
		UserInfo user = userService.registerSimple(request);
		if(user != null) {
			response = authenticate(new AuthRequest(request.getAppCode(), request.getEmail(), request.getPassword()));
		} else {
			throw new UserException("No se pudo registrar al usuario");
		}
		return ResponseEntity.ok(response);
	}
	
	public AuthResponse authenticate(AuthRequest request) {
		UserDetails userDetails = this.customUserDetailService.loadUserByUsername(request.getUsername());
	
		
		if(userDetails == null) {
			throw new BadCredentialsException("¡Usuario no registrado!");
		}
		
		if(!passwordEncoder.matches(request.getPassword(), userDetails.getPassword())) {
			throw new BadCredentialsException("¡Usuario y/o contraseña incorrectos!");
		}
		
		Authentication authentication = this.authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));			
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		String token = this.jwtUtil.generateToken(userDetails);
		UserInfo user = userService.findByUsernameEmail(request.getUsername());
		List<Menu> listaMenu = menuService.getMenuByAppCode(request.getAppCode());
		
		AuthResponse response = new AuthResponse();
		response.setStatus(200);
		response.setMessage("Usuario autenticado");
		response.setToken(token);
		response.setUser(user);
		response.setMenuOptions(listaMenu);
		return response;
	}
}
