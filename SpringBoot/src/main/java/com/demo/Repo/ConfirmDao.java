package com.demo.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.demo.model.ConfirmList;

@Repository
public interface ConfirmDao extends JpaRepository<ConfirmList,Integer> {

	@Query(value="select *from confirmlist where serviceproviderid=:sid",nativeQuery=true)
	List<ConfirmList> getList(int sid);
	

}
