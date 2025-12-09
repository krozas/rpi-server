import * as repository from "./inmueble.repository";

export const getByFiltros = async (  
  params: FiltrosPersonaInmueble
) => {
  const result = await repository.getByFiltros(params); 
  return result;
};

export const getTitulares = async (  
  params: FiltrosPersonaInmueble
) => {
  const result = await repository.getTitulares(params); 
  return result;
};  

export const save = async ( 
  input: InputInmueble
): Promise<number> => {
   const result = await repository.save(input);
   return result;
};


export const remove = async ( params: any) => {
 // const result = await dbRepository.remove(params, TABLA, reqContext);
 // return result;
};

export const getDataAnioDpto = async () => {
  const result = await repository.getDataAnioDpto();
  return result;
};

export const esPosibleRegistrar = async (params: Inmueble) => {
  const result = await repository.esPosibleRegistrar(params);
  return result;
};