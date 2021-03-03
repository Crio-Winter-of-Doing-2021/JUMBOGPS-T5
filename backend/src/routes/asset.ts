import { Router } from "express";
import { authByToken } from "../middleware/auth";

const {createAsset, updateLocation, getAssets, getAsset} = require('../controllers/asset')

const route = Router()

route.post('/asset', createAsset)

route.patch('/asset/:id', updateLocation)

route.get('/asset/list', authByToken, getAssets)

route.get('/asset', authByToken, getAsset)

export const assetRoute = route
