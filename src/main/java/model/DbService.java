package model;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.http.Cookie;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.google.gson.Gson;
import com.mysql.cj.xdevapi.Result;

import ApplicationVariables.DbConnection;
import Enums.Cuisine;
import Enums.DeliveryBoyStatus;
import Enums.Role;
public class DbService {
		
	public static String addNewUser(JSONObject json) {
		PreparedStatement pst = null;
		ResultSet rs = null;
		try {
			
			pst = DbConnection.dbConnection.prepareStatement("Select Phone_Number,Password from Customer_Details");
			rs = pst.executeQuery();
			
			while(rs.next()) {
				System.out.println(rs.getString(1)+"  "+rs.getString(2));
				if(rs.getString(1).equals((String)json.get("phoneNum"))) {
					return "User Already Exist Login to Continue";
				}
			}
			
			pst = DbConnection.dbConnection.prepareStatement("insert into Customer_Details values(?,?,?,?,?)");
			pst.setString(1, (String)json.get("name"));
			pst.setString(2, (String)json.get("location"));
			pst.setString(3, (String)json.get("phoneNum"));
			pst.setString(4, (String)json.get("password"));
			pst.setString(5, "USER");
			pst.execute();
			return "SignUp Successful Login to continue";
			
		}catch(Exception ex) {
			
		}
		
		return "";
	}
	
	public static CustomerDetails getLoginedUser(String phoneNum ,String password) {
		CustomerDetails temp = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		
		try {
			ps = DbConnection.dbConnection.prepareStatement("select * from Customer_Details");
			rs = ps.executeQuery();
			while(rs.next()) {
				if(rs.getString(3).equals(phoneNum) && rs.getString(4).equals(password)) {
					if(rs.getString(5).equals("ADMIN")) {
						temp = new CustomerDetails(rs.getString(1), rs.getString(2), rs.getString(3), rs.getString(4), Role.ADMIN);
						return temp;
					}else {
						temp = new CustomerDetails(rs.getString(1), rs.getString(2), rs.getString(3), rs.getString(4), Role.USER);
						return temp;
					}
					
				}
			}
		}catch(Exception ex) {
			
		}
		return null;
	}	
	
	public static void addCookie(String uid ,String phoneNumber) {
		PreparedStatement pst = null;
		try {
			pst = DbConnection.dbConnection.prepareStatement("insert into Session values(? ,?)");
			pst.setString(1, phoneNumber);
			pst.setString(2, uid);
			pst.execute();
		}catch(Exception ex) {
			ex.printStackTrace();
		}
		
	}
	
	public static String addDeliveryBoy(JSONObject json) {
		
		String name = (String)json.get("name");
		String phoneNum = (String)json.get("phoneNumber");
		String location = (String)json.get("location");
		PreparedStatement ps = null;
		
		
		
		try {
			ps = DbConnection.dbConnection.prepareStatement("select Phone_Number,Id from Delivery_Boy where Phone_Number=?");
			ps.setString(1, phoneNum);
			ResultSet rs = ps.executeQuery(); 
			if(rs.next()) {
				return "Delivery Boy Already Exist";
			}
			ps =  DbConnection.dbConnection.prepareStatement("insert into Delivery_Boy(Name,Phone_Number,Location,Status) values(?,?,?,?)");
			ps.setString(1, name);
			ps.setString(2, phoneNum);
			ps.setString(3, location);
			ps.setString(4, "FREE");
			ps.execute();
			return "Delivery Boy Added Successfully";
		}catch(Exception ex) {
			
		}
		
		return "";
	}
	
	public static String showCustomerDetails() {
		
		JSONArray jsonArr = new JSONArray();
		JSONObject json = new JSONObject();
		PreparedStatement pst = null;
		ResultSet rs = null;
		ArrayList<CustomerDetails> cusDetails = new ArrayList<>();
		try {
			pst = DbConnection.dbConnection.prepareStatement("Select Name,Location,Phone_Number from Customer_Details where Role='USER'");
			rs = pst.executeQuery();
			while(rs.next()) {
				cusDetails.add(new CustomerDetails(rs.getString(1), rs.getString(2), rs.getString(3)));
			}
			Gson gs = new Gson();
			String json1 = gs.toJson(cusDetails);
			System.out.println(json1+" returned Json");
			return json1;
			
		}catch(Exception ex) {
			ex.printStackTrace();
		}
		return "";
	}
	
