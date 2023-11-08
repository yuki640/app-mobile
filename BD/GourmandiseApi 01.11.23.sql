-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mer. 01 nov. 2023 à 15:18
-- Version du serveur : 10.3.39-MariaDB-0+deb10u1
-- Version de PHP : 8.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `GourmandiseApi`
--

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `codec` int(11) NOT NULL COMMENT 'Identifiant du client',
  `nom` varchar(35) NOT NULL COMMENT 'Nom et Prénom',
  `adresse` varchar(50) DEFAULT NULL COMMENT 'Adresse du client',
  `cp` varchar(5) NOT NULL COMMENT 'Code postal ',
  `ville` varchar(25) NOT NULL COMMENT 'Ville',
  `telephone` varchar(25) DEFAULT NULL COMMENT 'Téléphone principal du client',
  `mail` varchar(100) NOT NULL COMMENT 'Adresse Mail du client',
  `motdepasse` varchar(70) NOT NULL COMMENT 'Mot de passe du client',
  `adrLivraison` varchar(191) NOT NULL COMMENT 'Adresse de livraison',
  `token` varchar(191) DEFAULT NULL COMMENT 'token d''authentification de l''utilisateur'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`codec`, `nom`, `adresse`, `cp`, `ville`, `telephone`, `mail`, `motdepasse`, `adrLivraison`, `token`) VALUES
