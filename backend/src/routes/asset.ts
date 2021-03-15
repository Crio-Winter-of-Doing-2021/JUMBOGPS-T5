import { Router } from "express";
import { authByToken } from "../middleware/auth";

const {createAsset, updateLocation, getAssets, getAsset, getAssetByTime} = require('../controllers/asset')

const route = Router()

route.post('/asset', createAsset)

route.patch('/asset/:id', updateLocation)

route.get('/asset/list', authByToken, getAssets)

route.get('/asset/track/:_id', authByToken, getAsset)

route.get('/asset/trackbytime/:_id', authByToken, getAssetByTime)

export const assetRoute = route
