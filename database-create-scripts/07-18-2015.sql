-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               5.5.27 - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL Version:             9.1.0.4867
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for samson_inventory
CREATE DATABASE IF NOT EXISTS `samson_inventory` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `samson_inventory`;


-- Dumping structure for table samson_inventory.customers
CREATE TABLE IF NOT EXISTS `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `last_name` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `contact_info` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table samson_inventory.deliveries
CREATE TABLE IF NOT EXISTS `deliveries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `supplier_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `delivery_logs_supplier_id_to_suppliers_id` (`supplier_id`),
  KEY `delivery_logs_user_id_to_users_id` (`user_id`),
  CONSTRAINT `delivery_logs_supplier_id_to_suppliers_id` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `delivery_logs_user_id_to_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table samson_inventory.delivery_items
CREATE TABLE IF NOT EXISTS `delivery_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `delivery_id` int(11) DEFAULT NULL,
  `item_id` varchar(50) DEFAULT NULL,
  `actual_price` double DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `delivery_items_item_id_to_items_id` (`item_id`),
  KEY `delivery_items_delivery_id_to_deliveries_id` (`delivery_id`),
  CONSTRAINT `delivery_items_delivery_id_to_deliveries_id` FOREIGN KEY (`delivery_id`) REFERENCES `deliveries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `delivery_items_item_id_to_items_id` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table samson_inventory.items
CREATE TABLE IF NOT EXISTS `items` (
  `id` varchar(50) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `actual_price` double DEFAULT NULL,
  `selling_price_cash` double DEFAULT NULL,
  `selling_price_credit_card` double DEFAULT NULL,
  `selling_price_credit` double DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table samson_inventory.modes_of_payment
CREATE TABLE IF NOT EXISTS `modes_of_payment` (
  `id` int(11) NOT NULL,
  `mode_of_payment` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table samson_inventory.payments
CREATE TABLE IF NOT EXISTS `payments` (
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `receipt_id` int(11) unsigned zerofill DEFAULT NULL,
  `amount_paid` double DEFAULT NULL,
  `type_of_payment_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `payments_receipt_id_to_receipts_id` (`receipt_id`),
  KEY `payments_type_of_payment_id_to_types_of_payment_id` (`type_of_payment_id`),
  KEY `payments_user_id_to_users_id` (`user_id`),
  CONSTRAINT `payments_receipt_id_to_receipts_id` FOREIGN KEY (`receipt_id`) REFERENCES `receipts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `payments_type_of_payment_id_to_types_of_payment_id` FOREIGN KEY (`type_of_payment_id`) REFERENCES `types_of_payment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `payments_user_id_to_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table samson_inventory.receipts
CREATE TABLE IF NOT EXISTS `receipts` (
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) DEFAULT NULL,
  `mode_of_payment_id` int(11) DEFAULT NULL,
  `due_date` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `receipts_customer_id_to_customers_id` (`customer_id`),
  KEY `receipts_mode_of_payment_id_to_modes_of_payment_id` (`mode_of_payment_id`),
  CONSTRAINT `receipts_customer_id_to_customers_id` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `receipts_mode_of_payment_id_to_modes_of_payment_id` FOREIGN KEY (`mode_of_payment_id`) REFERENCES `modes_of_payment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table samson_inventory.receipt_items
CREATE TABLE IF NOT EXISTS `receipt_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `receipt_id` int(11) unsigned zerofill DEFAULT NULL,
  `item_id` varchar(50) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `actual_price` double DEFAULT NULL,
  `selling_price` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `receipt_items_item_id_to_items_id` (`item_id`),
  KEY `receipt_items_receipt_id_to_receipts_id` (`receipt_id`),
  CONSTRAINT `receipt_items_item_id_to_items_id` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `receipt_items_receipt_id_to_receipts_id` FOREIGN KEY (`receipt_id`) REFERENCES `receipts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table samson_inventory.receipt_services
CREATE TABLE IF NOT EXISTS `receipt_services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `receipt_id` int(11) unsigned zerofill DEFAULT NULL,
  `service_id` varchar(50) DEFAULT NULL,
  `selling_price` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `receipt_services_service_id_to_services_id` (`service_id`),
  KEY `receipt_services_receipt_id_to_receipts_id` (`receipt_id`),
  CONSTRAINT `receipt_services_receipt_id_to_receipts_id` FOREIGN KEY (`receipt_id`) REFERENCES `receipts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `receipt_services_service_id_to_services_id` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table samson_inventory.services
CREATE TABLE IF NOT EXISTS `services` (
  `id` varchar(50) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `selling_price_cash` double DEFAULT NULL,
  `selling_price_credit_card` double DEFAULT NULL,
  `selling_price_credit` double DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table samson_inventory.suppliers
CREATE TABLE IF NOT EXISTS `suppliers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `contact_info` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table samson_inventory.trade_ins
CREATE TABLE IF NOT EXISTS `trade_ins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `payment_id` int(11) unsigned zerofill DEFAULT NULL,
  `item_id` varchar(50) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `trade_ins_item_id_to_items_id` (`item_id`),
  KEY `trade_ins_payment_id_to_payments_id` (`payment_id`),
  CONSTRAINT `trade_ins_payment_id_to_payments_id` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `trade_ins_item_id_to_items_id` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table samson_inventory.types_of_payment
CREATE TABLE IF NOT EXISTS `types_of_payment` (
  `id` int(11) NOT NULL,
  `type_of_payment` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table samson_inventory.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `user_level_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_user_level_id_to_user_levels_id` (`user_level_id`),
  CONSTRAINT `users_user_level_id_to_user_levels_id` FOREIGN KEY (`user_level_id`) REFERENCES `user_levels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table samson_inventory.user_levels
CREATE TABLE IF NOT EXISTS `user_levels` (
  `id` int(11) NOT NULL,
  `user_level` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