(1, 'Pareschi Thomas', '29ter route de fontaines en sologne', '41700', 'Cour-Cheverny', '0777995137', 'thomas.pareschi@hotmail.com', '$2b$10$yYAU1Ue2.9xVG/Qp3SWQTuvNe69r3HGItGUs3Ewl1BBI7ZAbIbH7.', '29ter route de fontaines en sologne', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTg3ODY5NjUsImV4cCI6MTY5ODgwNDk2NX0.PTTuxw4xYWWwRI_7SnLN_5FGPcgoxvJ4kE964upaLqQ');

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

CREATE TABLE `commande` (
  `numero` int(11) NOT NULL COMMENT 'Num?ro de la commande',
  `codev` int(11) NOT NULL COMMENT 'Indiquer le vendeur',
  `codec` int(11) NOT NULL COMMENT 'Indiquer le client',
  `date_livraison` datetime DEFAULT NULL,
  `date_commande` datetime DEFAULT NULL COMMENT 'Indiquer la date de commande',
  `total_ht` double DEFAULT 0 COMMENT 'Total facture hors taxes',
  `total_tva` double DEFAULT 0 COMMENT 'Total tva',
  `etat` tinyint(3) UNSIGNED DEFAULT 0 COMMENT '1 commande en cours 2 commande cloturée'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `ligne_commande`
--

CREATE TABLE `ligne_commande` (
  `numero` int(11) NOT NULL COMMENT 'Numéro de commande',
  `numero_ligne` smallint(6) NOT NULL COMMENT 'Numéro de ligne',
  `reference` int(11) NOT NULL COMMENT 'Référence du produit',
  `quantite_demandee` smallint(6) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `panier`
--

CREATE TABLE `panier` (
  `codepa` int(11) NOT NULL COMMENT 'code panier',
  `codec` int(11) NOT NULL COMMENT 'code client',
  `total_prix` double NOT NULL COMMENT 'total prix',
  `numero_ligne` smallint(11) NOT NULL COMMENT 'numéro de ligne',
  `reference` int(11) NOT NULL COMMENT 'référence produit',
  `quantite` smallint(6) NOT NULL COMMENT 'quantité produit'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

CREATE TABLE `produit` (
  `reference` int(11) NOT NULL COMMENT 'Référence du produit',
  `designation` varchar(30) NOT NULL COMMENT 'Désignation du produit',
  `image` varchar(100) DEFAULT NULL COMMENT 'Image du produit',
  `quantite` int(11) DEFAULT NULL COMMENT 'Poids du produit ou nombre de pièces',
  `descriptif` varchar(1) NOT NULL DEFAULT 'G' COMMENT 'Unité de mesure G pour gramme et P pour Pièce',
  `prixUHT` double DEFAULT NULL COMMENT 'Prix unitaire hors taxes',
  `prixPromo` double DEFAULT NULL COMMENT 'Prix promotion',
  `stock` smallint(6) DEFAULT 0 COMMENT 'Etat du stock',
  `poidsP` int(11) DEFAULT 0 COMMENT 'Poids d''une pièce en grammes pour les articles vendus par pièce'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `produit`
--

INSERT INTO `produit` (`reference`, `designation`, `image`, `quantite`, `descriptif`, `prixUHT`, `prixPromo`, `stock`, `poidsP`) VALUES
(1004, 'FEU DE JOIE LIQUEUR ASSORT.', NULL, 25, 'G', 23, 0, 500, 0),
(1007, 'TENDRE FRUIT', NULL, 500, 'G', 18, 0, 120, 0),
(1015, 'CARACAO', NULL, 500, 'G', 24.5, 0, 50, 0),
(1016, 'COKTAIL', NULL, 500, 'G', 33, 0, 40, 0),
(1017, 'ORFIN', NULL, 500, 'G', 32, 0, 40, 0),
(3002, 'CARRE PECTO', NULL, 500, 'G', 29, 0, 40, 0),
(3004, 'ZAN ALESAN', NULL, 25, 'P', 15, 0, 50, 20),
(3010, 'PATES GRISES', NULL, 500, 'G', 35, 0, 100, 0),
(3016, 'CARAMEL AU LAIT', NULL, 500, 'G', 20, 0, 100, 0),
(3017, 'VIOLETTE TRADITION', NULL, 500, 'G', 25, 0, 100, 0),
(4002, 'SUCETTE BOULE FRUIT', NULL, 25, 'P', 14, 0, 100, 40),
(4004, 'SUCETTE BOULE POP', NULL, 25, 'P', 21, 0, 50, 40),
(4010, 'CARAMBAR', NULL, 40, 'P', 18, 0, 20, 15),
(4011, 'CARANOUGA', NULL, 40, 'P', 18, 0, 100, 15),
(4012, 'CARAMBAR FRUIT', NULL, 40, 'P', 19.5, 0, 100, 0),
(4013, 'CARAMBAR COLA', NULL, 40, 'P', 18, 0, 50, 15),
(4015, 'SOURIS REGLISSE', NULL, 500, 'G', 24, 0, 50, 0),
(4016, 'SOURIS CHOCO', NULL, 500, 'G', 24, 0, 50, 0),
(4019, 'SCHTROUMPFS VERTS', NULL, 500, 'G', 24, 0, 50, 0),
(4020, 'CROCODILE', NULL, 500, 'G', 21, 0, 50, 0),
(4022, 'PERSICA', NULL, 500, 'G', 28, 0, 20, 0),
(4025, 'COLA CITRIQUE', NULL, 500, 'G', 21, 0, 50, 0),
(4026, 'COLA LISSE', NULL, 500, 'G', 25, 0, 50, 0),
(4027, 'BANANE', NULL, 1000, 'G', 23, 0, 20, 0),
(4029, 'OEUF SUR LE PLAT', NULL, 500, 'G', 25, 0, 20, 0),
(4030, 'FRAISIBUS', NULL, 500, 'G', 25, 0, 50, 0),
(4031, 'FRAISE TSOIN-TSOIN', NULL, 500, 'G', 25, 0, 40, 0),
(4032, 'METRE REGLISSE ROULE', NULL, 500, 'G', 19, 0, 50, 0),
(4033, 'MAXI COCOBAT', NULL, 1000, 'G', 19, 0, 20, 0),
(4034, 'DENTS VAMPIRE', NULL, 500, 'G', 22, 0, 50, 0),
(4036, 'LANGUE COLA CITRIQUE', NULL, 500, 'G', 21, 0, 40, 0),
(4037, 'OURSON CANDI', NULL, 1000, 'G', 21, 0, 50, 0),
(4039, 'SERPENT ACIDULE', NULL, 500, 'G', 21, 0, 20, 0),
(4042, 'TETINE CANDI', NULL, 500, 'G', 20, 0, 40, 0),
(4045, 'COLLIER PECCOS', NULL, 15, 'P', 21, 0, 50, 50),
(4052, 'TWIST ASSORTIS', NULL, 500, 'G', 22, 0, 50, 0),
(4053, 'OURSON GUIMAUVE', NULL, 500, 'G', 35, 0, 10, 0),
(4054, 'BOULE COCO MULER', NULL, 500, 'G', 34, 0, 10, 0),
(4055, 'COCOMALLOW', NULL, 500, 'G', 33, 0, 10, 0),
(4057, 'CRIC-CRAC', NULL, 500, 'G', 33, 0, 10, 0);

-- --------------------------------------------------------

--
-- Structure de la table `vendeur`
--

CREATE TABLE `vendeur` (
  `codev` int(11) NOT NULL COMMENT 'Identifiant du vendeur',
  `nom` varchar(35) NOT NULL COMMENT 'Nom du vendeur',
  `prenom` varchar(255) NOT NULL COMMENT 'prénom du vendeur',
  `adresse` varchar(50) DEFAULT NULL COMMENT 'Adresse du vendeur',
  `cp` varchar(5) NOT NULL COMMENT 'Code postal',
  `ville` varchar(25) NOT NULL COMMENT 'Ville',
  `telephone` varchar(25) DEFAULT NULL COMMENT 'Téléphone principal du vendeur',
  `login` varchar(255) NOT NULL,
  `motdepasse` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `vendeur`
--

INSERT INTO `vendeur` (`codev`, `nom`, `prenom`, `adresse`, `cp`, `ville`, `telephone`, `login`, `motdepasse`) VALUES
(15, 'Fillard', 'Sylvain', '29 route de machine', '51100', 'REIMS', '03.26.12.25.25', 'sfillard', 'cbe7613845cfcd815bd481b8c625c7c8'),
(17, 'Baudot', 'Marc', 'dadsffdsdfd', '51000', 'CHALONS EN CHAMPAGNE', '03.26.10.58.59', 'mbaudot', 'cbe7613845cfcd815bd481b8c625c7c8');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`codec`);

--
-- Index pour la table `commande`
--
ALTER TABLE `commande`
  ADD PRIMARY KEY (`numero`),
  ADD KEY `clientcommande` (`codec`),
  ADD KEY `vendeurcommande` (`codev`);

--
-- Index pour la table `ligne_commande`
--
ALTER TABLE `ligne_commande`
  ADD PRIMARY KEY (`numero`,`numero_ligne`),
  ADD KEY `commandeligne_commande` (`numero`),
  ADD KEY `produitligne_commande` (`reference`);

--
-- Index pour la table `panier`
--
ALTER TABLE `panier`
  ADD PRIMARY KEY (`codepa`),
  ADD KEY `fk_panier_client` (`codec`),
  ADD KEY `fk_panier_produit` (`reference`);

--
-- Index pour la table `produit`
--
ALTER TABLE `produit`
  ADD PRIMARY KEY (`reference`);

--
-- Index pour la table `vendeur`
--
ALTER TABLE `vendeur`
  ADD PRIMARY KEY (`codev`),
  ADD UNIQUE KEY `login` (`login`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `codec` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identifiant du client', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `commande`
--
ALTER TABLE `commande`
  MODIFY `numero` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Num?ro de la commande';

--
-- AUTO_INCREMENT pour la table `panier`
--
ALTER TABLE `panier`
  MODIFY `codepa` int(11) NOT NULL AUTO_INCREMENT COMMENT 'code panier';

--
-- AUTO_INCREMENT pour la table `produit`
--
ALTER TABLE `produit`
  MODIFY `reference` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Référence du produit', AUTO_INCREMENT=4058;

--
-- AUTO_INCREMENT pour la table `vendeur`
--
ALTER TABLE `vendeur`
  MODIFY `codev` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identifiant du vendeur', AUTO_INCREMENT=18;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commande`
--
ALTER TABLE `commande`
  ADD CONSTRAINT `commande_ibfk_1` FOREIGN KEY (`codec`) REFERENCES `client` (`codec`),
  ADD CONSTRAINT `commande_ibfk_2` FOREIGN KEY (`codev`) REFERENCES `vendeur` (`codev`);

--
-- Contraintes pour la table `ligne_commande`
--
ALTER TABLE `ligne_commande`
  ADD CONSTRAINT `ligne_commande_ibfk_1` FOREIGN KEY (`reference`) REFERENCES `produit` (`reference`),
  ADD CONSTRAINT `ligne_commande_ibfk_2` FOREIGN KEY (`numero`) REFERENCES `commande` (`numero`);

--
-- Contraintes pour la table `panier`
--
ALTER TABLE `panier`
  ADD CONSTRAINT `fk_panier_client` FOREIGN KEY (`codec`) REFERENCES `client` (`codec`),
  ADD CONSTRAINT `fk_panier_produit` FOREIGN KEY (`reference`) REFERENCES `produit` (`reference`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
