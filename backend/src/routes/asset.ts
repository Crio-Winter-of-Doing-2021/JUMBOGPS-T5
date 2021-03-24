import { Router } from "express";
import { authByToken } from "../middleware/auth";

const {createAsset, updateLocation, getAssets, getAsset, getAssetByTime, updateGeoFence, updateGeoRoute, getNotification, getGeofence, getGeoroute} = require('../controllers/asset')

const route = Router()

route.post('/asset', createAsset)

route.patch('/asset/:id', updateLocation)

route.get('/asset/list', authByToken, getAssets)

route.get('/asset/track/:_id', authByToken, getAsset)

route.get('/asset/trackbytime/:_id', authByToken, getAssetByTime)

route.put('/asset/geofence/:id', authByToken, updateGeoFence)

route.put('/asset/georoute/:id', authByToken, updateGeoRoute)

route.get('/asset/geofence/:id', authByToken, getGeofence)

route.get('/asset/georoute/:id', authByToken, getGeoroute)

route.get('/asset/notification/:id', authByToken, getNotification)

export const assetRoute = route
