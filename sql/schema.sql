CREATE DATABASE tasks_app;

USE tasks_app;

CREATE TABLE `tb_user` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(36) NOT NULL,
    `username` VARCHAR(20) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(128) NOT NULL,
    `password_salt` VARCHAR(36) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` DATETIME NULL DEFAULT NULL);


CREATE TABLE `tb_task` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL,
  `user_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `status` enum('pending','doing','done') NOT NULL DEFAULT 'pending',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `task_uuid_idx` (`uuid`),
  KEY `task_status_idx` (`status`),
  KEY `fk_task_user_id_idx` (`user_id`),
  FULLTEXT KEY `task_title_idx_fulltext` (`title`),
  CONSTRAINT `fk_task_user_id` FOREIGN KEY (`user_id`) REFERENCES `tb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
