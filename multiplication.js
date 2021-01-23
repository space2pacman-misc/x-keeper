//let array = [1, 3, 7, 4, 2, 1, 1, 1, 1, 1]; // [84, 28, 12, 21]
let array = [1, 3, 7, 4]; // [84, 28, 12, 21]

// 1 - 5min
// let mapArray = array.map((item, indexOuter, array) => {
// 	let result = 1;

// 	array.forEach((item, indexInner) => {
// 		if(indexInner !== indexOuter) {
// 			result *= item;
// 		}
// 	})

// 	return result;
// })

// console.log(mapArray)

// 2

// let newArray = [];
// let index = 0;
// let iterate = 0;
// for(let i = 0; i < array.length;) {
// 	console.log(iterate++)
// 	if(index === array.length) {
// 		i++;
// 		index = 0;
// 		continue;
// 	}

// 	if(index !== i || index === 0) {
// 		if(!newArray[i]) newArray[i] = 1;

// 		newArray[i] *= array[index];
// 		index++;
// 	} else {
// 		index++;
// 		continue;
// 	}
// }

// console.log(newArray)

// 3
let threeArray = [];
let result = 1;
let index = 0;
let iterate = 0;


for(let i = 0; i < array.length; i++) {
	console.log(iterate++)
	if(index !== i || index === 0) {
		result *= array[i];
	}

	if(i + 1 === array.length) {
		threeArray[index] = result;
		result = 1;
		index++;
		i = 0;
	}

	if(index === array.length) {
		break;
	}
}

console.log(threeArray)

// let fourArray = [];

// for(let i = 0; i < array.length; i++) {
// 	if(index !== i || index === 0) {
// 		result *= array[i];
// 	}
// }

// for(let i = 0; i < array.length; i++) {
// 	array[i]
// }