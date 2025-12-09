declare type Inmueble = {
  id?: number;
  matricula?: string;
  nomenclaturaCatastral?: string;
  idDepartamento?: number;
  idCiudad?: number;
  bienDeFamilia?: boolean;
}; 
 
 
declare type FiltrosPersonaInmueble = Inmueble &  
{ idInmueble?: number; idPersona?: number; };

declare type InputInmueble = Inmueble & 
{ idInmueble?: number; idPersona?: number;  codigoDepartamento?: string; codigoCiudad?: string; };