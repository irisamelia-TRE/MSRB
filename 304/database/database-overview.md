----------

Employment Database
=======
 Database Overview
----------

The employment database tracks all activity related to MA state employment - it
contains employment records for both current and former state employees that
allows a user to recreate the employment history for a given employee.

Database Tables
--------------------

Employee - contains biographical information related to state employees. Any
employee who has ever worked for the state in any capacity would have an entry
in this database.

Fields:

 - lastName: VARCHAR(50), the last name of the employee.
 - firstName: VARCHAR(50), the first name of the employee.
 - SSN: VARCHAR(15), the social security number of the employee represented as a
   string in xxx-xx-xxxx format. Primary key.
 - DoB: Date, the date of birth of the employee.
 - BeneficiaryDoB: Date, the date of birth of the designated beneficiary of the
   employee.
 - USVeteran: VARCHAR(6), TRUE if the employee is a veteran and FALSE if they
   are not.

Employment - contains information on each period of employment that an employee
had in a particular job. Employees can have one or more entries in this
database, depending on how many jobs/salary levels they have had over their time
with the state. A new entry is added whenever salary or group classification is
changed, or if an employee leaves state service either temporarily or
permanently.

Fields:

 - EmploymentID: int, an ID number to provide a unique key for each row. Primary key.
 - SSN: VARCHAR(15), the social security number of the employee represented as a
   string in xxx-xx-xxxx format. Foreign key to Employee table.
 - startDate: Date, the start date of a given period of employment.
 - endDate: Date, the end date of a given period of employment. If this field is
   null, the employee is currently working in this employment.
 - groupClassification: int, the group classification of the position held
   during this period of employment, either 1, 2, or 4.
 - Salary: double, the annual salary of the employee in dollars and cents.

## Connecting to the Database ##
The backend calculator automatically connects to the database instance - no
manual connection is needed. To substitute our database with another database
using the same schema, the connection parameters and credentials in
backend/src/main/resources/application.properties must be changed to connect to
the new database.

Connection credentials are available in
backend/src/main/resources/application.properties, but should not be needed for
normal operation of the calculator.

## Database Integration ##
The database is integrated into the backend through the [JDBC
Driver](https://dev.mysql.com/doc/connector-j/5.1/en/connector-j-usagenotes-connect-drivermanager.html) -
the standard connection interface between Java and mySQL. The required .jar file
is packaged with the project, but it can also be found
[here].(https://dev.mysql.com/downloads/connector/j/) for reference.

