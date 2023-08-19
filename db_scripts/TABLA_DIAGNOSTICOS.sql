CREATE TABLE `diagnosticos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `codigo` varchar(100) COLLATE latin1_spanish_ci NOT NULL,
  `descripcion` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `diagnosticos_UN` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=12426 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;