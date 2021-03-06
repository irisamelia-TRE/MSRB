-- MySQL dump 10.13  Distrib 5.7.12, for osx10.9 (x86_64)
--
-- Host: cs4500304db.cxisifuxghwk.us-east-1.rds.amazonaws.com    Database: retirement_info
-- ------------------------------------------------------
-- Server version	5.6.35-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee` (
  `lastName` varchar(50) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `SSN` varchar(15) NOT NULL,
  `DoB` date DEFAULT NULL,
  `BeneficiaryDoB` date DEFAULT NULL,
  `USVeteran` varchar(6) NOT NULL,
  PRIMARY KEY (`SSN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('Slyme','Vinita','149-30-3854','1989-03-04','1980-02-23','FALSE'),
('Cagan','Standford','152-79-9476','1967-05-05','2025-02-09','FALSE'),
('Thorp','Ursulina','241-82-7985','1989-09-15','1995-12-01','FALSE'),
('Dunford','Cristen','305-13-5418','1942-01-08','1981-09-12','FALSE'),
('Joselevitch','Bonnee','336-19-5559','1987-08-23','1998-03-03','TRUE'),
('Eckley','Kerrie','343-90-5026','1984-10-25','2021-04-07','FALSE'),
('Meysham','Simonette','438-82-9840','1987-05-24','1972-10-25','FALSE'),
('Schulke','Marcos','447-52-5437','1958-05-21','1984-03-08','TRUE'),
('Whittet','Gino','490-87-0820','1974-06-25','1951-07-10','FALSE'),
('Corah','Emelen','751-68-1622','1970-09-04','1975-11-16','FALSE');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employment`
--

DROP TABLE IF EXISTS `employment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employment` (
  `EmploymentID` int(11) NOT NULL DEFAULT '0',
  `SSN` varchar(15) NOT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `groupClassification` int(11) DEFAULT NULL,
  `Salary` double DEFAULT NULL,
  PRIMARY KEY (`EmploymentID`),
  KEY `SSN_idx` (`SSN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employment`
--

LOCK TABLES `employment` WRITE;
/*!40000 ALTER TABLE `employment` DISABLE KEYS */;
INSERT INTO `employment` VALUES (1,'152-79-9475','1990-05-01','1990-12-31',4,21500),
(2,'152-79-9476','1991-01-01','1991-12-31',4,22807.2),
(3,'152-79-9476','1992-01-01','1992-12-30',4,24193.88),
(4,'152-79-9476','1992-12-31','1993-12-30',4,25664.87),
(5,'152-79-9476','1993-12-31','1994-12-30',4,27225.29),
(6,'152-79-9476','1994-12-31','1995-12-30',4,28880.59),
(7,'152-79-9476','1995-12-31','1996-12-29',4,30636.53),
(8,'152-79-9476','1996-12-30','1997-12-29',4,32499.23),
(9,'152-79-9476','1997-12-30','1998-12-29',4,34475.18),
(10,'152-79-9476','1998-12-30','1999-12-29',4,36571.27),
(11,'152-79-9476','1999-12-30','2000-12-28',4,38794.8),
(12,'152-79-9476','2000-12-29','2001-12-28',4,41153.53),
(13,'152-79-9476','2001-12-29','2002-12-28',4,43655.66),
(14,'152-79-9476','2002-12-29','2003-12-28',4,46309.93),
(15,'152-79-9476','2003-12-29','2004-12-27',4,64125.57),
(16,'152-79-9476','2004-12-28','2005-12-27',4,68024.41),
(17,'152-79-9476','2005-12-28','2006-12-27',4,72160.29),
(18,'152-79-9476','2006-12-28','2007-12-27',4,76547.64),
(19,'152-79-9476','2007-12-28','2008-12-26',4,81201.73),
(20,'152-79-9476','2008-12-27','2009-12-26',4,86138.8),
(21,'152-79-9476','2009-12-27','2010-12-26',4,91376.04),
(22,'152-79-9476','2010-12-27','2011-12-26',4,96931.7),
(23,'152-79-9476','2011-12-27','2012-12-25',4,102825.15),
(24,'152-79-9476','2012-12-26','2013-12-25',4,109076.92),
(25,'152-79-9476','2013-12-26','2014-12-25',4,115708.79),
(26,'152-79-9476','2014-12-26','2015-12-25',4,122743.89),
(27,'152-79-9476','2015-12-26','2016-12-24',4,130206.71),
(28,'152-79-9476','2016-12-25','0000-00-00',4,138123.28),
(29,'305-13-5418','2009-07-09','2009-12-31',1,9600),
(30,'305-13-5418','2010-01-01','2010-12-31',1,9984),
(31,'305-13-5418','2011-01-01','2011-12-31',1,10383.36),
(32,'305-13-5418','2012-01-01','2012-12-31',1,10798.69),
(33,'305-13-5418','2013-01-01','2013-12-31',1,11230.64),
(34,'305-13-5418','2014-01-01','2014-12-31',1,11679.87),
(35,'305-13-5418','2015-01-01','2015-12-31',1,12147.06),
(36,'305-13-5418','2016-01-01','2016-12-31',1,12632.95),
(37,'305-13-5418','2017-01-01','2017-12-31',1,13138.26),
(38,'343-90-5026','2015-06-01','2016-09-30',1,55000),
(39,'343-90-5026','2016-10-01','0000-00-00',1,59000),
(40,'751-68-1622','2005-11-22','2010-05-06',1,38000),
(41,'751-68-1622','2016-06-03','2016-12-31',2,42000),
(42,'751-68-1622','2017-01-01','0000-00-00',2,44320),
(43,'490-87-0820','1986-03-21','1990-01-19',1,22000),
(44,'490-87-0820','1990-01-20','1991-12-31',1,23339.8),
(45,'490-87-0820','1992-01-01','1992-12-31',1,24761.19),
(46,'490-87-0820','1993-01-01','1993-12-31',1,26269.15),
(47,'490-87-0820','1994-01-01','1994-12-31',1,27868.94),
(48,'490-87-0820','1995-01-01','1995-12-31',1,29566.16),
(49,'490-87-0820','1996-01-01','1996-05-04',1,31366.74),
(50,'490-87-0820','1996-05-05','1999-11-21',1,33276.97),
(51,'490-87-0820','2005-05-29','2012-11-22',1,65030),
(52,'490-87-0820','2012-11-23','0000-00-00',1,82000),
(53,'241-82-7985','2008-05-01','2008-09-01',1,5760),
(54,'241-82-7985','2009-05-01','2009-09-01',1,6400),
(55,'241-82-7985','2010-05-01','2010-09-01',1,7040),
(56,'241-82-7985','2011-06-02','2013-06-02',1,42500),
(57,'241-82-7985','2013-06-03','2015-12-31',1,46785),
(58,'241-82-7985','2016-01-01','0000-00-00',1,50150),
(59,'447-52-5437','1992-03-14','1994-06-23',1,26500),
(60,'447-52-5437','1994-06-24','1995-08-06',1,27840.9),
(61,'447-52-5437','1995-08-07','1998-05-05',1,29249.65),
(62,'447-52-5437','1998-05-06','1998-12-31',2,36000),
(63,'447-52-5437','1999-01-01','1999-12-31',2,37800),
(64,'447-52-5437','2000-01-01','2000-12-31',2,39690),
(65,'447-52-5437','2001-01-01','2001-12-31',2,41674.5),
(66,'447-52-5437','2002-01-01','2002-12-31',2,43758.23),
(67,'447-52-5437','2003-01-01','2003-12-31',2,45946.14),
(68,'447-52-5437','2004-01-01','2004-12-31',2,48243.44),
(69,'447-52-5437','2005-01-01','2005-12-31',2,50655.62),
(70,'447-52-5437','2006-01-01','2006-04-02',2,53188.4),
(71,'447-52-5437','2006-04-03','2006-12-31',4,65000),
(72,'447-52-5437','2007-01-01','2007-12-31',4,67600),
(73,'447-52-5437','2008-01-01','2008-12-31',4,70304),
(74,'447-52-5437','2009-01-01','2009-12-31',4,73116.16),
(75,'447-52-5437','2010-01-01','2010-12-31',4,76040.81),
(76,'447-52-5437','2011-01-01','2011-12-31',4,79082.44),
(77,'447-52-5437','2012-01-01','2012-12-31',4,82245.74),
(78,'447-52-5437','2013-01-01','2013-12-31',4,85535.57),
(79,'447-52-5437','2014-01-01','2014-12-31',4,88956.99),
(80,'447-52-5437','2015-01-01','2015-12-31',4,92515.27),
(81,'447-52-5437','2016-01-01','2016-12-31',4,96215.88),
(82,'447-52-5437','2017-01-01','0000-00-00',4,100064.51),
(83,'438-82-9840','2013-03-02','2016-04-07',1,52000),
(84,'149-30-3854','2011-07-02','2012-08-14',1,48500),
(85,'149-30-3854','2013-09-28','2014-08-13',1,50000),
(86,'149-30-3854','2014-08-14','2015-12-31',1,52540),
(87,'149-30-3854','2016-01-01','2016-12-31',1,68940),
(88,'149-30-3854','2017-01-01','0000-00-00',1,72135),
(89,'232-37-1597','1991-05-01','1991-09-01',1,2880),
(90,'232-37-1597','1992-05-01','1992-09-01',1,3120),
(91,'232-37-1597','2008-07-01','2008-12-31',1,35000),
(92,'232-37-1597','2009-01-01','2009-12-31',1,36400),
(93,'232-37-1597','2010-01-01','2010-12-31',1,37856),
(94,'232-37-1597','2011-01-01','2011-12-31',1,39370.24),
(95,'232-37-1597','2012-01-01','2012-12-31',1,40945.05),
(96,'232-37-1597','2013-01-01','2013-12-31',1,42582.85),
(97,'232-37-1597','2014-01-01','2014-12-31',1,44286.17),
(98,'232-37-1597','2015-01-01','2015-12-31',1,46057.61),
(99,'232-37-1597','2016-01-01','2016-12-31',1,47899.92),
(100,'232-37-1597','2017-01-01','0000-00-00',1,49815.91);
/*!40000 ALTER TABLE `employment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'retirement_info'
--

--
-- Dumping routines for database 'retirement_info'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-01 13:01:53
