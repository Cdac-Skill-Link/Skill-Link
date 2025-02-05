package com.demo.controller;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.model.BookingList;
import com.demo.model.ServiceProvider;
import com.demo.model.User;
import com.demo.service.BookingListService;

@RequestMapping("/bookingList")
@RestController
@CrossOrigin
public class BookingListController {
		@Autowired
		private BookingListService bookingListserv;
		
		
		
		
		@GetMapping("/getall/{userID}")
		public ResponseEntity<List<BookingList>> getAll(@PathVariable int userID){
			System.out.println(userID);
			List<BookingList> blist=bookingListserv.getAll(userID);
			return  ResponseEntity.ok(blist);
		}
		
		
		
		@PostMapping("/addData")
		public ResponseEntity<?> adduser(@RequestBody BookingList bData){
			System.out.println(bData.toString());
				bookingListserv.add(bData);
				
				
				return ResponseEntity.ok("success");
		}
		@PostMapping("/status/{rid}")
		public ResponseEntity<?>adduser(@PathVariable int rid,@RequestBody String s){
			System.out.println(rid+ s);
			bookingListserv.changeStatus(s,rid);
			return ResponseEntity.ok("success");
		}
		
		@Transactional
		@DeleteMapping("/removedata/{id}")
		public ResponseEntity<?> removedata(@PathVariable int id){
			bookingListserv.removedata(id);
			return ResponseEntity.ok("success");
		}
}

