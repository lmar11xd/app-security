package com.lmar.appsecurityapi.service;

import java.util.List;

import com.lmar.appsecurityapi.model.Menu;

public interface MenuService {
	public List<Menu> getMenuByAppCode(int appCode);
}
