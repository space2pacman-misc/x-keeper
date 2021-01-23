let Request = require("./libs/Request");
let fs = require("fs");
let host = "nominatim.openstreetmap.org";
let headers = {
	"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"
}
let request = new Request(host, headers);
let cities = {
	raw: null,
	list: null,
	geojson: {}
}
let file = {
	from: process.argv[2] || "database/cities.txt",
	to: process.argv[3] || "cities_geojson.txt"
}

fs.readFile(file.from, "utf-8", loadFile);

function loadFile(error, data) {
	if(error) {
		console.log(error);
	} else {
		cities.raw = data.split("\n");
		cities.list = cities.raw.slice(0, cities.raw.length - 1);
		
		eachCities();
	}
}

function saveFile(filename, data) {
	fs.writeFile(filename, data, "utf-8", () => {
		console.log("task is completed");
	});
}

function getCoordinates(city) {
	let coordinates = [];

	city.forEach(item => {
		if(item.geojson && (item.geojson.type === "MultiPolygon" || item.geojson.type === "Polygon")) {
			coordinates.push(item.geojson.coordinates.flat(2));
		}
	})

	return coordinates.flat();
}

async function eachCities() {
	for(let i = 0; i < cities.list.length; i++) {
		let city = await request.send(`/search.php?q=${encodeURI(cities.list[i])}&polygon_geojson=1&format=jsonv2`);

		cities.geojson[cities.list[i]] = getCoordinates(JSON.parse(city));
		
		console.log(`completed: ${Object.values(cities.geojson).length} / ${cities.list.length}`);
	}

	saveFile(file.to, JSON.stringify(cities.geojson));
}