package com.demo.Repo;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.demo.model.User;
@Repository
public interface UserDao extends JpaRepository<User,Integer> {
	@Query(value="select * from users where username=:username" ,nativeQuery=true)
	User getByUserName(String username);

	@Query(value="select*from users where username=:username&&password=:password" ,nativeQuery=true)
	User validate(String username, String password);

	@Modifying
	@Query(value="update users set password=:newpass where username=:uid",nativeQuery=true)
	int changepass(String uid, String newpass);

	

}
