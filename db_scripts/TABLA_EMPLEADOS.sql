CREATE TABLE `empleados` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(125) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `apellido` varchar(125) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `fk_tipo_documento` int DEFAULT NULL,
  `documento` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `genero` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `telefono` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `tipo_ocupacion` varchar(255) CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,
  `cod_ocupacion` int NOT NULL,
  `nombre_eps` varchar(255) CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,
  `cod_departamento` int NOT NULL,
  `cod_municipio` int NOT NULL,
  `code_sede` int NOT NULL,
  `factor_prestacional` float DEFAULT '0',
  `usuario_id` int DEFAULT NULL,
  `tipo_documento_empresa` int NOT NULL,
  `nit_empresa` varchar(100) COLLATE latin1_spanish_ci NOT NULL,
  `nombre_empresa` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
  `IBC` double DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `empleados_UN` (`documento`),
  KEY `usuario_id` (`usuario_id`),
  KEY `fk_tipo_documento` (`fk_tipo_documento`),
  KEY `empleados_FK` (`cod_ocupacion`),
  KEY `empleados_FK_1` (`code_sede`),
  KEY `empleados_FK_2` (`cod_departamento`),
  KEY `empleados_FK_3` (`cod_municipio`),
  CONSTRAINT `empleados_FK` FOREIGN KEY (`cod_ocupacion`) REFERENCES `ocupaciones` (`codigo`),
  CONSTRAINT `empleados_FK_1` FOREIGN KEY (`code_sede`) REFERENCES `sedes` (`codigo`),
  CONSTRAINT `empleados_FK_2` FOREIGN KEY (`cod_departamento`) REFERENCES `departamentos` (`codigo`),
  CONSTRAINT `empleados_FK_3` FOREIGN KEY (`cod_municipio`) REFERENCES `municipios` (`codigo`),
  CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`),
  CONSTRAINT `empleados_ibfk_2` FOREIGN KEY (`fk_tipo_documento`) REFERENCES `tipos_documento` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;