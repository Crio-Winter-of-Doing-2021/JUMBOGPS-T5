import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client"

function NotificationApp() {
	const [ notifications, setNotifications ] = useState([])

	const socketRef = useRef()

	useEffect(
		() => {
			socketRef.current = io.connect("http://localhost:8001")
			socketRef.current.on("notification", (notification) => {
				setNotifications([ ...notifications, notification])
			})
			return () => socketRef.current.disconnect()
		},
		[ notifications ]
	)

	const onSeenSubmit = (e) => {
		e.preventDefault()
		notifications.forEach(notification => {
			socketRef.current.emit("notification", { ...notification, name:notification.name + " seen" })
		})
	}

	const renderChat = () => {
		return notifications.map(({ type, status, name, seen }, index) => (
			<div key={index}>
				<h3>
					{name}: <span>{status} {type}</span>
				</h3>
			</div>
		))
	}

	return (
        <div >
            <h1>Notifications App </h1>
			<button onClick={onSeenSubmit}>Mark Seen</button>
            {renderChat()}
        </div>
	)
}

export default NotificationApp


