import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../util/database";
import { ObjectId } from 'mongodb';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

  
  if (req.method === 'GET') {
    
    // console.log(req.query,"확인~~~~");
  
    const db = (await connectDB).db('frankenshop')
    let result = await db.collection('cart').find({ parent: new ObjectId(req.body._id) }).toArray()

    // console.log(result, "확인~~~2");
    return res.status(200).json(result)

  }

}