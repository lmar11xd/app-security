package com.lmar.appsecurityapi.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lmar.appsecurityapi.model.Menu;
import com.lmar.appsecurityapi.repository.MenuRepository;
import com.lmar.appsecurityapi.service.MenuService;

@Service
public class MenuServiceImpl implements MenuService {

	@Autowired
	private MenuRepository menuRepository;
	
	@Override
	public List<Menu> getMenuByAppCode(int appCode) {		
		return menuRepository.getMenuByAppCode(appCode);
	}

}
