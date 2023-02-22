// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from 'utils/connection';


type Data = {
    response?: string,
    name?: string
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    console.log(req.body)

    if (!req.body) {
        res.status(400).json({response: "Not request body."})
        return;
    }
    
    let {userEmail, userPassword, userPhone, userName}: {userEmail?: string, userPassword?: string, userPhone?: string, userName?: string,} = JSON.parse(req.body)
    
    if (!userEmail || !userPassword) {
        res.status(400).json({response: "Not user nor password."})
        return;
    }

    const {User} = await connect()
    
    User.create({
        userEmail,
        userPassword,
        userName
    })

    res.status(200).json({   
        response: "Done!",
    })
}
