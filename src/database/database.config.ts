import moment from "moment";
import dbRpi from "../config/knexRpi"; 

const knexRpi = dbRpi;
async function setupAndUseDatabase() {
  try {
    // Create tables
    interface Persona {
      id: number;
      cuit: string;
      apellidos: string;
      nombres: string;
      email?: string;
      nroDoc?: string;
    }
    interface Departamento {
      id: number;
      codigo: string;
      descripcion: string;
    }
    interface Ciudad {
      id: number;
      codigo: string;
      descripcion: string;
    }
    interface Inmuebles {
      id: number;
      matricula: string;
      nomenclaturaCatastral: string;
      idDepartamento: number;
      idCiudad: number;
      bienDeFamilia: boolean;
    }
    interface PersonaInmueble {
      id: number;
      idPersona: number;
      idInmueble: number;
      porcentajeTitularidad: number;
    }

    await knexRpi.schema.createTable("departamentos", (table) => {
      table.increments("id").primary();
      table.string("codigo").unique().notNullable();
      table.string("descripcion").notNullable();
      table
        .date("createdAt")
        .notNullable()
        .defaultTo(moment(new Date()).format("YYYY-MM-DD"));
      table.string("updatedAt");
      table.string("deletedAt");
    });
    await knexRpi.schema.createTable("ciudades", (table) => {
      table.increments("id").primary().notNullable();
      table.string("codigo").unique().notNullable();
      table.string("descripcion").notNullable();
      table
        .date("createdAt")
        .notNullable()
        .defaultTo(moment(new Date()).format("YYYY-MM-DD"));
      table.string("updatedAt");
      table.string("deletedAt");
    });

    await knexRpi.schema.createTable("personas", (table) => {
      table.increments("id").primary().notNullable();
      table.string("nombres");
      table.string("apellidos");
      table.string("email");
      table.string("direccion");
      table.string("telefono");
      table.string("nroDoc").unique();
      table.string("cuit").unique().notNullable();
      table
        .date("createdAt")
        .notNullable()
        .defaultTo(moment(new Date()).format("YYYY-MM-DD"));
      table.string("updatedAt");
      table.string("deletedAt");
    });

    await knexRpi.schema.createTable("inmuebles", (table) => {
      table.increments("id").primary().notNullable();
      table.string("descripcion").notNullable();
      table.string("matricula").unique().notNullable();
      table.string("nomenclaturaCatastral").notNullable();
      table
        .bigint("idDepartamento")
        .notNullable()
        .references("id")
        .inTable("departamentos");
      table
        .bigint("idCiudad")
        .notNullable()
        .references("id")
        .inTable("ciudades");
      table.boolean("bienDeFamilia"); //.notNullable();
      table
        .date("createdAt")
        .notNullable()
        .defaultTo(moment(new Date()).format("YYYY-MM-DD"));
      table.string("updatedAt");
      table.string("deletedAt");
    });
    await knexRpi.schema.createTable("personas_inmuebles", (table) => {
      table.increments("id").primary().notNullable();
      table
        .bigint("idPersona")
        .notNullable()
        .references("id")
        .inTable("personas");
      table
        .bigint("idInmueble")
        .notNullable()
        .references("id")
        .inTable("inmuebles");
      table.float("porcentajeTitularidad").notNullable();
      table
        .date("createdAt")
        .notNullable()
        .defaultTo(moment(new Date()).format("YYYY-MM-DD"));
      table.string("updatedAt");
      table.string("deletedAt");
    });

    // console.log('Table "personas" created successfully.');
    // Insert data
    await knexRpi("personas").insert([
      {
        nombres: "Alice",
        apellidos: "Garcia",
        email: "alice@example.com",
        nroDoc: "123456789",
        cuit: "111234567891",
      },
      {
        nombres: "Bob",
        apellidos: "Borda",
        email: "bob@example.com",
        nroDoc: "987654321",
        cuit: "229876543212",
      },
      {
        nombres: "Mari",
        apellidos: "Perez",
        email: "mar@example.com",
        nroDoc: "14779598",
        cuit: "11147795981",
      },
      {
        nombres: "Jose",
        apellidos: "Escobar",
        email: "jose@example.com",
        nroDoc: "25756998",
        cuit: "22257569982",
      },
    ]);

    await knexRpi("departamentos").insert([
      { codigo: "001", descripcion: "Departamento 1" },
      { codigo: "002", descripcion: "Departamento 2" },
    ]);

    await knexRpi("ciudades").insert([
      { codigo: "001", descripcion: "Ciudad 1" },
      { codigo: "002", descripcion: "Ciudad 2" },
    ]);

    await knexRpi("inmuebles").insert([
      {
        createdAt: moment(new Date("2023-12-02")).format("YYYY-MM-DD"),
        matricula: "123456789",
        descripcion: "Inmueble 1",
        nomenclaturaCatastral: "1234-1234-1234-1234-1234",
        idDepartamento: 1,
        idCiudad: 1,
        bienDeFamilia: false,
      },
      {
        createdAt: moment(new Date("2024-09-02")).format("YYYY-MM-DD"),
        matricula: "897456212",
        descripcion: "Inmueble 2",
        nomenclaturaCatastral: "1234-5678-1234-5678-1234",
        idDepartamento: 1,
        idCiudad: 1,
        bienDeFamilia: false,
      },
      {
        createdAt: moment(new Date("2024-10-02")).format("YYYY-MM-DD"),
        matricula: "897456555",
        descripcion: "Inmueble ",
        nomenclaturaCatastral: "1234-9999-1234-9999-1234",
        idDepartamento: 1,
        idCiudad: 1,
        bienDeFamilia: false,
      },
      {
        createdAt: moment(new Date()).format("YYYY-MM-DD"),
        matricula: "987654321",
        descripcion: "Inmueble 4",
        nomenclaturaCatastral: "5678-5678-5678-5678-5678",
        idDepartamento: 2,
        idCiudad: 2,
        bienDeFamilia: false,
      },
    ]);
    await knexRpi("personas_inmuebles").insert([
      { idPersona: 1, idInmueble: 1, porcentajeTitularidad: 0.5 },
      { idPersona: 2, idInmueble: 1, porcentajeTitularidad: 0.5 },
      { idPersona: 3, idInmueble: 2, porcentajeTitularidad: 0.5 },
      { idPersona: 4, idInmueble: 2, porcentajeTitularidad: 0.5 },
    ]);

    /*  console.log('Data inserted successfully.');
        const personas: Persona[] = await knexRpi('personas').select('*');
         console.log('Personas:', personas);

         const departamentos: Departamento[] = await knexRpi('departamentos').select('*');
         console.log('departamentos:', departamentos);
         const ciudades: Ciudad[] = await knexRpi('ciudades').select('*');
         console.log('ciudades:', ciudades);
  
         const personasInmuebles: PersonaInmueble[] = await knexRpi('personas_inmuebles').select('*');
         console.log('personasInmuebles:', personasInmuebles);

 */
    const inmuebles: Inmuebles[] = await knexRpi("inmuebles").select("*");
    console.log("inmuebles:", inmuebles);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Destroy the Knex connection pool when done
    //await knexRpi.destroy();
    console.log("Knex connection finally.");
  }
}

export default setupAndUseDatabase;
