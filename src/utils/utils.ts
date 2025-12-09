import knexRpi from "@src/config/knexRpi";
import axios from "axios";

export async function makeHttpRequest(
  url: string,
  method: string,
  body: any = {},
  headers: any = {}
) {
  let confHeader = { ...headers, maxBodyLength: 20 * 1024 * 1024 };
  return await axios({
    url: url,
    method: method,
    data: body,
    headers: confHeader,
  })
    .then(async (response) => {
      return response.data;
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
}

export async function save(input: any, tabla: string) {
  let newId: number = 0;
  let resp: any;
  try {
    if (input.id === 0) {
      //es un nuevo objeto
      delete input.id;
      resp = await knexRpi(tabla).insert(input);
    } else resp = await knexRpi(tabla).where("id", input.id).update(input);
    console.log("🚀 ~ save ~ resp:", resp);
    if (resp.length > 0) {
      newId = resp[0];
    }
  } catch (err) {
    console.error(err);
  }
  return newId;
}