	public static String showDeliveryBoyDetails() {
		PreparedStatement ps = null;
		ResultSet rs = null;
		ArrayList<DeliveryBoy> allDeliveryBoys = new ArrayList<>();
		try {
			ps = DbConnection.dbConnection.prepareStatement("Select * from Delivery_Boy");
			rs = ps.executeQuery();
			while(rs.next()) {
//				String name, int id, String phoneNumber, String location, DeliveryBoyStatus status
				allDeliveryBoys.add(new DeliveryBoy(rs.getString(1), rs.getInt(2), rs.getString(3), rs.getString(4), rs.getString(5)));
			}
			
			Gson gs = new Gson();
			String json = gs.toJson(allDeliveryBoys);
			System.out.println(json);
			return json;
			
		}catch(Exception ex) {
			ex.printStackTrace();
		}
		return "";
	}
	
	@SuppressWarnings("unchecked")
	public static String addHotel(JSONObject json) {
		
		String hotelName = (String)json.get("hotelName");
		String hotelLocation = (String)json.get("hotelLocation");
		String actualAddress = (String)json.get("actualAddress");
		String cuisine = (String)json.get("cuisine");
		int averagePriceFor2Person = Integer.valueOf((String)json.get("averagePrice"));
		
		ArrayList<String> foodNames = (ArrayList<String>)json.get("foodNames");
		ArrayList<Integer> foodPrices = new ArrayList<>();
		
		ArrayList<String> foodPriceInString = (ArrayList<String>)json.get("foodPrices");
		
		foodPriceInString.stream().forEach((val) -> foodPrices.add(Integer.valueOf(val)));
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			ps = DbConnection.dbConnection.prepareStatement("Insert into Hotels(Hotel_Name ,Location ,Address ,Cuisine ,Average_Price_For_2_Person, Description) values(? ,? ,? ,? ,? ,?)");
			ps.setString(1, hotelName);
			ps.setString(2, hotelLocation);
			ps.setString(3, actualAddress);
			ps.setString(4, cuisine);
			ps.setInt(5, averagePriceFor2Person);
			ps.setString(6, (String)json.get("description"));
			ps.execute();
			ps = DbConnection.dbConnection.prepareStatement("Select Hotel_Id from Hotels order by Hotel_Id desc Limit 1");
			rs = ps.executeQuery();
			int id = 0;
			if(rs.next()) {
			   id = rs.getInt(1);
			}
			for(int i = 0 ; i < foodNames.size() ; i++) {
				ps = DbConnection.dbConnection.prepareStatement("Insert into Hotel_Food_And_Price values(? ,? ,?)");
				ps.setInt(1, id);
				ps.setString(2, foodNames.get(i));
				ps.setInt(3, foodPrices.get(i));
				ps.execute();
			}
			return "Hotel Added Successfully";
		}catch(Exception ex) {
			ex.printStackTrace();
		}
																												
