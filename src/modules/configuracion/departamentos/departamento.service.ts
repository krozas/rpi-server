import * as repository from "./departamento.repository";

export const getByFiltros = async (  
  params: any
) => {
  const result = await repository.getByFiltros(params);
  return result;
};


export const save = async ( 
  input: InputDepartamento
): Promise<number> => {
   const result = await repository.save(input);
   return result;
};
export const remove = async ( params: any) => {
 const result = await repository.remove(params);
 return result;
};