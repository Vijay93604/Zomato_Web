package model;

import java.util.ArrayList;

import Enums.Cuisine;

public class Hotels {
	
	int hotelId;
	String hotelName;
	String location;
	String address;
	Cuisine cuisine;
	String description;
	int averagePriceForTwoPerson;
	int averageRating;
	ArrayList<String> foodName = new ArrayList<>();
	ArrayList<Integer> foodPrice = new ArrayList<>();
	Ratings hotelRatings;
	
	public Hotels(int hotelId, String hotelName, String location, String address, Cuisine cuisine, String description,
			int averagePriceForTwoPerson, ArrayList<String> foodName, ArrayList<Integer> foodPrice ,int averageRating) {
		
		this.hotelId = hotelId;
		this.hotelName = hotelName;
		this.location = location;
		this.address = address;
		this.cuisine = cuisine;
		this.description = description;
		this.averagePriceForTwoPerson = averagePriceForTwoPerson;
		this.foodName = foodName;
		this.foodPrice = foodPrice;
		this.averageRating = averageRating;
	}

	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Ratings getHotelRatings() {
		return hotelRatings;
	}

	public void setHotelRatings(Ratings hotelRatings) {
		this.hotelRatings = hotelRatings;
	}

	public int getHotelId() {
		return hotelId;
	}
	
	public void setHotelId(int hotelId) {
		this.hotelId = hotelId;
	}
	
	public String getHotelName() {
		return hotelName;
	}
	
	public void setHotelName(String hotelName) {
		this.hotelName = hotelName;
	}
	
	public String getLocation() {
		return location;
	}
	
	public void setLocation(String location) {
		this.location = location;
	}
	
	public String getAddress() {
		return address;
	}
	
	public void setAddress(String address) {
		this.address = address;
	}
	
	public Cuisine getCuisine() {
		return cuisine;
	}
	
	public void setCuisine(Cuisine cuisine) {
		this.cuisine = cuisine;
	}
	
	public int getAveragePriceForTwoPerson() {
		return averagePriceForTwoPerson;
	}
	
	public void setAveragePriceForTwoPerson(int averagePriceForTwoPerson) {
		this.averagePriceForTwoPerson = averagePriceForTwoPerson;
	}
	
	public ArrayList<String> getFoodName() {
		return foodName;
	}
	
	public void setFoodName(ArrayList<String> foodName) {
		this.foodName = foodName;
	}
	
	public ArrayList<Integer> getFoodPrice() {
		return foodPrice;
	}
	
	public void setFoodPrice(ArrayList<Integer> foodPrice) {
		this.foodPrice = foodPrice;
	}
		
}
