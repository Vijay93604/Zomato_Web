package model;

import java.util.ArrayList;
import java.util.Date;

public class Ratings {
	
	int hotel_id;
	int star;
	String name;
	Date date;
	String comments;
	
	
	
	public Ratings(int star) {
		this.star = star;
	}

	public Ratings(int hotel_id, int star, String name, Date date, String comments) {
		this.hotel_id = hotel_id;
		this.star = star;
		this.name = name;
		this.date = date;
		this.comments = comments;
	}

	public int getHotel_id() {
		return hotel_id;
	}

	public void setHotel_id(int hotel_id) {
		this.hotel_id = hotel_id;
	}

	public int getStar() {
		return star;
	}

	public void setStar(int star) {
		this.star = star;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getComments() {
		return comments;
	}
	
	public void setComments(String comments) {
		this.comments = comments;
	}
	
}
