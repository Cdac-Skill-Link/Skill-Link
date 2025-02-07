package com.demo.service;

import java.util.List;

import com.demo.model.UserRequirement;

public interface UserRequirementService {

	List<UserRequirement> getall(String skill);

	void addUserRequirement(UserRequirement u);

	UserRequirement getdata(int reqid);

	

	

	

}
