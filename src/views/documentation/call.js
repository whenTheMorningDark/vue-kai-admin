/* eslint-disable indent */
/* eslint-disable require-jsdoc */
function person() {
	// console.log("person");
	return this.name;
}
let obj = {
	name: "xxxwwww",
};
console.log(person.call(obj));
