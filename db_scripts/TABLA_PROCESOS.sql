CREATE TABLE `procesos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `codigo` int NOT NULL,
  `descripcion` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `procesos_UN` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_