		return "";
	}
	
	@SuppressWarnings("unchecked")
	public static String getAllHotels() {
		JSONArray jsonArr = new JSONArray();
		JSONObject jobj = new JSONObject();
		PreparedStatement ps = null;
		ResultSet rs = null;
		ResultSet rs2 = null;
		int count = 0;
		int ratings = 0;
		PreparedStatement ps2 = null;
		ResultSet rs3 = null;
		int row = 0;
		try {
			ps = DbConnection.dbConnection.prepareStatement("select Hotel_Id,Hotel_Name,Location,Cuisine,Average_Price_For_2_Person from Hotels");
			rs = ps.executeQuery();
			
			while(rs.next()) {
				jobj.put("hotelId", rs.getInt(1));
				jobj.put("hotelName", rs.getString(2));
				jobj.put("hotelLocation", rs.getString(3));
				jobj.put("hotelCuisine", rs.getString(4));
				jobj.put("price", rs.getInt(5));
				
				ps = DbConnection.dbConnection.prepareStatement("select Hotel_Id,star from Ratings where Hotel_Id=?");
				ps.setString(1 ,rs.getString(1));
				ps2 = DbConnection.dbConnection.prepareStatement("select count(*) from Ratings where Hotel_Id=?");
				ps2.setString(1, rs.getString(1));
				rs3 = ps2.executeQuery();
				rs2 = ps.executeQuery();
				
				if(rs3.next()) {
					row = rs3.getInt(1);
				}
				
				if(row == 0) {
					jobj.put("ratings", 0);
				}else {
					while(rs2.next()) {
						count++;
						ratings += rs2.getInt(2); 
					}
					jobj.put("ratings", ratings/count);
				}
				
				jsonArr.add(jobj);
				jobj = new JSONObject();
				ratings = 0;
				count = 0;
			}
			return jsonArr.toJSONString();
		}catch(Exception ex) {
			ex.printStackTrace();
		}
		
		return "";
	}
	
	@SuppressWarnings("unchecked")
	public static String searchedHotel(String inp) {
		
		PreparedStatement ps = null;
		ResultSet rs = null;
		ArrayList<String> hotelNames = new ArrayList<>();
		JSONArray jsonArr = new JSONArray();
		JSONObject jobj = new JSONObject();
		ResultSet rs2 = null;
		int count = 0;
		int ratings = 0;
		PreparedStatement ps2 = null;
		ResultSet rs3 = null;
		int row = 0;
		
		try {
			ps = DbConnection.dbConnection.prepareStatement("select Hotel_Name from Hotels");
			rs = ps.executeQuery();
			while(rs.next()) {
				if(rs.getString(1).toLowerCase().contains(inp.toLowerCase())) {
					hotelNames.add(rs.getString(1));
				}
			}
			if(hotelNames.size() == 0) {
				return "No Hotel Found";
			}
			System.out.println(hotelNames);
			for(String name : hotelNames) {
				ps = DbConnection.dbConnection.prepareStatement("select Hotel_Id,Hotel_Name,Location,Cuisine,Average_Price_For_2_Person from Hotels where Hotel_Name=?");
				ps.setString(1, name);
				rs = ps.executeQuery();
				
				while(rs.next()) {
					jobj.put("hotelId", rs.getInt(1));
					jobj.put("hotelName", rs.getString(2));
					jobj.put("hotelLocation", rs.getString(3));
					jobj.put("hotelCuisine", rs.getString(4));
					jobj.put("price", rs.getInt(5));
					
					ps = DbConnection.dbConnection.prepareStatement("select Hotel_Id,star from Ratings where Hotel_Id=?");
					ps2 = DbConnection.dbConnection.prepareStatement("select count(*) from Ratings where Hotel_Id=?");
					ps2.setString(1, rs.getString(1));
					ps.setString(1 ,rs.getString(1));
					rs2 = ps.executeQuery();
					rs3 = ps2.executeQuery();
					if(rs3.next()) {
						row = rs3.getInt(1);
					}
					
					if(row == 0) {
						jobj.put("ratings", 0);
					}else {
						while(rs2.next()) {
							count++;
							ratings += rs2.getInt(2); 
						}
						jobj.put("ratings", ratings/count);
					}
					
					jsonArr.add(jobj);
					jobj = new JSONObject();
					ratings = 0;
					count = 0;
				}
				
			}
			return jsonArr.toJSONString();
		}catch(Exception ex) {
			ex.printStackTrace();
		}
		
		return "";
	}
	
	@SuppressWarnings("unchecked")
	public static String getDetailsOfSelectedHotel(int id) {
		JSONArray json = new JSONArray();
		JSONObject jobj = new JSONObject();
		PreparedStatement ps = null;
		ResultSet rs = null;
		int hotelId = 0;
		String hotelName = "";
		String location = "";
		String address ="";
		Cuisine cuisine = null;
		String description = "";
		int averagePriceForTwoPerson = 0;
		ArrayList<String> foodName = new ArrayList<>();
		ArrayList<Integer> foodPrice = new ArrayList<>();
		int count = 0;
		int rating = 0;
		PreparedStatement ps2 = null;
		ResultSet rs2 = null;
		int row = 0;
		int actualRating = 0;
		try {
			ps = DbConnection.dbConnection.prepareStatement("select * from Hotels where Hotel_Id=?");
			ps.setInt(1, id);
			rs = ps.executeQuery();
			
			if(rs.next()) {
				hotelId = rs.getInt(1);
				hotelName = rs.getString(2);
				location = rs.getString(3);
				address = rs.getString(4);
				cuisine = Cuisine.valueOf(rs.getString(5));
				averagePriceForTwoPerson = rs.getInt(6);
				description = rs.getString(7);
			}
			
			ps = DbConnection.dbConnection.prepareStatement("select * from Hotel_Food_And_Price where Hotel_Id=?");
			ps.setInt(1, id);
			rs = ps.executeQuery();
			
			while(rs.next()) {
				foodName.add(rs.getString(2));
				foodPrice.add(rs.getInt(3));
			}
			
			ps = DbConnection.dbConnection.prepareStatement("select Hotel_Id,star from Ratings where Hotel_Id=?");
			ps2 = DbConnection.dbConnection.prepareStatement("select count(*) from Ratings where Hotel_Id=?");
			ps.setInt(1, id);
			ps2.setInt(1, id);
			rs = ps.executeQuery();
			rs2 = ps2.executeQuery();
			
			if(rs2.next()) {
				row = rs2.getInt(1);
			}
			
			if(row == 0) {
				actualRating = 0;
			}else {
				while(rs.next()) {
					count++;
					rating += rs.getInt(2);
				}
				actualRating = rating/count;
			}
			
			
			Hotels selectedHotel = new Hotels(hotelId, hotelName, location, address, cuisine, description, averagePriceForTwoPerson, foodName, foodPrice ,actualRating);  
			String hotelDetails = new Gson().toJson(selectedHotel);
			return hotelDetails;
			
		}catch(Exception ex) {
			ex.printStackTrace();
		}
		
		return "";
	}
	
	public static String getRatings(int id) {
		
		PreparedStatement ps = null;
		ResultSet rs = null;
		ArrayList<Ratings> allRatings = new ArrayList<Ratings>();
		Ratings temp = null;
		try {
			ps = DbConnection.dbConnection.prepareStatement("Select * from Ratings where Hotel_Id=?");
			ps.setInt(1, id);
			rs = ps.executeQuery();
			
			while(rs.next()) {
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				Date date = dateFormat.parse(rs.getString(3));
				temp = new Ratings(rs.getInt(1) ,rs.getInt(5) ,rs.getString(2) ,date ,rs.getString(4));
				allRatings.add(temp);
			}
			
			return new Gson().toJson(allRatings);
		}catch(Exception ex) {
			ex.printStackTrace();
		}
		
		return "";
	}
	
	public static String addRatings(String comment ,String star ,Cookie[] userDetails ,int hotelId) {
		String sId = "";
		PreparedStatement ps = null;
		ResultSet rs = null;
		String num = "";
		String userName = ""; 
		for(Cookie c : userDetails) {
			if(c.getName().equals("SessionId")) {
				sId = c.getValue();
				try {
					ps = DbConnection.dbConnection.prepareStatement("select Phone_Number from Session where session_Id=?");
					ps.setString(1, sId);
					rs = ps.executeQuery();
					if(rs.next()) {
						num = rs.getString(1);
						ps = DbConnection.dbConnection.prepareStatement("select Name from Customer_Details where Phone_Number=?");
						ps.setString(1, num);
						rs = ps.executeQuery();
						if(rs.next()) {
							userName = rs.getString(1);
						}
					}
				}catch(Exception ex) {
					ex.printStackTrace();
				}
				
				LocalDate date = LocalDate.now();
				
				try {
					ps = DbConnection.dbConnection.prepareStatement("Insert into Ratings values(? ,? ,? ,? ,?)");
					ps.setInt(1, hotelId);
					ps.setString(2, userName);
					ps.setString(3, date+"");
					ps.setString(4, comment);
					ps.setString(5, star);
					ps.execute();
					return "Added";
				}catch(Exception ex) {
					ex.printStackTrace();
				}
				
			}
		}
		
		return "";
	}
	
	public static String orderFood(JSONObject json ,Cookie[] cookie) {
		
		PreparedStatement ps = null;
		ResultSet rs = null;
		String sId = "";
		String phoneNum = "";
		int orderId = 0;
		try {
			
			for(Cookie c : cookie) {
				if(c.getName().equals("SessionId")) {
					sId = c.getValue();
					try {
						ps = DbConnection.dbConnection.prepareStatement("select Phone_Number from Session where session_Id=?");
						ps.setString(1, sId);
						rs = ps.executeQuery();
						if(rs.next()) {
							phoneNum = rs.getString(1);
						}
					}catch(Exception ex) {
						ex.printStackTrace();
					}
				}
			}
			LocalDate date = LocalDate.now();
			ps =  DbConnection.dbConnection.prepareStatement("Insert into History(Phone_Number,Date,Hotel_Name,Total_Amount,Address_Deliveried,Hotel_Id) values(?,?,?,?,?,?)");
			ps.setString(1, phoneNum);
			ps.setString(2, date+"");
			ps.setString(3, (String)json.get("hotelName"));
			ps.setInt(4, Integer.valueOf((String)json.get("totalAmount")));
			ps.setString(5 ,(String)json.get("address"));
			long temp5 = (long)json.get("hotelId");
			ps.setInt(6, Integer.valueOf(temp5+""));
			ps.execute();
			
			JSONArray foodCount = (JSONArray)json.get("orderedFoodCount");
			JSONArray foodName = (JSONArray)json.get("orderFoodNames");
			
			ps = DbConnection.dbConnection.prepareStatement("Select Order_Id from History order by Order_Id desc Limit 1");
//			above TODO
			rs = ps.executeQuery();
			
			if(rs.next()) {
				orderId = rs.getInt(1);
			}
			
			for(int i = 0 ; i < foodCount.size() ; i++) {
				ps = DbConnection.dbConnection.prepareStatement("insert into Customer_Food_History values(?,?,?,?)");
//				TODO
				ps.setString(1 ,phoneNum);
				ps.setString(2, (String)foodName.get(i));
				long temp = (long)foodCount.get(i);
				int fCount = Integer.valueOf(temp+"");
				ps.setInt(3, fCount);
				ps.setInt(4, orderId);
				ps.execute();
				
			}
			
			
		}catch(Exception ex) {
			ex.printStackTrace();
		}
		
		try {
			ps = DbConnection.dbConnection.prepareStatement("Select Name,Phone_Number,Status,Id from Delivery_Boy where Status=?");
			ps.setString(1, "FREE");
			rs = ps.executeQuery();
			rs.next();
			
			DeliveryBoy currentDeliveryBoy = new DeliveryBoy(rs.getString(1), rs.getString(2));
			ps = DbConnection.dbConnection.prepareStatement("Update Delivery_Boy Set Status='WORK' WHERE Id=?");
			ps.setInt(1, rs.getInt(4));
			ps.execute();
			return new Gson().toJson(currentDeliveryBoy);
		}catch(SQLException ex) {
			try {
				ps = DbConnection.dbConnection.prepareStatement("UPDATE DeliveryBoy SET Status='FREE' WHERE Status='WORK'");
				
				ps = DbConnection.dbConnection.prepareStatement("Select Name,Phone_Number,Status,Id from Delivery_Boy where Status=?");
				ps.setString(1, "FREE");
				rs = ps.executeQuery();
				rs.next();
				
				DeliveryBoy currentDeliveryBoy = new DeliveryBoy(rs.getString(1), rs.getString(2));
				ps = DbConnection.dbConnection.prepareStatement("Update Delivery_Boy Set Status='WORK' WHERE Id=?");
				ps.setInt(1, rs.getInt(4));
				ps.execute();
				return new Gson().toJson(currentDeliveryBoy);
			}catch(Exception ex2) {
				ex2.printStackTrace();
			}
			
		}
		
		return "";
	}
	
	public static String viewHistory(Cookie[] c) {
		ArrayList<History> allHistory = new ArrayList<>();
		PreparedStatement ps = null;
		ResultSet rs = null;
		String num = "";
		String sId = "";
// TODO
		try {
			for(Cookie co : c) {
				if(co.getName().equals("SessionId")) {
					sId = co.getValue();
					ps = DbConnection.dbConnection.prepareStatement("Select Phone_Number from Session where session_Id = ?");
					ps.setString(1, sId);
					rs = ps.executeQuery();

					if(rs.next()) {
						num = rs.getString(1);
					}
					
					ps = DbConnection.dbConnection.prepareStatement("Select * from History where Phone_Number = ?");
					ps.setString(1, num);
					rs = ps.executeQuery();
							
					while(rs.next()) {
						
						ArrayList<String> fName = new ArrayList<>();
						ArrayList<Integer> fCount = new ArrayList<>();
						
						String phoneNum = rs.getString(6);
						SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
						Date date = dateFormat.parse(rs.getString(1));
						String hName = rs.getString(2);
						int totalAmount = rs.getInt(3);
						String delAdd = rs.getString(4);
						
						int orderId = rs.getInt(5);
						int hotelId = rs.getInt(7);
						
						PreparedStatement ps2 = DbConnection.dbConnection.prepareStatement("select * from Customer_Food_History where Order_Id=?");
						ps2.setInt(1, orderId);
						
						ResultSet rs2 = ps2.executeQuery();
						while(rs2.next()) {
							
							fName.add(rs2.getString(2));
							fCount.add(rs2.getInt(3));
							
						}
						
						allHistory.add(new History(phoneNum, date, hName, totalAmount, delAdd, fName, fCount, hotelId));
						
					}
					
					return new Gson().toJson(allHistory);
					
				}
			}
			
		}catch(Exception ex) {
			ex.printStackTrace();
		}
		
		return "";
	}
	
}
