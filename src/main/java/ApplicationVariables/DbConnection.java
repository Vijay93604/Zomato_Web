package ApplicationVariables;

import java.sql.Connection;
import java.sql.DriverManager;

public class DbConnection {
	public static Connection dbConnection = null;
	public static DbConnection instance= null;
	
	public static DbConnection getInstance() {
		if(instance == null) {
			instance = new DbConnection();
			return instance;
		}
		return instance;
	}
	
	public static void getDbConnection() throws Exception {
		if(dbConnection == null) {
			Class.forName("com.mysql.cj.jdbc.Driver");
			dbConnection = DriverManager.getConnection("jdbc:mysql://localhost:3306/Zomato_Servlet","vijay","root");
		}
	}
}
