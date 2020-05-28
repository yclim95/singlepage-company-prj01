CREATE DATABASE mydba;

CREATE TABLE `mydba`.`leadregister` 
( `id` INT NOT NULL AUTO_INCREMENT , 
 `fname` VARCHAR(64) NOT NULL , 
`lname` VARCHAR(64) NOT NULL , 
`phone` VARCHAR(11) NOT NULL , 
`email` VARCHAR(30) NOT NULL , 
`password` VARCHAR(12) NOT NULL , 
`fcourse` VARCHAR(64) NOT NULL , 
 PRIMARY KEY (`id`)
 ) 
 ENGINE = InnoDB;