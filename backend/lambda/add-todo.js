import axios from "axios";
const jwt = require('jsonwebtoken');
const secretKey = "REPLACE_WITH_SUPER_SECRET_KEY_HERE"

exports.handler = async (event, context) => {
	console.log("Getting user info")
	if (event.httpMethod !== "POST") {
		return { statusCode: 405, body: "Method Not Allowed" }
	}
	const body = JSON.parse(event.body)

	// Here for example I want to add a todo, or get something from the DB, how do I know
	// Who is the logged in user?

	const token = event['headers']['authorization']
	if (!token) {
		return { statusCode: 400, body: JSON.stringify({type: 'error', message: 'authorization header not found.'}) }
	}
	const decoded = jwt.verify(token.substr(7), secretKey)
	console.log("DECODED: ")
	console.log(decoded)
	return { statusCode: 200, body: JSON.stringify(decoded)}
}
