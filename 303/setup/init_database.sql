CREATE DATABASE calculator;
\c calculator;
CREATE TABLE EMPLOYEE (SSN INT PRIMARY KEY	NOT NULL, FIRST_NAME TEXT NOT NULL, LAST_NAME TEXT NOT NULL, PASSWORD TEXT NOT NULL, DOB DATE NOT NULL, BENEFICIARY_DOB DATE, VETERAN BOOLEAN NOT NULL);
CREATE TABLE EMPLOYMENT (SSN INT PRIMARY KEY NOT NULL, START_DATE DATE NOT NULL, END_DATE DATE NOT NULL, GROUP_NO TEXT NOT NULL, SALARY INT NOT NULL);
