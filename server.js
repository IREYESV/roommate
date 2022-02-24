const express = require('express');
//const enviar_email = require('./email.js');
const app = express();
const axios = require('axios');
const fs = require('fs').promises;
const uuid = require('uuid');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('static'));

app.get("/gastos", (req, res) => {
    let base_gastos= require('./db.json')
    console.log(base_gastos)
    let gastos=base_gastos.gastos
    res.send({ gastos })

})
app.get("/roommates", (req, res) => {
    let basedatos = require('./db.json')
    console.log(basedatos)
    let roommates=basedatos.roommates
    res.send({ roommates })
    
})  
    
        
//para obtener el nuevo usuario roommate 
async function nuevo_roommate() {
    const datos = await axios.get("https://randomuser.me/api")

//desempaquetar los datos de uno
    const randomuser = datos.data.results[0]
    return nuevo_user = {

        //Generamos el id se utiliza el slice para reducir el numero de caracteres
        id: uuid.v4().slice(30),
        nombre: randomuser.name.first + ' ' + randomuser.name.last
    
    }
}

app.post("/roommate", async (req, res) => {
    const roommate = await nuevo_roommate()


    //leemos el archivo creado
    let db = await fs.readFile('db.json', "utf-8")
    
    //trasformando de un string a un objeto
    db = JSON.parse(db)

    //enviamos la informacion a la base de datos
    db.roommates.push(roommate)


    //Finalmente guardo el nuevo usuario
    await fs.writeFile('db.json', JSON.stringify(db), "utf-8")
    res.send({ exito:"okey" })
})

// acpa vamos a agregar un gasto
app.post('/gasto', async (req, res) => {
    let body;
    req.on('data', (payload) => {
        body = JSON.parse(payload);
        console.log(body);
    });
    req.on('end', async () => {
        console.log(body);

        // acá tenemos que crear el gasto genrandolo como objeto gasto
        const nuevo_gasto = {
            //identificar el gasto (llave)
            id: uuid.v4(),
            roommate: body.roommate,
            descripcion: body.descripcion,
            monto: body.monto
        }
        let db = await fs.readFile('db.json',"utf-8")
    
        //trasformando de un string a un objeto
        db = JSON.parse(db)

        //enviamos la informacion a la base de datos
        db.gastos.push(nuevo_gasto)

       //Finalmente guardo el nuevo gasto 
        await fs.writeFile('db.json', JSON.stringify(db), "utf-8")
        res.send({todo: 'ok' })
        
    });
});

//gasto puede sufrir una modificacion 
app.put('/gasto', async (req, res) => {
    let body;
    req.on('data', (payload) => {
        body = JSON.parse(payload);

        console.log(body);
    });
    req.on('end', async () => {
        console.log(body);


        let cambio_producto
        // acá tenemos que crear el gasto genrandolo como objeto gasto
        const nuevo_gasto = {
            //identificar el gasto (llave)
            id: uuid.v4(),
            roommate: body.roommate,
            descripcion: body.descripcion,
            monto: body.monto
        }
        let db = await fs.readFile('db.json',"utf-8")
        db.gastos.map(x=)

        //trasformando de un string a un objeto
        db = JSON.parse(db)

        //enviamos la informacion a la base de datos
        db.gastos.push(nuevo_gasto)

       //Finalmente guardo el nuevo gasto 
        await fs.writeFile('db.json', JSON.stringify(db), "utf-8")
        res.send({todo: 'ok' })
        
    });
});
    




app.listen(3000, ()=>console.log("servidor corriendo en el puerto 3000"));
