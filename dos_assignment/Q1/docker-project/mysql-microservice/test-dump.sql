
-- Table structure for table `user`
--CREATE DATABASE demo;

--use demo;

DROP TABLE IF EXISTS `user`;

CREATE TABLE IF NOT EXISTS `user` (
`id` int(11) NOT NULL COMMENT 'primary key',
  `name` varchar(255) NOT NULL COMMENT 'name',
  `age` int(11) NOT NULL COMMENT 'age',
  `department` varchar(255) NOT NULL COMMENT 'department',
  `subject` varchar(255) NOT NULL COMMENT 'subject',
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table `user`


LOCK TABLES `user` WRITE;
INSERT INTO `user` VALUES (1,'Anjali',23,'CS','DOS');
INSERT INTO `user` VALUES (2,'Sakshi',19,'CS','DOS');
INSERT INTO `user` VALUES (3,'Trupti',22,'CS','DOS');
INSERT INTO `user` VALUES (4,'Praju',22,'CS','DOS');

UNLOCK TABLES;
