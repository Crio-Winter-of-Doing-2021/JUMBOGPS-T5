import React from "react";
import socketio from "socket.io-client";
import {BASE_URL} from "../data/constants/Urls"

export const socket = socketio.connect(BASE_URL);
export const SocketContext = React.createContext();