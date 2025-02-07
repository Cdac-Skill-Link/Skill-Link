package com.demo.service;

import java.util.List;

import com.demo.model.ConfirmList;

public interface ConfirmListService {

	List<ConfirmList> getData(int sid);

	void addData(ConfirmList c);

}
