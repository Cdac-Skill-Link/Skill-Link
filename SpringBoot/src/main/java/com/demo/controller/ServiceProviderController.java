package com.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.model.ConfirmList;
import com.demo.model.ServiceProvider;
import com.demo.model.UserRequirement;
import com.demo.service.ConfirmListService;
import com.demo.service.ServiceProviderServ;
import com.demo.service.UserRequirementService;

@RequestMapping("/serviceprovider")
@RestController
@CrossOrigin
public class ServiceProviderController {
	@Autowired
	private ServiceProviderServ ServiceProviderObj;
	@Autowired
	private UserRequirementService userreq;
	
	@Autowired
	private ConfirmListService confirmserv;
	
	@GetMapping("/getall")
	public ResponseEntity<List<ServiceProvider>> getallserviceprovider(){
		List<ServiceProvider> splist=ServiceProviderObj.getall();
		return ResponseEntity.ok(splist);	
	}
	@PostMapping("/register")
	public ResponseEntity<String> registerServiceProvider(@RequestBody ServiceProvider sp){
		System.out.println(sp);
		ServiceProviderObj.addServiceProvider(sp);
		return ResponseEntity.ok("data added successfully");
		
	}	
	@PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody ServiceProvider user) {
       ServiceProvider sp= ServiceProviderObj.validate(user.getUsername(),user.getPassword());
       if (sp != null) {
           return ResponseEntity.ok(sp);
       } else {
   
    	   return ResponseEntity.noContent().build();
       }
    }
	@GetMapping("/getallRequirements/{skill}")
	public ResponseEntity<List<UserRequirement>> getAllRequirements(@PathVariable String skill){
		List<UserRequirement> reqList=userreq.getall(skill);
		
		return ResponseEntity.ok(reqList);	
	}
	
//	@PostMapping("/getData/{reqid}")
//	public ResponseEntity<UserRequirement> getData(@PathVariable int reqid ){
//		UserRequirement u=userreq.getdata(reqid);
//	}
	@PostMapping("/addconfirmdata")
	public ResponseEntity<?> addData(@RequestBody ConfirmList c){
		System.out.println(c);
		confirmserv.addData(c);
		return ResponseEntity.ok("success");
	}
	
	
	@PostMapping("/confirmdata/{sid}")
	public ResponseEntity<List<ConfirmList> >getAll(@PathVariable int sid){
		List<ConfirmList> clist=confirmserv.getData(sid);
		System.out.println(clist);
		return ResponseEntity.ok(clist);
	}
	
//	@PostMapping("/change/{sid}")
//	public ResponseEntity<?> changepass(@PathVariable String sid,@RequestBody String newpass){
//		
//		
//		return ResponseEntity.ok("success");
//	}
	 @PostMapping("/change")
	    public ResponseEntity<String> changePassword(@RequestBody Map<String, String> request) {
	        String email = request.get("email");
	        String newPassword = request.get("password");

	        // Your implementation...
	        ServiceProviderObj.changepass(email,newPassword);
	        return ResponseEntity.ok("Password changed successfully");
	    }
}
