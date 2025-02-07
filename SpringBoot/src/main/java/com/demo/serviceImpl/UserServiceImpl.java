package com.demo.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.Repo.UserDao;
import com.demo.model.User;
import com.demo.service.UserService;

import jakarta.transaction.Transactional;


@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao  userdao;
	
	public User getByUserName( String username) {
		User ul= userdao.getByUserName(username);
		
		return ul;
	}
	@Override
	public User adduser(User u) {
		User ul=getByUserName(u.getUsername());
		if(ul==null) {
			userdao.save(u);
		return u;	
		}
		return null;
	}
	@Override
	public User validate(String username, String password) {
		// TODO Auto-generated method stub
//		User ul=getByUserName(username);
//		System.out.println(ul);
//		if(ul.getPassword()==password&&ul.getUsername()==username) {
////			System.out.println("dsjf"); 
//			return ul;
//			 
//		}
//		return null;
		return userdao.validate(username,password);
	}
	@Override
	public List<User> getAll() {
		// TODO Auto-generated method stub
		
		List<User> ulist =userdao.findAll();
		if(ulist.isEmpty()) {
			return null;
		}
		return ulist;
	}
//	@Override
//	public boolean changePassword(User u) {
//		// TODO Auto-generated method stub
//		return false;
//	}
	@Override
	@Transactional
	public void changepass(String uid, String newpass) {
		// TODO Auto-generated method stub
		int rowupdated=userdao.changepass(uid,newpass);
		System.out.println(rowupdated);
	}
	
	

}
