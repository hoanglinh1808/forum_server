-- MySQL Script generated by MySQL Workbench
-- Wed Aug  8 23:12:36 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema forum_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema forum_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `forum_db` DEFAULT CHARACTER SET utf8 ;
USE `forum_db` ;

-- -----------------------------------------------------
-- Table `forum_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `forum_db`.`users` (
  `user_ID` INT(11) NOT NULL,
  `user_fullname` VARCHAR(45) NOT NULL,
  `user_password` VARCHAR(100) NOT NULL,
  `user_phone` VARCHAR(45) NOT NULL,
  `user_email` VARCHAR(45) NOT NULL,
  `user_role` SMALLINT(3) NOT NULL,
  `user_createdDate` DATETIME NOT NULL,
  `user_avatar` VARCHAR(300) NULL DEFAULT NULL,
  `user_gender` TINYINT NOT NULL,
  `user_DOB` DATETIME NOT NULL,
  PRIMARY KEY (`user_ID`),
  UNIQUE INDEX `user_ID_UNIQUE` (`user_ID` ASC),
  UNIQUE INDEX `user_phone_UNIQUE` (`user_phone` ASC),
  UNIQUE INDEX `user_email_UNIQUE` (`user_email` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `forum_db`.`posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `forum_db`.`posts` (
  `post_ID` INT(11) NOT NULL,
  `post_title` VARCHAR(45) NOT NULL,
  `post_content` VARCHAR(1000) NOT NULL,
  `post_attachment` VARCHAR(300) NULL DEFAULT NULL,
  `post_writer` INT NOT NULL,
  `post_verified` TINYINT(4) NOT NULL,
  `post_createdDate` DATETIME NOT NULL,
  PRIMARY KEY (`post_ID`),
  UNIQUE INDEX `post_ID_UNIQUE` (`post_ID` ASC),
  INDEX `user_ID_idx` (`post_writer` ASC),
  CONSTRAINT `post_writer`
    FOREIGN KEY (`post_writer`)
    REFERENCES `forum_db`.`users` (`user_ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `forum_db`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `forum_db`.`comments` (
  `comment_ID` INT(11) NOT NULL,
  `post_ID` INT(11) NOT NULL,
  `comment_content` VARCHAR(200) NOT NULL,
  `comment_writer` INT(11) NOT NULL,
  `comment_createdDate` DATETIME NOT NULL,
  PRIMARY KEY (`comment_ID`),
  UNIQUE INDEX `comment_ID_UNIQUE` (`comment_ID` ASC),
  INDEX `post_ID_idx` (`post_ID` ASC),
  CONSTRAINT `post_ID`
    FOREIGN KEY (`post_ID`)
    REFERENCES `forum_db`.`posts` (`post_ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `forum_db`.`comment_replies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `forum_db`.`comment_replies` (
  `reply_ID` INT(11) NOT NULL,
  `reply_content` VARCHAR(200) NOT NULL,
  `reply_writer` INT(11) NOT NULL,
  `reply_createdDate` DATETIME NOT NULL,
  `comment_ID` INT(11) NOT NULL,
  PRIMARY KEY (`reply_ID`),
  UNIQUE INDEX `reply_ID_UNIQUE` (`reply_ID` ASC),
  INDEX `comment_ID_idx` (`comment_ID` ASC),
  CONSTRAINT `comment_ID`
    FOREIGN KEY (`comment_ID`)
    REFERENCES `forum_db`.`comments` (`comment_ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
