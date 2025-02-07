package com.demo.serviceImpl;



import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.Repo.ServiceProviderDao;
import com.demo.model.ServiceProvider;
import com.demo.service.ServiceProviderServ;

@Service
public class ServiceProviderServImpl implements ServiceProviderServ{

	@Autowired
	 private ServiceProviderDao spdao;
	
	@Override
	public List<ServiceProvider> getall() {
		List<ServiceProvider> splist=spdao.findAll();
		return splist;
	}

	@Override
	public void addServiceProvider(ServiceProvider sp) {
		spdao.save(sp);
	}

	@Override
	public ServiceProvider validate(String username, String password) {
		return spdao.validateServiceProvider(username, password);
		
	}

	@Override
	public int getRating(int sid) {
		// TODO Auto-generated method stub
		return spdao.getRating(sid);
	}

	@Override
	@Transactional
	public void updateRating(int sid, float avg) {
		// TODO Auto-generated method stub
		int rowaffected=spdao.updateRating(sid,avg);
		 System.out.println("Rows affected: " + rowaffected);
	}

	@Override
	@Transactional
	public void changepass(String sid, String newpass) {
		// TODO Auto-generated method stub
		
		int rowaffect=spdao.changepss(sid,newpass);
		System.out.println(rowaffect);
	}

}
