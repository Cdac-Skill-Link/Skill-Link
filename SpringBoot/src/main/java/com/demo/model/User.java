package com.demo.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name="users")
public class User {
	@Id
	@GeneratedValue(strategy =GenerationType.IDENTITY)
	private int Userid;
	
	private String Namefirst;
	private String Namelast;
	
	@Column(name="Username",unique=true )

	private String Username;
	@Column(name="Password" )
	private String Password;
	private String Phonenumber;
	private String Address;
	@OneToMany(mappedBy="userid",cascade = CascadeType.ALL)
	private  Set<BookingList> blist;
	@OneToMany(mappedBy="userid",cascade = CascadeType.ALL)
	private Set<UserRequirement> Reqlist;

	public User() {
		super();
	}
	public User(String username, String password) {
		super();
		Username = username;
		Password = password;
	}
	
	public User(int userid) {
		super();
		Userid = userid;
	}
	
	
	public User(String namefirst, String namelast, String username, String password, String phonenumber,
			String address) {
		super();
		Namefirst = namefirst;
		Namelast = namelast;
		Username = username;
		Password = password;
		Phonenumber = phonenumber;
		Address = address;
	}
	public int getUserid() {
		return Userid;
	}
	public void setUserid(int userid) {
		Userid = userid;
	}
	public String getNamefirst() {
		return Namefirst;
	}
	public void setNamefirst(String namefirst) {
		Namefirst = namefirst;
	}
	public String getNamelast() {
		return Namelast;
	}
	public void setNamelast(String namelast) {
		Namelast = namelast;
	}
	public String getUsername() {
		return Username;
	}
	public void setUsername(String username) {
		Username = username;
	}
	public String getPassword() {
		return Password;
	}
	public void setPassword(String password) {
		Password = password;
	}
	public String getPhonenumber() {
		return Phonenumber;
	}
	public void setPhonenumber(String phonenumber) {
		Phonenumber = phonenumber;
	}
	public String getAddress() {
		return Address;
	}
	public void setAddress(String address) {
		Address = address;
	}
	@Override
	public String toString() {
		return "User [Userid=" + Userid + ", Namefirst=" + Namefirst + ", Namelast=" + Namelast + ", Username="
				+ Username + ", Password=" + Password + ", Phonenumber=" + Phonenumber + ", Address=" + Address  + "]";
	}
	
	

	
	
	
}
