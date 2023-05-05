import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "192.168.150.29",
    port: 3306,
    username: "serge",
    password: "123456_Qq",
    database: "mchs",
    synchronize: false,
    logging: false,
    entities: ['src/entity/**/*.ts']
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })