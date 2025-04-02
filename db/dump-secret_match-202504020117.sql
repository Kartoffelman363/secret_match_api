-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: secret_match
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `uid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admins_unique` (`uid`),
  CONSTRAINT `admins_users_FK` FOREIGN KEY (`uid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (4,1,18);
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `match`
--

DROP TABLE IF EXISTS `match`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `match` (
  `id` int NOT NULL AUTO_INCREMENT,
  `round_id` int NOT NULL,
  `uid1` int DEFAULT NULL,
  `uid2` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `match_unique` (`round_id`,`uid1`,`uid2`),
  KEY `match_users_FK` (`uid1`),
  KEY `match_users_FK_1` (`uid2`),
  CONSTRAINT `match_match_round_FK` FOREIGN KEY (`round_id`) REFERENCES `match_round` (`id`) ON DELETE CASCADE,
  CONSTRAINT `match_users_FK` FOREIGN KEY (`uid1`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `match_users_FK_1` FOREIGN KEY (`uid2`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match`
--

LOCK TABLES `match` WRITE;
/*!40000 ALTER TABLE `match` DISABLE KEYS */;
INSERT INTO `match` VALUES (9,2,7,11),(11,3,11,NULL),(10,3,18,7);
/*!40000 ALTER TABLE `match` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `match_round`
--

DROP TABLE IF EXISTS `match_round`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `match_round` (
  `id` int NOT NULL AUTO_INCREMENT,
  `start_time` datetime NOT NULL,
  `end_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match_round`
--

LOCK TABLES `match_round` WRITE;
/*!40000 ALTER TABLE `match_round` DISABLE KEYS */;
INSERT INTO `match_round` VALUES (2,'2025-04-01 17:40:32','2025-04-01 17:41:09'),(3,'2025-04-01 17:57:01','2025-04-01 17:57:18');
/*!40000 ALTER TABLE `match_round` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `match_round_signup`
--

DROP TABLE IF EXISTS `match_round_signup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `match_round_signup` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `round_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `match_round_signup_unique` (`uid`,`round_id`),
  KEY `match_round_signup_match_round_FK` (`round_id`),
  CONSTRAINT `match_round_signup_match_round_FK` FOREIGN KEY (`round_id`) REFERENCES `match_round` (`id`) ON DELETE CASCADE,
  CONSTRAINT `match_round_signup_users_FK` FOREIGN KEY (`uid`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match_round_signup`
--

LOCK TABLES `match_round_signup` WRITE;
/*!40000 ALTER TABLE `match_round_signup` DISABLE KEYS */;
INSERT INTO `match_round_signup` VALUES (9,7,2),(13,7,3),(10,11,2),(12,11,3),(11,18,3);
/*!40000 ALTER TABLE `match_round_signup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(320) NOT NULL,
  `password` char(60) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (7,'Martin Krpan','martinkrpan@siol.si','$2b$10$wAph8lxYTtZJu6tgwFQUxe3WshLHWB6Nh3re3EbW/iUgCk3shXxbm'),(11,'Martin Krpan','martinkrpan@sioll.si','$2b$10$5JD4U9/jiWWE2wii5hKWaewp54gaY1mAESepEqiv5PFT/epn9OStm'),(18,'Herr Komandant','admin@siol.si','$2b$10$HgCrLiswinOkLCDC5kCoce3Y6GdpG0iwfEALCE4.KIe2zJojMr3IO');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'secret_match'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-02  1:17:09
