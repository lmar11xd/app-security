package com.lmar.appsecurityapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.lmar.appsecurityapi.model.UserInfo;

public interface UserRepository extends JpaRepository<UserInfo, Integer> {
	
	public UserInfo findByUsername(String username);
	
	public UserInfo findByEmail(String email);
	
	@Query("select u from UserInfo u where u.username like :query or u.email like :query")
	public UserInfo findByUsernameEmail(@Param("query") String query);
}
