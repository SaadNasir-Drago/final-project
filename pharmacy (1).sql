-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 12, 2025 at 02:21 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
SET GLOBAL wait_timeout = 600;  -- Set the wait timeout to 10 minutes
SET GLOBAL interactive_timeout = 600;  -- Set interactive timeout to 10 minutes

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pharmacy`
--

-- --------------------------------------------------------

--
-- Table structure for table `budgets`
--

CREATE TABLE `budgets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `amount` decimal(12,2) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` enum('draft','active','completed','cancelled') NOT NULL DEFAULT 'draft',
  `created_by` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `budgets`
--

INSERT INTO `budgets` (`id`, `title`, `description`, `amount`, `start_date`, `end_date`, `status`, `created_by`, `created_at`, `updated_at`) VALUES
(2, 'fdgsdfg', '54634565', 70.00, '2025-03-28', '2025-04-03', 'completed', 2, '2025-03-25 03:53:35', '2025-03-25 03:57:02');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `position` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `hire_date` date NOT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `first_name`, `last_name`, `email`, `phone`, `position`, `department`, `hire_date`, `salary`, `address`, `is_active`, `user_id`, `created_at`, `updated_at`) VALUES
(2, 'Jasun', 'Stevens', 'rofybupin@mailinator.com', '+1 (575) 147-4371', 'Inventore error aliq', 'Research & Development', '1976-04-30', 29.00, NULL, 1, NULL, '2025-03-25 00:24:50', '2025-03-25 00:36:19');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_03_05_065607_create_personal_access_tokens_table', 1),
(5, '2025_03_05_065918_create_roles_table', 1),
(6, '2025_03_05_065919_create_orders_table', 1),
(7, '2025_03_05_065919_create_products_table', 1),
(8, '2025_03_05_065920_create_budgets_table', 1),
(9, '2025_03_05_065920_create_employees_table', 1),
(10, '2025_03_05_065921_create_role_user_table', 1),
(11, '2025_03_05_065921_create_security_alerts_table', 1),
(12, '2025_03_05_065922_create_order_items_table', 1),
(13, '2025_03_24_121006_create_security_alert_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `order_number` varchar(255) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('pending','processing','completed','cancelled') NOT NULL DEFAULT 'pending',
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `order_number`, `total_amount`, `status`, `notes`, `created_at`, `updated_at`) VALUES
(9, 2, 'ORD-J2PJQ3E0', 3242374.00, 'pending', NULL, '2025-03-26 11:38:36', '2025-03-26 11:52:48');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `unit_price`, `subtotal`, `created_at`, `updated_at`) VALUES
(13, 9, 6, 10, 324234.00, 3242340.00, NULL, NULL),
(14, 9, 5, 1, 34.00, 34.00, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 2, 'auth_token', 'a37b10b05039395ce8fee327be9655769eaed860013ee74dec9d84479bb1c40a', '[\"*\"]', '2025-03-10 03:32:49', NULL, '2025-03-10 03:29:01', '2025-03-10 03:32:49'),
(2, 'App\\Models\\User', 2, 'auth_token', '5585e49b7f4fc439786edd888d5df1caa2c2f5f9b798279be018437b21cbad60', '[\"*\"]', NULL, NULL, '2025-03-10 03:30:09', '2025-03-10 03:30:09'),
(3, 'App\\Models\\User', 3, 'auth_token', 'ee7a8f96a855f3c0c91ac0fa970776ae871d2d42384dba35d3e225e7f84209d3', '[\"*\"]', NULL, NULL, '2025-03-10 03:31:23', '2025-03-10 03:31:23'),
(4, 'App\\Models\\User', 4, 'auth_token', '590f10739958de679d175dff4dd4239f70be62edb06a90e7b3476668ea4c27e4', '[\"*\"]', NULL, NULL, '2025-03-10 03:35:06', '2025-03-10 03:35:06'),
(5, 'App\\Models\\User', 4, 'auth_token', '742415f3cf6e7a605cca6bc9e961dea281c27b65eb4334fac183d7ed54c75409', '[\"*\"]', NULL, NULL, '2025-03-10 03:35:46', '2025-03-10 03:35:46'),
(6, 'App\\Models\\User', 2, 'auth_token', 'c3590340e74d13802bb267c27db12ccb4aca2319599fdd3e19c9cb5ddf6b8380', '[\"*\"]', '2025-03-22 02:26:59', NULL, '2025-03-22 02:06:10', '2025-03-22 02:26:59'),
(7, 'App\\Models\\User', 2, 'auth_token', '1f962d729921bcf9378bd7d279ff83679bc34fe79e38ac4bb6ae5c118a4b2c86', '[\"*\"]', '2025-03-22 02:37:17', NULL, '2025-03-22 02:29:44', '2025-03-22 02:37:17'),
(8, 'App\\Models\\User', 2, 'auth_token', '4b631ebf20835c4dae5aa2d3d8953948e5deaf7ef27dab67301efc490c0af5ad', '[\"*\"]', '2025-03-22 03:00:18', NULL, '2025-03-22 02:41:17', '2025-03-22 03:00:18'),
(9, 'App\\Models\\User', 2, 'auth_token', '8c2f7be10ae0a1e73046a1266532f0e98299eb4b2cb2e676749e37ac311bc447', '[\"*\"]', '2025-03-24 21:00:27', NULL, '2025-03-24 20:50:57', '2025-03-24 21:00:27'),
(10, 'App\\Models\\User', 2, 'auth_token', 'cdf7aec1dda3caf8278a81fe32df2a94753d848bdd5dba5f875bf06d07163839', '[\"*\"]', '2025-03-24 21:33:57', NULL, '2025-03-24 20:56:57', '2025-03-24 21:33:57'),
(11, 'App\\Models\\User', 2, 'auth_token', '20e3209b94becc9c0cee409771d79b495645cc89c84b30704673a31d93ab08e5', '[\"*\"]', '2025-03-24 23:53:23', NULL, '2025-03-24 21:34:34', '2025-03-24 23:53:23'),
(12, 'App\\Models\\User', 2, 'auth_token', '15092d32e5d1762fe5289a7341aaf0c91cac7958aedec3f74ab1ee04316fbb65', '[\"*\"]', '2025-03-24 23:56:24', NULL, '2025-03-24 23:53:38', '2025-03-24 23:56:24'),
(13, 'App\\Models\\User', 2, 'auth_token', '7ebf26d1ccf4e548347433f214aea2558237c95aa369669bc6df41155939e86e', '[\"*\"]', '2025-03-25 00:02:27', NULL, '2025-03-24 23:56:37', '2025-03-25 00:02:27'),
(14, 'App\\Models\\User', 2, 'auth_token', '4bb79eaf8258b6c9914f3e4f910b32a42924950166ca33a272b0651a11144dbe', '[\"*\"]', '2025-03-25 23:31:26', NULL, '2025-03-25 00:13:41', '2025-03-25 23:31:26'),
(15, 'App\\Models\\User', 2, 'auth_token', 'dc5442ea59bf9a641e252aae96c6cc8dd0d05a9b208655e4df73ffb30b000c66', '[\"*\"]', '2025-03-26 01:22:31', NULL, '2025-03-25 23:59:17', '2025-03-26 01:22:31'),
(16, 'App\\Models\\User', 2, 'auth_token', '052798d8cd3b4cc8515e7ccf9af4994b340e2915b2e8e5046c76c727517642fa', '[\"*\"]', NULL, NULL, '2025-03-26 11:09:41', '2025-03-26 11:09:41'),
(17, 'App\\Models\\User', 2, 'auth_token', 'b9be0548a00564086bd85c20905bef95b6eb6fa6b7235422a622553926eba9ed', '[\"*\"]', '2025-03-26 12:10:13', NULL, '2025-03-26 11:09:43', '2025-03-26 12:10:13'),
(18, 'App\\Models\\User', 2, 'auth_token', '1597f2f727ea83439ed50504c61d8bfbfbbd175109d7b2e5a38d51e77c0eafe3', '[\"*\"]', '2025-03-26 12:19:19', NULL, '2025-03-26 12:19:17', '2025-03-26 12:19:19'),
(19, 'App\\Models\\User', 2, 'auth_token', 'b1e05457deee4552cdefd6947432ea0cb3f8821480730c939469910f602c2593', '[\"*\"]', '2025-03-26 12:23:15', NULL, '2025-03-26 12:23:13', '2025-03-26 12:23:15'),
(20, 'App\\Models\\User', 5, 'auth_token', 'bf6f0dcbb8f067f1eed6e563e79f827e447622136ffaecbdfbd4a9b6d71a7036', '[\"*\"]', '2025-03-26 12:24:15', NULL, '2025-03-26 12:24:13', '2025-03-26 12:24:15'),
(21, 'App\\Models\\User', 5, 'auth_token', '0483a9c7eb582f2b4ec5c595f9ae248c6ed2b048ae11851a4f08858b1cc024d9', '[\"*\"]', '2025-03-26 12:24:27', NULL, '2025-03-26 12:24:26', '2025-03-26 12:24:27'),
(22, 'App\\Models\\User', 6, 'auth_token', '9219f8937865205e8bc424863350bf70d45cfe6ddaa3cf620e73f9c24969f8b7', '[\"*\"]', '2025-03-26 12:30:36', NULL, '2025-03-26 12:30:34', '2025-03-26 12:30:36'),
(23, 'App\\Models\\User', 2, 'auth_token', '3139e2a18c8e0aa06708968bf9dedd12ec94fccc5bdecee5c967572937ffd166', '[\"*\"]', '2025-04-12 04:02:03', NULL, '2025-04-12 02:20:15', '2025-04-12 04:02:03'),
(24, 'App\\Models\\User', 2, 'auth_token', 'd4fc716bf92e57b56b4a7fa37db7249b8235b87c1dd428c5598023439e72dc0e', '[\"*\"]', '2025-04-12 04:11:22', NULL, '2025-04-12 04:11:21', '2025-04-12 04:11:22'),
(25, 'App\\Models\\User', 7, 'auth_token', '9f3fe48002c172907e4b706460a96335962bca19a9e6803e9a421889bc0790f5', '[\"*\"]', '2025-04-12 04:15:01', NULL, '2025-04-12 04:14:59', '2025-04-12 04:15:01'),
(26, 'App\\Models\\User', 2, 'auth_token', '61232f27bab7bb0751dda09eb8b79dc42d21547d5bef18a7fccb54c533df30d7', '[\"*\"]', '2025-04-12 04:29:37', NULL, '2025-04-12 04:17:10', '2025-04-12 04:29:37'),
(27, 'App\\Models\\User', 8, 'auth_token', '3d38122eb1ba1e28f107141767cf4b1147cf3ea675725bc7939c0c34d565cd0c', '[\"*\"]', '2025-04-12 04:39:55', NULL, '2025-04-12 04:33:08', '2025-04-12 04:39:55'),
(28, 'App\\Models\\User', 8, 'auth_token', '6d9139b8854ab76a3ecf31378067f3e76d76344c0ee0821686ba07845b2515b7', '[\"*\"]', NULL, NULL, '2025-04-12 04:44:53', '2025-04-12 04:44:53'),
(29, 'App\\Models\\User', 8, 'auth_token', 'fecdbb58018c0f775aee4911c016c76442bb14a60f5281bcf5ad736d7e27f4a3', '[\"*\"]', NULL, NULL, '2025-04-12 04:45:02', '2025-04-12 04:45:02'),
(30, 'App\\Models\\User', 8, 'auth_token', '4037d64346bc0ef89dd4de64ee4934280a4ebac90a16f6344c11df891321097c', '[\"*\"]', NULL, NULL, '2025-04-12 04:45:06', '2025-04-12 04:45:06'),
(31, 'App\\Models\\User', 8, 'auth_token', 'c8a53b7ac8f44350ca91267a3471f0caf5ab836d3a02ee5ce4deea359a15c51b', '[\"*\"]', NULL, NULL, '2025-04-12 04:45:20', '2025-04-12 04:45:20'),
(32, 'App\\Models\\User', 2, 'auth_token', 'd4a0e32a4ad287edea0aa75f30cd374cded7f7a5d739631061afc1229bb79768', '[\"*\"]', NULL, NULL, '2025-04-12 04:45:45', '2025-04-12 04:45:45'),
(33, 'App\\Models\\User', 2, 'auth_token', 'e51286f29aa29a6ec454b13ff72805f7e64b3d7f35a9146b116cd900e192d005', '[\"*\"]', NULL, NULL, '2025-04-12 04:46:08', '2025-04-12 04:46:08'),
(34, 'App\\Models\\User', 2, 'auth_token', '6d3052e0f821a0bfd4ce62b407f0541f5db2559dce4cc32bea1c7caf276c6582', '[\"*\"]', NULL, NULL, '2025-04-12 04:46:47', '2025-04-12 04:46:47'),
(35, 'App\\Models\\User', 2, 'auth_token', '23f2e864c86cb84782cc43b0fd43079b4a3fb3b2b972d97738ea08bfe1b84031', '[\"*\"]', NULL, NULL, '2025-04-12 04:46:49', '2025-04-12 04:46:49'),
(36, 'App\\Models\\User', 2, 'auth_token', '59609b335d1acc29a51909a03a65e43504da1d5f38343320e52444df6355fce7', '[\"*\"]', NULL, NULL, '2025-04-12 04:46:51', '2025-04-12 04:46:51'),
(37, 'App\\Models\\User', 8, 'auth_token', '2a13ef9f084763de545eaaeba828f4b961c032e9377bcdc776282771ccefd54d', '[\"*\"]', NULL, NULL, '2025-04-12 04:47:03', '2025-04-12 04:47:03'),
(38, 'App\\Models\\User', 8, 'auth_token', 'c2167c5bc0df09da1fcf8711c8e3a6fb173b657e38eaa7605263e1ced06f0c14', '[\"*\"]', NULL, NULL, '2025-04-12 04:47:09', '2025-04-12 04:47:09'),
(39, 'App\\Models\\User', 8, 'auth_token', 'e0ce81268603cfe4f618f2e61bba671551b68f120b7a0be0a25977bfa0ea98a1', '[\"*\"]', NULL, NULL, '2025-04-12 04:47:48', '2025-04-12 04:47:48'),
(40, 'App\\Models\\User', 8, 'auth_token', '13bd98c7da91662de545e236e07ccfb1e759856073b4bdc65f2322e44947f440', '[\"*\"]', NULL, NULL, '2025-04-12 04:48:17', '2025-04-12 04:48:17'),
(41, 'App\\Models\\User', 8, 'auth_token', 'fd5932a808324017dcb61306751e2a00db139881a30da8cd32be41233cde52ed', '[\"*\"]', NULL, NULL, '2025-04-12 04:50:59', '2025-04-12 04:50:59'),
(42, 'App\\Models\\User', 8, 'auth_token', '9b18a2965ce8f67406880f43ba2b6b2bcccf208b86e1be023da3efde6f7cdb9e', '[\"*\"]', '2025-04-12 04:51:31', NULL, '2025-04-12 04:51:02', '2025-04-12 04:51:31'),
(43, 'App\\Models\\User', 2, 'auth_token', '9f9b768ca5c278e9700fecbcf504b7ea2c80af3cf02c9df0543a1553c50e6d88', '[\"*\"]', '2025-04-12 04:56:20', NULL, '2025-04-12 04:52:24', '2025-04-12 04:56:20'),
(44, 'App\\Models\\User', 8, 'auth_token', '0bcb4a510d0fae34f31736dc43fa570d6e359bbd8ce2aa1b76f7d5331bf7c5f0', '[\"*\"]', '2025-04-12 04:57:12', NULL, '2025-04-12 04:56:52', '2025-04-12 04:57:12'),
(45, 'App\\Models\\User', 8, 'auth_token', '3b7f834bb6fcc39ff78431ed8f1b1c623092564a226a3b8ed6b9e660215ca98e', '[\"*\"]', '2025-04-12 05:25:34', NULL, '2025-04-12 05:25:33', '2025-04-12 05:25:34'),
(46, 'App\\Models\\User', 8, 'auth_token', 'c45a40674420d578d3f7153a191afc7158c59e3a09decff9a7a4c7a811a31d87', '[\"*\"]', '2025-04-12 05:46:28', NULL, '2025-04-12 05:28:45', '2025-04-12 05:46:28'),
(47, 'App\\Models\\User', 2, 'auth_token', 'e61c086f21faa488a61b17f68611fb16d386363c2b944cad7619070a4a20ae58', '[\"*\"]', NULL, NULL, '2025-04-12 05:33:12', '2025-04-12 05:33:12'),
(48, 'App\\Models\\User', 8, 'auth_token', 'ee9acfe906b517cd65dc5098deb014acfa62362e28e27f72791b22eb958cc92d', '[\"*\"]', '2025-04-12 05:41:59', NULL, '2025-04-12 05:33:20', '2025-04-12 05:41:59'),
(49, 'App\\Models\\User', 2, 'auth_token', 'c5d180f848716a8f70eafb41cc9859a53aff24cf2d861eac972d58d8ec581d8f', '[\"*\"]', '2025-04-12 05:46:57', NULL, '2025-04-12 05:42:24', '2025-04-12 05:46:57'),
(50, 'App\\Models\\User', 9, 'auth_token', '1d2a4b681441d61496fe3247beef16c5a76e8c68be1ec20811d31b587f2abfc3', '[\"*\"]', '2025-04-12 06:06:34', NULL, '2025-04-12 05:47:55', '2025-04-12 06:06:34'),
(51, 'App\\Models\\User', 2, 'auth_token', '65724efae8f1d0164e2e2c1b59ff3fd0beb1f2d590451b36617a3ff9688b63cb', '[\"*\"]', '2025-04-12 06:06:41', NULL, '2025-04-12 06:01:31', '2025-04-12 06:06:41'),
(52, 'App\\Models\\User', 10, 'auth_token', '6edb6441e31a2bb9e3f6171d3b09b3735baed81146a6fa669dd22622eb02ebd8', '[\"*\"]', '2025-04-12 06:15:44', NULL, '2025-04-12 06:14:49', '2025-04-12 06:15:44');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `sku` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `manufacturer` varchar(255) DEFAULT NULL,
  `expiry_date` date DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `sku`, `description`, `price`, `quantity`, `category`, `manufacturer`, `expiry_date`, `is_active`, `created_at`, `updated_at`) VALUES
(5, 'last producttttkjhijh', 'jejjj3', NULL, 34.00, 345344, NULL, NULL, NULL, 1, '2025-03-26 11:38:00', '2025-03-26 11:52:48'),
(6, '234234', '234234', NULL, 324234.00, 234224, NULL, NULL, NULL, 1, '2025-03-26 11:41:39', '2025-03-26 11:52:48');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'Administrator with full access', '2025-03-05 02:18:09', '2025-03-05 02:18:09'),
(2, 'sales', 'Sales staff with access to orders', '2025-03-05 02:18:09', '2025-03-05 02:18:09'),
(3, 'inventory', 'Inventory staff with access to products', '2025-03-05 02:18:09', '2025-03-05 02:18:09'),
(4, 'finance', 'Finance staff with access to budgets', '2025-03-05 02:18:09', '2025-03-05 02:18:09'),
(5, 'hr', 'HR staff with access to employees', '2025-03-05 02:18:09', '2025-03-05 02:18:09'),
(6, 'it', 'IT staff with access to security alerts', '2025-03-05 02:18:09', '2025-03-05 02:18:09'),
(7, 'user', 'Regular user with limited access', '2025-03-05 02:18:09', '2025-03-05 02:18:09');

-- --------------------------------------------------------

--
-- Table structure for table `role_user`
--

CREATE TABLE `role_user` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_user`
--

