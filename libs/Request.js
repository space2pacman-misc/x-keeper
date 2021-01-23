let https = require("https");

class Request {
	constructor(host, headers) {
		this._host = host;
		this._headers = headers;
	}

	async send(path, callback) {
		let options = {
			host: this._host,
			headers: this._headers,
			path
		}

		if(callback) {
			let request = https.request(options, this._onResponse.bind(null, callback));

			request.end();
		} else {
			return new Promise((resolve, reject) => {
				let request = https.request(options, this._onResponse.bind(null, resolve));

				request.end();
			})
		}

	}

	_onResponse(callback, response) {
		let parts = "";

		response.on("data", data => {
			parts += data;
		});
		
		response.on("end", () => {
			callback(parts.toString());
		})

		response.on("error", () => {

		})
	}
}

module.exports = Request;