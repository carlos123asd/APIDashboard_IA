import { Router } from "express";

const routeIA = Router()

const postCharAnalisisMain = async (req,res) => {
    const { rooms, gaining } = req.body
    const propmt = `
        Estas son las habitaciones ${rooms}
        y estas son las ganacias respecto a las habitaciones mes a mes
        ${gaining}. Analisa los datos y en funcion de esos datos
        quiero que me des una lectura de los datos y en caso de ser favorable
        añadir una felicitacion al final y un posible consejo para seguir 
        subiendo la ocupacion del hotel y si es negativa centrarse en dar un 
        seguimiento de esas habitaciones que necesitas aumentar su ocupacion
        dando consejos para esas habitaciones, no olvides mencionar
        el titulo de las habitaciones, todo esto me lo tienes que dar en ingles.
    `;

    try{
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                propmt,
                max_tokens: 200,
            })
        });
        if(response.ok){
            const data = await response.json();
            res.send({
                response: data.choices[0].text.trim()
            });
        }
    }catch(error){
        console.error(error)
        res.status(500).send("Hubo un problema con el analisis charAnalisisMain");
    }
}

routeIA.post('/analysisChar',postCharAnalisisMain)

export default routeIA