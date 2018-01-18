# 306
Section 3 team 6
Authors: Sreeya Sai, John Compitello, Luciana Corteggiano, Daniel Chu, and Nick Smith

## Retirement Calculator
This system is a pension calculator for Massachusetts state employees.

##Usage instructions

* Ensure maven is installed on the development machine.

* Run the tests by running `mvn test` from command line in the 306 directory.

* Start the application by running `mvn spring-boot:run` from command line in 306 directory. 
You will see a lot of stuff printing, then at the end you should see `Tomcat started on port: <port-num>`.
Navitgagte to `http://localhost:<port-num>`, and the application should be running.

##Database Schema

   Column    |          Type          |                       Modifiers  
-------------+------------------------+-------------------------------------------------------  
 id          | integer                | not null default nextval('employee_id_seq'::regclass)  
 ssn         | character varying(15)  |  
 last_name   | character varying(130) |    
 first_name  | character varying(130) |  
 dob         | date                   |  
 beneficiary | date                   |  
 us_veteran  | boolean                |  
 
         Column        |   Type    | Modifiers  
 ----------------------+-----------+-----------  
  id                   | integer   | not null  
  employee_id          | integer   |  
  start_date           | date      |  
  end_date             | date      |  
  salary               | integer   |  
  group_classification | group_num |  

##Database transfer instructions

In order to switch to whatever database you are using, you'll have to do a few things.

First, you'll need to ensure that you have the correct JDBC drivers for your particular 
database. Best way to do this is to add a maven dependency that installs them. Ours is the 
`org.postregesql` dependency in our `pom.xml` file. 

Second, you'll need to go to the `DatabaseConfig.java` file and make a few changes. First, 
you'll likely want to replace the hard coded database username and password with environment 
variables since security will matter when you are using your actual production databse.
You'll then want to change the line that says `basicDataSource.setDriverClassName("org.postgresql.Driver");`
by replacing the string with the name of the JDBC driver you added in the first step. 

Finally, in the file `src/main/resources/persistence-postgresql.properties`, you'll want to change 
your hibernate dialect to the one that goes with the database you'll be using. 

Finally, you'll have to update the `Employee` and `Employment` classes to reflect the structure of
your actual database tables. 


##Project structure

Our project is setup as an AngularJS single page application, with a Java Spring Boot project as a 
backend. Our two Controllers, the `CalculatePensionController` and the `DatabaseController`, receive 
requests from the front end and delegate to services that perform the necessary calculations, then return
the information to the front end as JSON. 

##Contact

Please contact compitello.j@husky.neu.edu with questions.