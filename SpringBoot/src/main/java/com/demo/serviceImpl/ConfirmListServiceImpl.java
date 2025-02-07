package com.demo.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.Repo.ConfirmDao;
import com.demo.model.ConfirmList;
import com.demo.service.ConfirmListService;


@Service
public class ConfirmListServiceImpl implements ConfirmListService {

	@Autowired
	public ConfirmDao cdao;
	@Override
	public List<ConfirmList> getData(int sid) {
		// TODO Auto-generated method stub
		return cdao.getList(sid);
	}

	@Override
	public void addData(ConfirmList c) {
		// TODO Auto-erated method stub
		cdao.save(c);
	}

}
