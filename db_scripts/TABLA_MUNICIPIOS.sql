CREATE TABLE `municipios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `codigo` int NOT NULL,
  `descripcion` varchar(255) CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,
  `departamento_codigo` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `municipios_UN` (`codigo`),
  KEY `municipios_FK` (`departamento_codigo`),
  CONSTRAINT `municipios_FK` FOREIGN KEY (`departamento_codigo`) REFERENCES `departamentos` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=1123 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;