import axios from "axios";
const jwt = require('jsonwebtoken');
const secretKey = "REPLACE_WITH_SUPER_SECRET_KEY_HERE"

exports.handler = async (event, context) => {
	if (event.httpMethod !== "POST") {
		return { statusCode: 405, body: "Method Not Allowed" }
	}
	const body = JSON.parse(event.body)
	// Here I either login the user if he is valid or Create Account with email
	// If the email is not in the database I encrypt the password and save it encrypted in the DB
	// If it is, I check the password matches with my encrypted one and I get the user

	// If password don't match or other errors I return the error

	// Else, At this point I have a user object:
	const email = body.email
	const user = {userId:123, email:email}
	const resp = {
					type: 'success',
					message: 'User logged in.',
					user: user,
					token: jwt.sign({data: user}, secretKey)
				}
	return { statusCode: 200, body: JSON.stringify(resp) }
}