INSERT INTO `role_user` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, NULL, NULL),
(2, 2, 7, NULL, NULL),
(3, 3, 7, NULL, NULL),
(4, 4, 7, NULL, NULL),
(5, 5, 7, NULL, NULL),
(6, 6, 7, NULL, NULL),
(7, 7, 7, NULL, NULL),
(8, 8, 7, NULL, NULL),
(9, 9, 7, NULL, NULL),
(10, 10, 7, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `security_alerts`
--

CREATE TABLE `security_alerts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `severity` enum('low','medium','high','critical') NOT NULL DEFAULT 'medium',
  `status` enum('open','in_progress','resolved','closed') NOT NULL DEFAULT 'open',
  `reported_by` varchar(255) DEFAULT NULL,
  `assigned_to` varchar(255) DEFAULT NULL,
  `resolved_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `security_alerts`
--

INSERT INTO `security_alerts` (`id`, `title`, `description`, `severity`, `status`, `reported_by`, `assigned_to`, `resolved_at`, `created_at`, `updated_at`) VALUES
(9, 'aedfwef', 'wfewefwef', 'low', 'open', 'wfefwefwef', 'wfefwef', NULL, '2025-03-26 11:36:06', '2025-03-26 11:36:06');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('inBUvWUbii4Ax5oWfftsll7DBpolCQWQq9eitdXg', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSzd1QzRxeGhocFFxMkxFNlhYR04xZllnaGFUZHlNSEFyblNCNVhIOSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9sb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1742884005),
('XKvvpVcGdgWQikMi1se2ojXm008fGVPeBG9QGGPA', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTUV6V2ZxamJzVEMxVklWR242MHRjUngxdU85MmdWQ3Nxd1JIb1JjYyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9sb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1742884004);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `is_active`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin User', 'admin@example.com', NULL, '$2y$12$PWn1L0eboA1cYGVxPoDsu.KZGTDBRUqMeLWVe6huvnfh1125Af9YW', NULL, 1, NULL, '2025-03-05 02:18:09', '2025-03-05 02:18:09'),
(2, 'Shah Ul Jasun', 'jasun266@gmail.com', NULL, '$2y$12$eWwXuLicR9cgpgSKp2Ip5eSlH1uOtHHNq75kwu3VlXkNC2yc1Vfm.', NULL, 1, NULL, '2025-03-10 03:29:00', '2025-03-10 03:29:00'),
(3, 'Shah Ul Jasun', 'jasun2665@gmail.com', NULL, '$2y$12$6hN7TBOa5wysyrXsQEmbAe7YQ3XKJhC9wvtHqP4oQOzTQYzkxr8Oe', NULL, 1, NULL, '2025-03-10 03:31:23', '2025-03-10 03:31:23'),
(4, 'Shah Ul Jasun', 'jasun@gmail.com', NULL, '$2y$12$LNczjbLhMFrQMrhXVvS.YeQT4s4gofgb37Pm39uZSd05owX1HbCwq', NULL, 1, NULL, '2025-03-10 03:35:06', '2025-03-10 03:35:06'),
(5, 'Shah Ul Jasun', 'jasun2666@gmail.com', NULL, '$2y$12$.Z5bmz0CK178EJv3WLKDaekuuCl1bsMPy0WZWL7m1Z9dhdiXTylim', NULL, 1, NULL, '2025-03-26 12:24:13', '2025-03-26 12:24:13'),
(6, 'Shah Ul Jasun', 'jasun2636@gmail.com', NULL, '$2y$12$PWMDW60UMj/.LZotF9ps7ucmBPZofrixjR.F/pnTCshIhKjSDTKCC', NULL, 1, NULL, '2025-03-26 12:30:34', '2025-03-26 12:30:34'),
(7, 'erferf erfrfe', 'jasun2669@gmail.com', NULL, '$2y$12$4XhQoVIINX5fxhIK9TlLMuwjwX38Xz7t9SrlqaD9kOkBZkbRl61Mm', 'Finance', 1, NULL, '2025-04-12 04:14:59', '2025-04-12 04:14:59'),
(8, 'sdcsdcsd sdcsdcsd', 'jasun26dsc6@gmail.com', NULL, '$2y$12$QFMEn0zupKyTqHy6.N1yGOxk1O1aRQtoL/eqrJRU./0wyJMqkHKnC', 'Finance', 1, NULL, '2025-04-12 04:33:08', '2025-04-12 04:33:08'),
(9, 'ergerg ddddd', 'it@gmail.com', NULL, '$2y$12$DMLIJiX0cLCFVHtpPZNjVuZYOTG8Y4OVeUAB6NpZxCa86o/.A8zwu', 'IT', 1, NULL, '2025-04-12 05:47:55', '2025-04-12 05:47:55'),
(10, 'HR HR', 'hr@gmail.com', NULL, '$2y$12$VCfAPFbqCXZOLL5c1YxjTebB6H3qBQV46qehmnLPkQVJXFTS/qu0.', 'HR', 1, NULL, '2025-04-12 06:14:49', '2025-04-12 06:14:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `budgets`
--
ALTER TABLE `budgets`
  ADD KEY `budgets_created_by_foreign` (`created_by`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD UNIQUE KEY `employees_email_unique` (`email`),
  ADD KEY `employees_user_id_foreign` (`user_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD KEY `jobs_queue_index` (`queue`);

-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD UNIQUE KEY `orders_order_number_unique` (`order_number`),
  ADD KEY `orders_user_id_foreign` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD KEY `order_items_order_id_foreign` (`order_id`),
  ADD KEY `order_items_product_id_foreign` (`product_id`);


--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD UNIQUE KEY `products_sku_unique` (`sku`);


--
-- Indexes for table `role_user`
--
ALTER TABLE `role_user`
  ADD KEY `role_user_user_id_foreign` (`user_id`),
  ADD KEY `role_user_role_id_foreign` (`role_id`);

--
-- Indexes for table `security_alert
--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `budgets`
--
ALTER TABLE `budgets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `role_user`
--
ALTER TABLE `role_user`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `security_alerts`
--
ALTER TABLE `security_alerts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `budgets`
--
ALTER TABLE `budgets`
  ADD CONSTRAINT `budgets_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_user`
--
ALTER TABLE `role_user`
  ADD CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
