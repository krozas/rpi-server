import knexRpi from "@src/config/knexRpi";
import * as utils from "@src/utils/utils";
import moment from "moment";

export const getByFiltros = async (params: FiltrosPersonaInmueble) => {
  let query = knexRpi(`inmuebles as i`)
    .join("departamentos as d", "d.id", "i.idDepartamento")
    .join("ciudades as c", "c.id", "i.idCiudad")
    .select(
      knexRpi.raw([
        "i.*",
        `CONCAT(d.codigo, ' ', UPPER(d.descripcion)) as codigoDepartamento`,
        `CONCAT(c.codigo, ' ', UPPER(c.descripcion)) as codigoCiudad`,
      ])
    )
    .whereNull("i.deletedAt");
  if (params.matricula) {
    query.where("i.matricula", params.matricula);
  }
  if (params.id) {
    query.where("i.id", params.id);
  }
  if (params.nomenclaturaCatastral) {
    query.where(
      "i.nomenclaturaCatastral",
      "like",
      `%${params.nomenclaturaCatastral}%`
    );
  }
  return await query;
};

export const getTitulares = async (params: FiltrosPersonaInmueble) => {
  let query = knexRpi(`personas_inmuebles as pi`)
    .join("personas as p", "p.id", "pi.idPersona")
    .join("inmuebles as i", "i.id", "pi.idInmueble")
    .select()
    .whereNull("p.deletedAt");
  if (params.idInmueble) {
    query.where("pi.idInmueble", params.idInmueble);
  }
  if (params.idPersona) {
    query.where("pi.idPersona", params.idPersona);
  }
  return await query;
};

export const save = async (input: InputInmueble): Promise<number> => {
  delete input.codigoDepartamento;
  delete input.codigoCiudad;
  let res = await utils.save(input, "inmuebles");
  return res;
};

export const getDataAnioDpto = async () => {
  let query = knexRpi(`inmuebles as i`)
    .join("departamentos as d", "d.id", "i.idDepartamento")
    .select(
      knexRpi.raw([
        "strftime('%Y', i.createdAt) as year",
        `CONCAT(d.codigo, ' ', UPPER(d.descripcion)) as codigoDepartamento`,
      ])
    )
    .count({ count: "*" })
    .groupBy("year", "codigoDepartamento");

  return await query;
};

export const esPosibleRegistrar = async (params: Inmueble) => {
  const titulares = await getTitulares({
    idInmueble: params.id,
  }); 
  let totalPorcentaje = 0;
  let esTitular = false;
  if (titulares.length > 0) {
    let i = 0;
    while (i < titulares.length && !esTitular) {
      totalPorcentaje += titulares[i].porcentajeTitularidad;
      const listaInmuebles = await getByFiltros({
        idInmueble: titulares[i].idPersona,
      });
      listaInmuebles.filter((inmueble: Inmueble) => {
        if (inmueble.bienDeFamilia === true) {
          esTitular = true;
        }
      });
      i++;
    }
  }
  const exito = totalPorcentaje === 1 && !esTitular;
  let mensaje = " El inmueble fue registrado como bien de familia.";
  if (!exito) {
    mensaje = esTitular
      ? "Alguno de los titulares del inmueble ha registrado otro inmueble como bien de familia."
      : " El inmueble no ha sido registrado al 100%";
  }

  return { exito: exito, mensaje: mensaje };
};

export const remove = async (params: any) => {
  params.deletedAt = moment(new Date()).format("YYYY-MM-DD");
  const id = await utils.save(params, "inmuebles");
  return id;
};
