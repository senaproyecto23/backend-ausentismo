CREATE TABLE `ausentismo_documentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ausentismo_id` int NOT NULL,
  `empleado_documento` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `path_documento` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ausentismo_documentos_FK` (`ausentismo_id`),
  KEY `ausentismo_documentos_FK_1` (`empleado_documento`),
  CONSTRAINT `ausentismo_documentos_FK` FOREIGN KEY (`ausentismo_id`) REFERENCES `ausentismo` (`id`),
  CONSTRAINT `ausentismo_documentos_FK_1` FOREIGN KEY (`empleado_documento`) REFERENCES `empleados` (`documento`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;