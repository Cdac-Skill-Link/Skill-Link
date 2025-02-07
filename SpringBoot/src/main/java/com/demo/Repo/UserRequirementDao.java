package com.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.demo.model.UserRequirement;

public interface UserRequirementDao extends JpaRepository<UserRequirement, Integer>{
	@Query(value="select * from userrequirements where skills=:skill" ,nativeQuery=true)
	List<UserRequirement> getall(String skill);
	@Query(value="select *from userrequirements where reuirement_id=:reqid",nativeQuery=true)
	UserRequirement getData(int reqid);
	
	

}
