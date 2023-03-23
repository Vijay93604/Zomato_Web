package model;

import java.util.ArrayList;
import java.util.Date;

public class History {
	
	String phoneNumber;
	Date date;
	String hotelName;
	int totalAmount;
	String deliveredAddress;
	int hotelId;
	ArrayList<String> foodName = new ArrayList<>();
	ArrayList<Integer> foodCount = new ArrayList<>();
	

	public History(String phoneNumber, Date date, String hotelName, int totalAmount, String deliveredAddress,
			ArrayList<String> foodName, ArrayList<Integer> foodCount ,int hotelId) {
		this.phoneNumber = phoneNumber;
		this.date = date;
		this.hotelName = hotelName;
		this.totalAmount = totalAmount;
		this.deliveredAddress = deliveredAddress;
		this.foodName = foodName;
		this.foodCount = foodCount;
		this.hotelId = hotelId;
	}
	
	

	public int getHotelId() {
		return hotelId;
	}

	public void setHotelId(int hotelId) {
		this.hotelId = hotelId;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}
	
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	
	public Date getDate() {
		return date;
	}
	
	public void setDate(Date date) {
		this.date = date;
	}
	
	public String getHotelName() {
		return hotelName;
	}
	
	public void setHotelName(String hotelName) {
		this.hotelName = hotelName;
	}
	
	public int getTotalAmount() {
		return totalAmount;
	}
	
	public void setTotalAmount(int totalAmount) {
		this.totalAmount = totalAmount;
	}
	
	public String getDeliveredAddress() {
		return deliveredAddress;
	}
	
	public void setDeliveredAddress(String deliveredAddress) {
		this.deliveredAddress = deliveredAddress;
	}
	
	public ArrayList<String> getFoodName() {
		return foodName;
	}
	
	public void setFoodName(ArrayList<String> foodName) {
		this.foodName = foodName;
	}
	
	public ArrayList<Integer> getFoodPrice() {
		return foodCount;
	}
	
	public void setFoodPrice(ArrayList<Integer> foodCount) {
		this.foodCount = foodCount;
	}
	
	
	
}
