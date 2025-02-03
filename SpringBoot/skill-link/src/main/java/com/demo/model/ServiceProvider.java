package com.demo.model;

import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="serviceproviders")
public class ServiceProvider {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true, nullable = false)
	private int Serviceproviderid;
	private String Namefirst;
	private String Namelast;
	private String Username;
	private String Password;
	private String Phonenumber;
	private String Skills;
	private float Rating;
	private String Wages;
	private String Address;
	@OneToMany(mappedBy="sid",cascade = CascadeType.ALL)
	private Set<ConfirmList> clist;
	public ServiceProvider(int sid) {
        Serviceproviderid = sid;
    }
	public ServiceProvider() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ServiceProvider(String namefirst, String namelast,String username,String password, String phonenumber,
			String skills, String wages,String address) {
		super();
		Namefirst = namefirst;
		Namelast = namelast;
		Username = username;
		Password = password;
		Phonenumber = phonenumber;
		Skills = skills;
		Wages = wages;
		Address = address;
	}
	
	
	public ServiceProvider(int serviceproviderid, String namefirst, String namelast, String username, String password,
			String phonenumber, String skills, String wages, String address) {
		super();
		Serviceproviderid = serviceproviderid;
		Namefirst = namefirst;
		Namelast = namelast;
		Username = username;
		Password = password;
		Phonenumber = phonenumber;
		Skills = skills;
		Wages = wages;
		Address = address;
	}
	
	public ServiceProvider(int serviceproviderid, String namefirst, String namelast, String username, String password,
			String phonenumber, String skills, float rating, String wages, String address) {
		super();
		Serviceproviderid = serviceproviderid;
		Namefirst = namefirst;
		Namelast = namelast;
		Username = username;
		Password = password;
		Phonenumber = phonenumber;
		Skills = skills;
		Rating = rating;
		Wages = wages;
		Address = address;
	}
	public ServiceProvider(String username, String password) {
		super();
		Username = username;
		Password = password;
	}
	
	public float getRating() {
		return Rating;
	}
	public void setRating(float rating) {
		Rating = rating;
	}
	public int getServiceProviderID() {
		return Serviceproviderid;
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
	public String getSkills() {
		return Skills;
	}
	public void setSkills(String skills) {
		Skills = skills;
	}
	public String getWages() {
		return Wages;
	}
	public void setWages(String wages) {
		Wages = wages;
	}
	public String getAddress() {
		return Address;
	}
	public void setAddress(String address) {
		Address = address;
	}
	@Override
	public String toString() {
		return "ServiceProvider [ServiceProviderID=" + Serviceproviderid + ", Namefirst=" + Namefirst + ", Namelast="
				+ Namelast + ", Username=" + Username + ", Password=" + Password + ", Phonenumber=" + Phonenumber
				+ ", Skills=" + Skills + ", Wages=" + Wages + ", Address=" + Address + "]";
	}
	
	
	

}
