package com.demo.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.demo.model.User;
import com.demo.model.UserRequirement;
import com.demo.service.ServiceProviderServ;
import com.demo.service.UserRequirementService;
import com.demo.service.UserService;

@RequestMapping("/skilllink")
@RestController
@CrossOrigin
public class UserController {
	
	
	@Autowired
	private UserService userservice;
	@Autowired
	private UserRequirementService userRequire;
	@Autowired
	private ServiceProviderServ servProv;
	
	@PostMapping("/registration")
	public ResponseEntity<?> adduser(@RequestBody User u){
		System.out.println(u.toString());
			User ul =userservice.adduser(u);
			
			if(ul==null) {
				return ResponseEntity.ok("fail");
			}
			return ResponseEntity.ok("success");
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> validate(@RequestBody User u){
		
		//System.out.println(u.getPassword());
		User login=userservice.validate(u.getUsername(),u.getPassword());
		
		if(login!=null) {
			System.out.println(login.toString());
			System.out.println("success");
			return ResponseEntity.ok(login);
			
		}
		
		return ResponseEntity.noContent().build();
		
	}
	@GetMapping("/getall")
	public ResponseEntity<List<User>> getAll(){
		System.out.println("inside getAll");
		List<User>ulist=userservice.getAll();
		if(ulist.isEmpty())
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		return ResponseEntity.ok(ulist);
	}
	
	@PostMapping("/insertUserRequirement")
	public ResponseEntity<?> insertUserRequirement(@RequestBody UserRequirement u){
		System.out.println(u.toString());
		userRequire.addUserRequirement(u);		
		return ResponseEntity.ok("data added successfully");
	}
	
		
	@PostMapping("/addRating/{sid}/{rate}")
	public ResponseEntity<?>addrating(@PathVariable int sid ,@PathVariable int rate){
		float rating=servProv.getRating(sid);

		float avg=(rating+rate)/2;
		System.out.println(avg);
		System.out.println(rating);
		System.out.println(rate);
		servProv.updateRating(sid,avg);
		return ResponseEntity.ok("success");
	}
	
	@PostMapping("/change/{uid}")
	public ResponseEntity<?> changepass(@PathVariable String uid,@RequestBody String newpass){
		userservice.changepass(uid,newpass);
		
		return ResponseEntity.ok("success");
	}
	
	
	
	
	
	
	
	
	
}
