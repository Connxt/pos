-- phpMyAdmin SQL Dump
-- version 4.0.10.7
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 20, 2016 at 10:36 PM
-- Server version: 5.5.45-cll-lve
-- PHP Version: 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `philtruck_inventory`
--
CREATE DATABASE IF NOT EXISTS `pos` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `pos`;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `last_name`, `first_name`, `middle_name`, `address`, `contact_info`, `created_at`, `updated_at`) VALUES
(1, 'Felipe', 'Jan Ryan', 'Malicay', 'Mabinay, Negros Oriental', '09985658410', '2015-09-16 07:57:19', '2015-09-16 07:57:19');

-- --------------------------------------------------------

--
-- Table structure for table `deliveries`
--

CREATE TABLE IF NOT EXISTS `deliveries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `supplier_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `delivery_logs_supplier_id_to_suppliers_id` (`supplier_id`),
  KEY `delivery_logs_user_id_to_users_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `deliveries`
--

INSERT INTO `deliveries` (`id`, `supplier_id`, `user_id`, `created_at`, `updated_at`) VALUES
(2, 1, 1, '2015-09-16 08:18:41', '2015-09-16 08:18:41'),
(3, 1, 1, '2016-01-08 09:20:07', '2016-01-08 09:20:07');

-- --------------------------------------------------------

--
-- Table structure for table `delivery_items`
--

CREATE TABLE IF NOT EXISTS `delivery_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `delivery_id` int(11) DEFAULT NULL,
  `item_id` varchar(50) DEFAULT NULL,
  `actual_price` double DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `delivery_items_item_id_to_items_id` (`item_id`),
  KEY `delivery_items_delivery_id_to_deliveries_id` (`delivery_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `delivery_items`
--

INSERT INTO `delivery_items` (`id`, `delivery_id`, `item_id`, `actual_price`, `quantity`) VALUES
(1, 2, '0001', 100, 10),
(2, 3, '0001', 123.67, 1);

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

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

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `description`, `quantity`, `actual_price`, `selling_price_cash`, `selling_price_credit_card`, `selling_price_credit`, `created_at`, `updated_at`) VALUES
('0001', 'ATLANTIC SYNTECH MCO 20W-50 API, JASO MA2', 1, 123.67, 173.01, 173.01, 173.01, '2015-09-16 07:56:35', '2016-01-08 09:20:07'),
('0002', 'ATLANTIC SYNTECH MCO 10W-40 API SM, JASO MA2', 0, 157.78, 220.73, 220.73, 220.73, '2015-09-17 15:36:22', '2015-11-05 01:33:10'),
('0003', '(12X1) ATLANTIC X DIESEL ENGINE OIL SAE-15W-40 CI-', 0, 153.52, 214.77, 217.77, 214.77, '2015-11-05 07:39:04', '2015-11-05 08:24:34'),
('0004', '(12X1) ATLANTIC X ENGINE OIL SAE 15W-40 CF-4/SG', 0, 144.99, 202.84, 202.84, 202.84, '2015-11-05 08:08:41', '2015-11-05 08:18:16'),
('0005', '(12X1) ATLANTIC GEAR OIL EP SAE 90 GL-4', 0, 140.72, 196.88, 196.88, 196.88, '2015-11-05 08:10:50', '2015-11-05 08:17:30'),
('0006', '(12X1) ATLANTIC GEAR OIL EP SAE 140 GL-4', 0, 140.72, 196.88, 196.88, 196.88, '2015-11-05 08:13:11', '2015-11-05 08:17:04'),
('0007', '(12X1) ATLANTIC X GASOLINE ENGINE OIL 20W-50, SN', 0, 153.52, 214.77, 214.77, 214.77, '2015-11-05 08:16:21', '2015-11-05 08:16:21'),
('0008', '(12X1) ATLANTIC MCO 20W-50 API SL JASO MA2', 0, 149.25, 208.81, 208.81, 208.81, '2015-11-05 08:29:44', '2015-11-05 08:29:44'),
('0009', '(12X1) ATLANTIC SYNTECH MCO 10W-40 API SM, JASO MA', 0, 187.63, 262.5, 262.5, 262.5, '2015-11-05 08:32:35', '2015-11-05 08:32:35'),
('0010', '(4X4) ATLANTIC X DEO  SAE 15W-40 CI-4/SL', 0, 564.59, 789.89, 789.89, 789.89, '2015-11-05 08:42:54', '2015-11-05 08:42:54'),
('0011', '(4X4) ATLANTIC X DEO SAE 15W-40 CF-4/SG', 0, 533.55, 746.45, 746.45, 746.45, '2015-11-05 08:46:44', '2015-11-05 08:46:44'),
('0012', '(4X4) ATLANTIC GEAR OIL EP SAE 90 GL-4', 0, 517.86, 724.5, 724.5, 724.5, '2015-11-05 08:48:58', '2015-11-05 08:48:58'),
('0013', '(4X4) ATLANTIC GEAR OIL EP SAE 140 GL-4', 0, 517.86, 724.5, 724.5, 724.5, '2015-11-05 08:50:27', '2015-11-05 08:50:27'),
('0014', '(4X4) ATLANTIC X GEO 20W-50, API SN', 0, 564.94, 790.36, 790.36, 790.36, '2015-11-05 08:52:06', '2015-11-05 08:52:06'),
('0015', '(PAILS) ATLANTIC X DEO SAE 15W-40 CI-4/SL', 0, 2300, 3244.38, 3244.38, 3244.38, '2015-11-06 06:41:47', '2015-11-06 06:41:47'),
('0016', '(PAILS) ATLANTIC X DEO SAE 15W-40 CF-4/SG', 0, 2154.23, 3174.27, 3174.27, 3174.27, '2015-11-06 06:43:55', '2015-11-06 06:43:55'),
('0017', '(PAILS) ATLANTIC HYDRAULIC OIL AWT 68', 0, 1935.34, 2707.6, 2707.6, 2707.6, '2015-11-06 06:46:34', '2015-11-06 06:46:34'),
('0018', '(PAILS) ATLANTIC GEAR OIL EP SAE  90 GL-4', 0, 2090.93, 2925.28, 2925.28, 2925.28, '2015-11-06 06:54:15', '2015-11-06 06:54:15'),
('0019', '(PAILS) ATLANTIC GEAR OIL EP SAE 140 GL-4 ', 0, 2103.46, 2942.8, 2942.8, 2942.8, '2015-11-06 06:55:59', '2015-11-06 06:55:59'),
('0020', '(PAILS?) ATLANTIC X GEO 20W-50, API SN', 0, 2222.62, 3136.57, 3136.57, 3136.57, '2015-11-06 06:57:50', '2015-11-06 06:57:50'),
('0021', '(PAILS) ATLANTIC SYNTEC DEO 15W-40, API CJ-4/SM', 0, 2650.05, 3707.5, 3707.5, 3707.5, '2015-11-06 07:00:17', '2015-11-06 07:00:17'),
('0022', '(DRUM) ATLANTIC X DEO SAE 15W-40 CI-4/SL', 0, 22226.16, 32630.57, 32630.57, 32630.57, '2015-11-06 07:02:05', '2015-11-06 07:02:05'),
('0023', '(DRUM) ATLANTIC X DEO SAE 15W-40 CF-4/SG', 0, 22112.43, 30936, 30936, 30936, '2015-11-06 07:03:38', '2015-11-06 07:03:38'),
('0024', '(DRUM) ATLANTIC HYDRAULIC OIL AWT 68', 0, 18238.97, 27426.45, 27426.45, 27426.45, '2015-11-06 07:06:37', '2015-11-06 07:06:37'),
('0025', '(DRUM) ATLANTIC GEAR OIL EP SAE 90 GL-4', 0, 20145.51, 28220.38, 28220.38, 28220.38, '2015-11-06 07:14:42', '2015-11-06 07:14:42'),
('0026', '(DRUM) ATLANTIC GEAR OIL EP SAE 140 GL-4', 0, 20583.02, 28796.3, 28796.3, 28796.3, '2015-11-06 07:21:47', '2015-11-06 07:21:47');

-- --------------------------------------------------------

--
-- Table structure for table `modes_of_payment`
--

CREATE TABLE IF NOT EXISTS `modes_of_payment` (
  `id` int(11) NOT NULL,
  `mode_of_payment` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `modes_of_payment`
--

INSERT INTO `modes_of_payment` (`id`, `mode_of_payment`) VALUES
(1, 'Cash'),
(2, 'Credit Card'),
(3, 'Credit');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

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
  KEY `payments_user_id_to_users_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `receipt_id`, `amount_paid`, `type_of_payment_id`, `user_id`, `created_at`, `updated_at`) VALUES
