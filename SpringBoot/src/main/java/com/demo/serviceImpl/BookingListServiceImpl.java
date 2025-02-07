package com.demo.serviceImpl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.demo.dao.BookingListDao;
import com.demo.model.BookingList;
@Service
public class BookingListServiceImpl implements BookingListService {
	
	@Autowired
	private BookingListDao bookdao;

	

	@Override
	public void add(BookingList bData) {
		// TODO Auto-generated method stub
		bookdao.save(bData);
	}



	@Override
	public List<BookingList> getAll(int userID) {
		// TODO Auto-generated method stub
		List<BookingList> blist=bookdao.getall(userID);
		return blist;
	}



	@Override
	
	
	 @Transactional
	    public void changeStatus(String s, int rid) {
	        int rowsAffected = bookdao.updateStatus(s, rid);
	        System.out.println("Rows affected: " + rowsAffected);
	    }



	@Override
	@Transactional
	public void removedata(int id) {
		int rowAffected=bookdao.removedata(id);
		
	}



	

	

	

	
		
}
