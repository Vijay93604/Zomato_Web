package model;

import Enums.DeliveryBoyStatus;

public class DeliveryBoy {
	
	String name;
	int id;
	String phoneNumber;
	String location;
	String status;
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public String getPhoneNumber() {
		return phoneNumber;
	}
	
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	
	public String getLocation() {
		return location;
	}
	
	public void setLocation(String location) {
		this.location = location;
	}
	
	public String getStatus() {
		return status;
	}
	
	public void setStatus(String status) {
		this.status = status;
	}

	public DeliveryBoy(String name, int id, String phoneNumber, String location, String status) {
		this.name = name;
		this.id = id;
		this.phoneNumber = phoneNumber;
		this.location = location;
		this.status = status;
	}

	public DeliveryBoy(String name, String phoneNumber) {
		this.name = name;
		this.phoneNumber = phoneNumber;
	}
	
	
	
}
