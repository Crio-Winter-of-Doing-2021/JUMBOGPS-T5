import { Request, Response } from "express";
const Asset = require("../models/Asset");
const GeoFence = require("../models/GeoFence");
const AssetTrack = require("../models/AssetTrack");
const Notification = require("../models/Notification");
const GeoRoute = require('../models/GeoRoute')
var mongoose = require("mongoose");
var geojson = require('geojson-tools')
const [convert, parses] = require('../utils/geojson.js')


exports.createAsset = async (req: Request, res: Response) => {
  const data_asset = {
    name: req.body.name,
    desc: req.body.desc,
    type: req.body.type,
    image_url: req.body.image_url,
    body: req.body.body,
    lat: req.body.lat,
    lon: req.body.lon,
    timestamp: req.body.timestamp,
  };

  const track_data_asset = {
    lat: req.body.lat,
    lon: req.body.lon,
    timestamp: req.body.timestamp,
  };

  const asset = new Asset(data_asset);

  await asset.save(async (err: any, result: any) => {
    if (err) {
      console.log(err);
      return res.status(422).json({
        data: {},
        error: err.message,
      });
    }

    const geofence = new GeoFence({
      _id: result._id,
      type: "Feature",
    });

    await geofence.save((error: any, results: any) => {
      if (err) {
        return res.status(422).json({
          data: {},
          error: error.message,
        });
      }
    });

    const georoute = new GeoRoute({
      _id: result._id,
      type: "Feature",
    });

    await georoute.save((error: any, results: any) => {
      if (err) {
        return res.status(422).json({
          data: {},
          error: error.message,
        });
      }
    });

    

    const notification = new Notification({
      _id: result._id,
      name: req.body.name,
    });

    notification.save((error: any, results: any) => {
      if (err) {
        return res.status(422).json({
          data: {},
          error: error.message,
        });
      }
    });

    const asset_track = new AssetTrack({
      _id: result._id,
      track: [track_data_asset],
    });

    await asset_track.save((error: any, results: any) => {
      if (err) {
        return res.status(422).json({
          data: {},
          error: error.message,
        });
      }
      return res.status(201).json({
        data: result,
        error: {},
      });
    });
  });
};

exports.updateLocation = async (req: Request, res: Response) => {
  if (!req.body.lat || !req.body.lon || !req.body.timestamp) {
    return res.status(422).json({
      data: {},
      error: { message: "Lat, lon and timestamp are required" },
    });
  }

  const asset_data = await Asset.updateOne(
    { _id: req.params.id },
    {
      $set: {
        lat: req.body.lat,
        lon: req.body.lon,
        timestamp: req.body.timestamp,
      },
    }
  );

  const track_data = await AssetTrack.updateOne(
    { _id: req.params.id },
    {
      $push: {
        track: {
          lat: req.body.lat,
          lon: req.body.lon,
          timestamp: req.body.timestamp,
        },
      },
    }
  );

  let geofence_data = await GeoFence.find({
    $and: [
      { _id: req.params.id },
      {
        geometry: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [req.body.lon, req.body.lat],
            },
            $maxDistance: 50000,
          },
        },
      },
    ],
  });

  if(geofence_data.length==0) {
    let updateNotification = await Notification.updateOne({_id: req.params.id}, 
      { 
        $push: {
          track: {
            lat: req.body.lat,
            lon: req.body.lon,
            timestamp: req.body.timestamp,
            type: "geofence"
          },
        },
      })
  }

  let georoute_data = await GeoFence.find({
    $and: [
      { _id: req.params.id },
      {
        geometry: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [req.body.lon, req.body.lat],
            },
            $maxDistance: 1000,
          },
        },
      },
    ],
  });

  if(georoute_data.length==0) {
    let updateNotification = await Notification.updateOne({_id: req.params.id}, 
      { 
        $push: {
          track: {
            lat: req.body.lat,
            lon: req.body.lon,
            timestamp: req.body.timestamp,
            type: "georoute"
          },
        },
      })
  }


  return res.status(200).json({
    data: {
      success: true,
    },
    error: {},
  });
};

exports.getAssets = async (req: Request, res: Response) => {
  let data = null;

  if (req.query.type) {
    data = await Asset.find({ type: req.query.type }).limit(100);
  } else {
    data = await Asset.find({});
  }

  if (data.length !== 0) {
    return res.status(200).json({
      data,
      error: {},
    });
  } else {
    return res.status(200).json({
      data,
      error: {
        message: "Type is wrong",
      },
    });
  }
};

exports.getAsset = async (req: Request, res: Response) => {
  const asset_data = await Asset.findOne({ _id: req.params._id }).exec();
  if (!asset_data) {
    return res.status(422).json({
      error: { message: "Asset does not exist" },
    });
  }
  const track_data = await AssetTrack.findOne({ _id: req.params._id }).exec();

  const geofence_data = await GeoFence.findOne({ _id: req.params._id }).exec();

  const georoute_data = await GeoRoute.findOne({ _id: req.params._id }).exec();

  return res.status(200).json({
    data: {
      asset_data,
      track: track_data.track,
      geofence: geofence_data,
      georoute: parses(georoute_data)
    },
    error: {},
  });
};

exports.getAssetByTime = async (req: Request, res: Response) => {
  const asset_data = await Asset.findOne({ _id: req.params._id }).exec();
  if (!asset_data) {
    return res.status(422).json({
      error: { message: "Asset does not exist" },
    });
  }

  const track_data = await AssetTrack.find(
    { _id: req.params._id },
    {
      track: {
        $filter: {
          input: "$track",
          as: "item",
          cond: {
            $and: [
              { $gte: ["$$item.timestamp", new Date(String(req.query.start))] },
              { $lte: ["$$item.timestamp", new Date(String(req.query.end))] },
            ],
          },
        },
      },
    }
  );

  return res.status(200).json({
    data: {
      asset_data,
      track: track_data[0].track,
    },
    error: {},
  });
};

exports.updateGeoFence = async (req: Request, res: Response) => {

  let array = req.body.geometry.coordinates[0]

  array = geojson.complexify(array, 0.5)


  const data = await GeoFence.updateOne(
    { _id: req.params.id },
    {
      $set: {
        properties: req.body.properties,
        geometry: req.body.geometry
      },
    }
  );

  return res.status(200).json({
    data: {
      success: true,
    },
    error: {},
  });
};

exports.updateGeoRoute = async (req: Request, res: Response) => {

  const data = await GeoRoute.updateOne(
    { _id: req.params.id },
    {
      $set: {
        properties: req.body.properties,
        coordinates: req.body.geometry.coordinates,
        geometry: convert(req.body.geometry.coordinates)
      },
    }
  );

  return res.status(200).json({
    data: {
      success: true,
    },
    error: {},
  });
};

exports.getNotification = async (req: Request, res: Response)=>{
  
  const data = await Notification.findOne({_id: req.params.id}).exec()
  
  if (!data) {
    return res.status(422).json({
      error: { message: "Notification Id does not exist" },
    });
  }
  return res.status(200).json({
    data: data,
    error: {}
  })
}
