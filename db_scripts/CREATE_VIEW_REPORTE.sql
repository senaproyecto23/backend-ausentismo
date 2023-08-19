CREATE OR REPLACE
ALGORITHM = UNDEFINED VIEW `reporte` AS
select
    `a`.`fecha_inicio` AS `fecha_inicio`,
    `a`.`fecha_fin` AS `fecha_fin`,
    `a`.`fecha_creacion` AS `fecha_creacion`,
    `a`.`estado` AS `estado`,
    `a`.`cod_contingencia` AS `cod_contingencia`,
    `a`.`cod_proceso` AS `cod_proceso`,
    `a`.`cod_diagnostico` AS `cod_diagnostico`,
    `a`.`observacion` AS `observacion`,
    `e`.`nombre` AS `nombre`,
    `e`.`apellido` AS `apellido`,
    `e`.`fk_tipo_documento` AS `fk_tipo_documento`,
    `e`.`documento` AS `documento`,
    `e`.`fecha_nacimiento` AS `fecha_nacimiento`,
    `e`.`genero` AS `genero`,
    `e`.`tipo_ocupacion` AS `tipo_ocupacion`,
    `e`.`cod_ocupacion` AS `cod_ocupacion`,
    `e`.`nombre_eps` AS `nombre_eps`,
    `e`.`cod_departamento` AS `cod_departamento`,
    `e`.`cod_municipio` AS `cod_municipio`,
    `e`.`code_sede` AS `code_sede`,
    `e`.`factor_prestacional` AS `factor_prestacional`,
    `e`.`tipo_documento_empresa` AS `tipo_documento_empresa`,
    `e`.`nit_empresa` AS `nit_empresa`,
    `e`.`IBC` AS `IBC`
from
    (`ausentismo` `a`
join `empleados` `e` on
    ((`e`.`documento` = `a`.`empleado_documento`)));