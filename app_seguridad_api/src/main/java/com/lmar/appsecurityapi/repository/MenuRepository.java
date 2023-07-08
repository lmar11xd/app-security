package com.lmar.appsecurityapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.lmar.appsecurityapi.model.Menu;

public interface MenuRepository extends JpaRepository<Menu, Integer> {
	@Query("select u from Menu u where u.appCode = :appCode")
	public List<Menu> getMenuByAppCode(@Param("appCode") int appCode);
}