(00000000001, 00000000001, 1500, 1, 1, '2015-09-16 08:20:09', '2015-09-16 08:20:09');

-- --------------------------------------------------------

--
-- Table structure for table `receipts`
--

CREATE TABLE IF NOT EXISTS `receipts` (
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) DEFAULT NULL,
  `mode_of_payment_id` int(11) DEFAULT NULL,
  `due_date` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `receipts_customer_id_to_customers_id` (`customer_id`),
  KEY `receipts_mode_of_payment_id_to_modes_of_payment_id` (`mode_of_payment_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `receipts`
--

INSERT INTO `receipts` (`id`, `customer_id`, `mode_of_payment_id`, `due_date`, `created_at`, `updated_at`) VALUES
(00000000001, 1, 1, '2015-09-16 00:00:00', '2015-09-16 08:20:09', '2015-09-16 08:20:09');

-- --------------------------------------------------------

--
-- Table structure for table `receipt_items`
--

CREATE TABLE IF NOT EXISTS `receipt_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `receipt_id` int(11) unsigned zerofill DEFAULT NULL,
  `item_id` varchar(50) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `actual_price` double DEFAULT NULL,
  `selling_price` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `receipt_items_item_id_to_items_id` (`item_id`),
  KEY `receipt_items_receipt_id_to_receipts_id` (`receipt_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `receipt_items`
--

INSERT INTO `receipt_items` (`id`, `receipt_id`, `item_id`, `quantity`, `actual_price`, `selling_price`) VALUES
(1, 00000000001, '0001', 10, 100, 150);

-- --------------------------------------------------------

--
-- Table structure for table `receipt_services`
--

CREATE TABLE IF NOT EXISTS `receipt_services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `receipt_id` int(11) unsigned zerofill DEFAULT NULL,
  `service_id` varchar(50) DEFAULT NULL,
  `selling_price` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `receipt_services_service_id_to_services_id` (`service_id`),
  KEY `receipt_services_receipt_id_to_receipts_id` (`receipt_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

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

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE IF NOT EXISTS `suppliers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `contact_info` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `name`, `contact_info`, `created_at`, `updated_at`) VALUES
(1, 'PPC ASIA CORPORATION', '(032) 422-6358/ 239-4157', '2015-09-16 07:57:51', '2015-11-12 01:16:26'),
(2, 'PPC ASIA CORPORATION', '(032) 422-6358/ 239-4157', '2015-11-12 01:16:12', '2015-11-12 01:21:16');

-- --------------------------------------------------------

--
-- Table structure for table `trade_ins`
--

CREATE TABLE IF NOT EXISTS `trade_ins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `payment_id` int(11) unsigned zerofill DEFAULT NULL,
  `item_id` varchar(50) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `trade_ins_item_id_to_items_id` (`item_id`),
  KEY `trade_ins_payment_id_to_payments_id` (`payment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `types_of_payment`
--

CREATE TABLE IF NOT EXISTS `types_of_payment` (
  `id` int(11) NOT NULL,
  `type_of_payment` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `types_of_payment`
--

INSERT INTO `types_of_payment` (`id`, `type_of_payment`) VALUES
(1, 'Initial'),
(2, 'Credit');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

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
  KEY `users_user_level_id_to_user_levels_id` (`user_level_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `last_name`, `first_name`, `middle_name`, `user_level_id`, `created_at`, `updated_at`) VALUES
(1, 'administrator', '200ceb26807d6bf99fd6f4f0d1ca54d4', 'Administrator', 'Administrator', 'Administrator', 1, '2015-09-15 00:00:00', '2015-09-15 00:00:00'),
(2, 'cashier', '6ac2470ed8ccf204fd5ff89b32a355cf', 'Cashier', 'Cashier', 'Cashier', 2, '2015-09-15 00:00:00', '2015-09-15 00:00:00'),
(3, 'novemmarie', '20e263bff4d715434b91697711e5d097', 'seguiro', 'novem marie', 'tacogue', 1, '2015-11-05 00:53:54', '2015-11-05 00:53:54');

-- --------------------------------------------------------

--
-- Table structure for table `user_levels`
--

CREATE TABLE IF NOT EXISTS `user_levels` (
  `id` int(11) NOT NULL,
  `user_level` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_levels`
--

INSERT INTO `user_levels` (`id`, `user_level`) VALUES
(1, 'Administrator'),
(2, 'Cashier');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `deliveries`
--
ALTER TABLE `deliveries`
  ADD CONSTRAINT `delivery_logs_supplier_id_to_suppliers_id` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `delivery_logs_user_id_to_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `delivery_items`
--
ALTER TABLE `delivery_items`
  ADD CONSTRAINT `delivery_items_delivery_id_to_deliveries_id` FOREIGN KEY (`delivery_id`) REFERENCES `deliveries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `delivery_items_item_id_to_items_id` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_receipt_id_to_receipts_id` FOREIGN KEY (`receipt_id`) REFERENCES `receipts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_type_of_payment_id_to_types_of_payment_id` FOREIGN KEY (`type_of_payment_id`) REFERENCES `types_of_payment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_user_id_to_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `receipts`
--
ALTER TABLE `receipts`
  ADD CONSTRAINT `receipts_customer_id_to_customers_id` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `receipts_mode_of_payment_id_to_modes_of_payment_id` FOREIGN KEY (`mode_of_payment_id`) REFERENCES `modes_of_payment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `receipt_items`
--
ALTER TABLE `receipt_items`
  ADD CONSTRAINT `receipt_items_item_id_to_items_id` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `receipt_items_receipt_id_to_receipts_id` FOREIGN KEY (`receipt_id`) REFERENCES `receipts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `receipt_services`
--
ALTER TABLE `receipt_services`
  ADD CONSTRAINT `receipt_services_receipt_id_to_receipts_id` FOREIGN KEY (`receipt_id`) REFERENCES `receipts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `receipt_services_service_id_to_services_id` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `trade_ins`
--
ALTER TABLE `trade_ins`
  ADD CONSTRAINT `trade_ins_item_id_to_items_id` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `trade_ins_payment_id_to_payments_id` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_user_level_id_to_user_levels_id` FOREIGN KEY (`user_level_id`) REFERENCES `user_levels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
