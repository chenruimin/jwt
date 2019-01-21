import axios from "axios";
const jwt = require('jsonwebtoken');
const secretKey = "REPLACE_WITH_SUPER_SECRET_KEY_HERE"

exports.handler = async (event, context) => {
	console.log("Getting user info")
	if (event.httpMethod !== "GET") {
		return { statusCode: 405, body: "Method Not Allowed" }
	}
	console.log(event)
	console.log("~~~~"*22)
	// Here I get the token from the Bearer Header, Verify it and convert it to a user object -  How?
	const token = event['headers']['authorization']
    if (!token) {
		return {
			statusCode: 400,
			body: JSON.stringify({type: 'error', message: 'authorization header not found.'})
		}
	}

	console.log('token is: ', token)
	console.log("Clean token is: ", token.substr(7))
	// const decoded = jwt.verify(token, secretKey); // decoded.userID
	//
	// return {
	// 	statusCode: 200,
	// 	body: JSON.stringify({
	// 		type: 'success',
	// 		message: 'Provided token is valid.',
	// 		result:decoded
	// 	})
	// }

	return jwt.verify(token.substr(7), secretKey, (error, result) => {
		if (error) {
			return {
				statusCode: 400,
				body: JSON.stringify({
					type: 'error',
					message: 'Provided token is invalid.',
					error:error
				})
			}
		}
		return {
			statusCode: 200,
			body: JSON.stringify({
				type: 'success',
				message: 'Provided token is valid.',
				result:result
			})
		}
	})

}
