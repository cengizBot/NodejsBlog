# NodejsBlog

-- File DATABASE MYSQL  / PHPMYADMIN

-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  mar. 14 jan. 2020 à 16:04
-- Version du serveur :  10.1.35-MariaDB
-- Version de PHP :  7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `nodejs`
--

-- --------------------------------------------------------

--
-- Structure de la table `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `content` varchar(1500) NOT NULL,
  `picture` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `articles`
--

INSERT INTO `articles` (`id`, `id_user`, `title`, `date`, `content`, `picture`) VALUES
(56, 9, 'Node js description ...', '2020-01-12 19:48:46', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at elementum nunc, in egestas neque. Fusce eu leo a metus mattis commodo. Maecenas quis malesuada lacus. Suspendisse potenti. Duis malesuada elementum lobortis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec dictum pharetra ornare. In nec dignissim arcu. Curabitur consectetur blandit pharetra. Etiam nec odio iaculis, tincidunt justo sed, suscipit ligula. In vehicula congue elit, vel ullamcorper purus ornare eu. Duis a mi mi. Vestibulum placerat dolor non nisl ultricies, eu sodales neque dignissim. Nam at faucibus velit.\r\n\r\nEtiam eu neque lorem. Etiam vehicula vitae ex quis maximus. Mauris libero est, laoreet ac iaculis quis, elementum non ante. Cras quis arcu tincidunt, venenatis libero quis, egestas turpis. Nullam scelerisque nisi vitae dictum venenatis. In sed commodo quam, id commodo neque. Suspendisse potenti. Nulla posuere vitae justo ac mattis. Phasellus feugiat nisl et sem hendrerit, at finibus ex ornare. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin id finibus nunc. Fusce sollicitudin gravida arcu ac gravida. In interdum scelerisque mauris, non suscipit felis accumsan quis. Proin non augue id tortor aliquam imperdiet id sed erat. Curabitur sed arcu quis augue eleifend condimentum blandit ac risus.\r\n\r\nNam ultricies nisl quis nisi egestas, at facilisis urna convallis. Mauris auctor posuere aliquet. Aenean luctus nunc risus. Phasellus eget elementum leo. In sodales ', 'https://picsum.photos/200/300?random=28'),
(57, 9, 'Pays ...', '2020-01-12 19:49:01', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at elementum nunc, in egestas neque. Fusce eu leo a metus mattis commodo. Maecenas quis malesuada lacus. Suspendisse potenti. Duis malesuada elementum lobortis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec dictum pharetra ornare. In nec dignissim arcu. Curabitur consectetur blandit pharetra. Etiam nec odio iaculis, tincidunt justo sed, suscipit ligula. In vehicula congue elit, vel ullamcorper purus ornare eu. Duis a mi mi. Vestibulum placerat dolor non nisl ultricies, eu sodales neque dignissim. Nam at faucibus velit.\r\n\r\nEtiam eu neque lorem. Etiam vehicula vitae ex quis maximus. Mauris libero est, laoreet ac iaculis quis, elementum non ante. Cras quis arcu tincidunt, venenatis libero quis, egestas turpis. Nullam scelerisque nisi vitae dictum venenatis. In sed commodo quam, id commodo neque. Suspendisse potenti. Nulla posuere vitae justo ac mattis. Phasellus feugiat nisl et sem hendrerit, at finibus ex ornare. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin id finibus nunc. Fusce sollicitudin gravida arcu ac gravida. In interdum scelerisque mauris, non suscipit felis accumsan quis. Proin non augue id tortor aliquam imperdiet id sed erat. Curabitur sed arcu quis augue eleifend condimentum blandit ac risus.\r\n\r\nNam ultricies nisl quis nisi egestas, at facilisis urna convallis. Mauris auctor posuere aliquet. Aenean luctus nunc risus. Phasellus eget elementum leo. In sodales ', 'https://picsum.photos/200/300?random=96'),
(58, 9, 'Mauris auctor posuere aliquet', '2020-01-12 19:49:16', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at elementum nunc, in egestas neque. Fusce eu leo a metus mattis commodo. Maecenas quis malesuada lacus. Suspendisse potenti. Duis malesuada elementum lobortis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec dictum pharetra ornare. In nec dignissim arcu. Curabitur consectetur blandit pharetra. Etiam nec odio iaculis, tincidunt justo sed, suscipit ligula. In vehicula congue elit, vel ullamcorper purus ornare eu. Duis a mi mi. Vestibulum placerat dolor non nisl ultricies, eu sodales neque dignissim. Nam at faucibus velit.\r\n\r\nEtiam eu neque lorem. Etiam vehicula vitae ex quis maximus. Mauris libero est, laoreet ac iaculis quis, elementum non ante. Cras quis arcu tincidunt, venenatis libero quis, egestas turpis. Nullam scelerisque nisi vitae dictum venenatis. In sed commodo quam, id commodo neque. Suspendisse potenti. Nulla posuere vitae justo ac mattis. Phasellus feugiat nisl et sem hendrerit, at finibus ex ornare. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin id finibus nunc. Fusce sollicitudin gravida arcu ac gravida. In interdum scelerisque mauris, non suscipit felis accumsan quis. Proin non augue id tortor aliquam imperdiet id sed erat. Curabitur sed arcu quis augue eleifend condimentum blandit ac risus.\r\n\r\nNam ultricies nisl quis nisi egestas, at facilisis urna convallis. Mauris auctor posuere aliquet. Aenean luctus nunc risus. Phasellus eget elementum leo. In sodales ', 'https://picsum.photos/200/300?random=46');

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `id_articles` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id`, `user_id`, `id_articles`, `content`, `date`) VALUES
(2, 8, 56, 'super!', '2020-01-12 19:49:40'),
(3, 8, 57, 'cool', '2020-01-12 19:49:46'),
(4, 12, 56, 'effectivement.', '2020-01-12 19:50:09'),
(5, 12, 57, 'Trop cool!', '2020-01-12 19:50:31'),
(6, 12, 58, 'First !', '2020-01-12 19:50:38');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `firstname`, `lastname`, `role`) VALUES
(8, 'kurtt.cengiz@gmail.com', '$2b$10$oAWFK.AwEy8GBIYO/OEhiup5NQwhdDaAdelEgtxK8OrFZPBQR7gyy', 'Cengiz', 'Kurt', 'admin'),
(9, 'tutoWin1@gmail.com', '$2b$10$oAWFK.AwEy8GBIYO/OEhiup5NQwhdDaAdelEgtxK8OrFZPBQR7gyy', 'poliche', 'donivane', 'admin'),
(12, 'tutodzadzaWin1@gmail.com', '$2b$10$oAWFK.AwEy8GBIYO/OEhiup5NQwhdDaAdelEgtxK8OrFZPBQR7gyy', 'Cengiz', 'Kurt', 'admin'),
(13, 'tutoaWin1@gmail.com', '$2b$10$1sujgtsCpxMAOrWI.0gf5uCptCmq87h/qiO.zxy.XaC4SiNrrU1C.', 'Cengiz', 'Kurt', 'user'),
(14, 'tutodzadszaWin1@gmail.com', '$2b$10$eGIatKho52eJiZcj8gmb3OECa93v8LjrofKnxFM3pG0y53OUj.oRa', 'Cengiz', 'Kurt', 'user');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`user_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
