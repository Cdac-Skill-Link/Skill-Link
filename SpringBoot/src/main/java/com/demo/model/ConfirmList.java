package com.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;


@Entity
@Table(name="Confirmlist")
public class ConfirmList {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true, nullable = false)
	private int confirmid;
	private String wages;
	private String address;
	private String date;
	private String namefirst;
	private String namelast;
	private String  Phonenumber;
	@OneToOne
	@JoinColumn(name="Serviceproviderid")
	private ServiceProvider sid;
	public ConfirmList() {
		super();
	}
	public ConfirmList(int confirmid, String wages, String address, String date, String namefirst, String phonenumber,
			ServiceProvider sid) {
		super();
		this.confirmid = confirmid;
		this.wages = wages;
		this.address = address;
		this.date = date;
		this.namefirst = namefirst;
		Phonenumber = phonenumber;
		this.sid = sid;
	}
	
	public ConfirmList(int confirmid, String wages, String address, String date, String namefirst, String namelast,
			String phonenumber, ServiceProvider sid) {
		super();
		this.confirmid = confirmid;
		this.wages = wages;
		this.address = address;
		this.date = date;
		this.namefirst = namefirst;
		this.namelast = namelast;
		Phonenumber = phonenumber;
		this.sid = sid;
	}
	
	
	public String getNamelast() {
		return namelast;
	}
	public void setNamelast(String namelast) {
		this.namelast = namelast;
	}
	public int getConfirmid() {
		return confirmid;
	}
	public void setConfirmid(int confirmid) {
		this.confirmid = confirmid;
	}
	public String getWages() {
		return wages;
	}
	public void setWages(String wages) {
		this.wages = wages;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getNamefirst() {
		return namefirst;
	}
	public void setNamefirst(String namefirst) {
		this.namefirst = namefirst;
	}
	public String getPhonenumber() {
		return Phonenumber;
	}
	public void setPhonenumber(String phonenumber) {
		Phonenumber = phonenumber;
	}
	public ServiceProvider getSid() {
		return sid;
	}
	public void setSid(ServiceProvider sid) {
		this.sid = sid;
	}
	@Override
	public String toString() {
		return "ConfirmList [confirmid=" + confirmid + ", wages=" + wages + ", address=" + address + ", date=" + date
				+ ", namefirst=" + namefirst + ", Phonenumber=" + Phonenumber + ", sid=" + sid + "]";
	}
	
	
}
