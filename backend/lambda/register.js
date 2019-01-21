import axios from "axios";
const jwt = require('jsonwebtoken');
const secretKey = "REPLACE_WITH_SUPER_SECRET_KEY_HERE"

exports.handler = async (event, context) => {
	if (event.httpMethod !== "POST") {
		return { statusCode: 405, body: "Method Not Allowed" }
	}
	const body = JSON.parse(event.body)
	console.log(body)
	const email = body.email
	const password = body.password

	// Here I get the email & password, encrypt the password with bcrypt and save both to the DB
	// I can also check for passoword min. length, existing email and all that and in case return an error

	// Then I get the new user object:
	const user = {userId:123, email:email}

	const resp = {
					type: 'success',
					message: 'User registered',
					user: user,
					token: jwt.sign({data: user}, secretKey)
				}
	return { statusCode: 200, body: JSON.stringify(resp) }
}
