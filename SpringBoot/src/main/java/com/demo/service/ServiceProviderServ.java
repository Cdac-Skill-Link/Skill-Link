package com.demo.service;

import java.util.List;

import com.demo.model.ServiceProvider;

public interface ServiceProviderServ {

	List<ServiceProvider> getall();

	void addServiceProvider(ServiceProvider sp);

	ServiceProvider validate(String username, String password);

	int getRating(int sid);

	void updateRating(int sid, float avg);

	void changepass(String sid, String newpass);

}
