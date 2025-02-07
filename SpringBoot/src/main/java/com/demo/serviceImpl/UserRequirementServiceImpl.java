package com.demo.serviceImpl;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.Repo.UserRequirementDao;
import com.demo.model.UserRequirement;
import com.demo.service.UserRequirementService;


@Service
public class UserRequirementServiceImpl implements UserRequirementService{
	@Autowired
	private UserRequirementDao userrequiredao;

	

	@Override
	public void addUserRequirement(UserRequirement u) {
		userrequiredao.save(u);
	}

	@Override
	public List<UserRequirement> getall(String skill) {
		// TODO Auto-generated method stub
		return userrequiredao.getall(skill);
	}

	@Override
	public UserRequirement getdata(int reqid) {
		// TODO Auto-generated method stub
		return userrequiredao.getData(reqid);
	}

	
	
}
