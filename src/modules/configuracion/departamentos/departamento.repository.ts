import knexRpi from "@src/config/knexRpi";
import moment from "moment";
import * as utils from "@src/utils/utils";

export const getByFiltros = async (params: FiltrosPersonaInmueble) => { 
  let query = knexRpi(`departamentos as d`)
    .select("d.*", "d.id as idDepartamento")
    .whereNull("deletedAt");

  if (params.id) {
    query.where("d.id", params.id);
  }

  return await query;
};

export const remove = async (params: any) => {
  params.deletedAt = moment(new Date()).format("YYYY-MM-DD");
  const id = await utils.save(params, "departamentos");
  return id;
};

 

export const save = async (input: InputDepartamento): Promise<number> => {
  console.log("🚀 ~ save ~ input:", input);
  const id = await utils.save(input, "departamentos");
  return id;
};
