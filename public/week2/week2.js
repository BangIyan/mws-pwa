function calculator() {
	let total = document.querySelectorAll('input');
	let input1 = total[0].value;
	let input2 = total[1].value;

	total[2].value = parseInt(input1) + parseInt(input2);
}
let tombol = document.querySelector('button');
tombol.addEventListener('click', calculator);