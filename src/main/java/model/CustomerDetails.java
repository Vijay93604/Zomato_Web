package model;

import Enums.Role;

public class CustomerDetails {
	String name;
	String location;
	String phoneNumber;
	String password;
	Role loginUserRole;
	History customerHistory;
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getLocation() {
		return location;
	}
	
	public void setLocation(String location) {
		this.location = location;
	}
	
	public String getPhoneNumber() {
		return phoneNumber;
	}
	
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public Role getLoginUserRole() {
		return loginUserRole;
	}
	
	public void setLoginUserRole(Role loginUserRole) {
		this.loginUserRole = loginUserRole;
	}

	public CustomerDetails(String name, String location, String phoneNumber, String password, Role loginUserRole) {
		this.name = name;
		this.location = location;
		this.phoneNumber = phoneNumber;
		this.password = password;
		this.loginUserRole = loginUserRole;
	}
	
	public CustomerDetails(String name, String location, String phoneNumber) {
		this.name = name;
		this.location = location;
		this.phoneNumber = phoneNumber;
	}
	
	
}
