package com.demo.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.demo.model.BookingList;

public interface BookingListService {

	

	void add(BookingList bData);

	List<BookingList> getAll(int userID);

	void changeStatus(String s, int rid);

	void removedata(int id);

	

}
