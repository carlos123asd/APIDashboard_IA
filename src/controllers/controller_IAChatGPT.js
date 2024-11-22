import { Router } from "express";
import OpenAI from "openai";

const routeIA = Router()

const postCharAnalisisMain = async (req,res) => {
    const { rooms, gaining } = req.body
    const roomFormated = rooms.join(', ');
    const gainingFormated = gaining.map((gain,index) => {
        return `Month ${index+1}: ${gain.join(', ')}`
    })
    
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are an expert data analyst specializing in hotel management. Your task is to analyze data about room occupancy and revenue, provide a concise summary of the trends, and suggest actionable strategies to improve room occupancy rates. Always respond in English." },
            {
                role: "user",
                content: `
                    These are the rooms: ${roomFormated}  
                    and these are the revenues for the rooms month by month (each month includes the revenue for all rooms in an ordered manner):  
                    ${gainingFormated}. Analyze the data, and based on it,  
                    provide an evaluation. If the performance is favorable,  
                    include a congratulatory remark for the progress in the occupancy of those rooms  
                    and offer advice to further increase the hotel's occupancy.  
                    If the performance is unfavorable, focus on tracking those rooms that  
                    need to improve their occupancy by providing specific advice for those rooms.
                `
            }
        ]
    });

    res.send({
        response: completion.choices[0].message.content
    });
}

routeIA.post('/analysisChar',postCharAnalisisMain)

export default routeIA