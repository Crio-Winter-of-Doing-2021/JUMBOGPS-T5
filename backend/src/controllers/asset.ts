import { S_IFREG } from "constants";
import { Request, Response } from "express";
const Asset = require("../models/Asset");

exports.createAsset = async (req: Request, res: Response) => {
  const data = {
    name: req.body.name,
    desc: req.body.desc,
    track: [
      {
        lat: req.body.lat,
        lon: req.body.lon,
      },
    ],
  };

  const asset = new Asset(data);
  await asset.save((err: any, result: any) => {
    if (err) {
      return res.status(422).json({
        errors: err.message,
      });
    }
    return res.status(201).json(result);
  });
};

exports.updateLocation = async (req: Request, res: Response) => {

  if(!req.body.lat || !req.body.lon || !req.body.arrived){
      return res.status(422).json({
          errors: "Lat, lon and arrived are required"
      })
  }  

  const data = await Asset.updateOne(
    { _id: req.params.id },
    {
      $push: {
        track: {
          lat: req.body.lat,
          lon: req.body.lon,
        },
      },
      $set: {
        arrived: req.body.arrived,
      },
    },
  );

      return res.status(200).json({
          message: "Successfully updated"
      })
};

exports.getAssets = async (req:Request, res: Response) => {
    const data = await Asset.find({})
    return res.status(200).json(data)
}

exports.getAsset = async (req:Request, res: Response) => {

    console.log(req.query.id)

    const data = await Asset.findOne({_id: req.query.id}).exec()

    if(!data) {
        return res.status(422).json({
            errors: "Asset does not exist"
        })
    }

    return res.status(200).json(data)
}