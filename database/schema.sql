-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema papeleria
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `papeleria` ;

-- -----------------------------------------------------
-- Schema papeleria
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `papeleria` DEFAULT CHARACTER SET utf8mb4 ;
USE `papeleria` ;

-- -----------------------------------------------------
-- Table `papeleria`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `papeleria`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `apellido` VARCHAR(100) NULL,
  `email` VARCHAR(150) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `rol` VARCHAR(45) NOT NULL DEFAULT 'CLIENTE',
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `activo` TINYINT NULL DEFAULT 1,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `papeleria`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `papeleria`.`categoria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `activo` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `papeleria`.`producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `papeleria`.`producto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(150) NOT NULL,
  `descripcion` VARCHAR(255) NULL,
  `precio` DECIMAL(10,2) NOT NULL,
  `stock` INT NOT NULL,
  `categoria_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `activo` TINYINT NULL DEFAULT 1,
  `imagen_url` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  INDEX `categoria_id_idx` (`categoria_id` ASC) VISIBLE,
  CONSTRAINT `categoria_id`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `papeleria`.`categoria` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `papeleria`.`venta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `papeleria`.`venta` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuario_id` INT NOT NULL,
  `fecha_venta` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `estado` VARCHAR(45) NOT NULL DEFAULT 'PENDIENTE',
  PRIMARY KEY (`id`),
  INDEX `usuario_id_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `usuario_id`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `papeleria`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `papeleria`.`detalle_venta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `papeleria`.`detalle_venta` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `venta_id` INT NOT NULL,
  `producto_id` INT NOT NULL,
  `cantidad` INT NOT NULL DEFAULT 1,
  `precio_unitario` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `subtotal` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`id`),
  INDEX `venta_id_idx` (`venta_id` ASC) VISIBLE,
  INDEX `producto_id_idx` (`producto_id` ASC) VISIBLE,
  CONSTRAINT `venta_id`
    FOREIGN KEY (`venta_id`)
    REFERENCES `papeleria`.`venta` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `producto_id`
    FOREIGN KEY (`producto_id`)
    REFERENCES `papeleria`.`producto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
