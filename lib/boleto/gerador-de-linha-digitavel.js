function gerarLinhaDigitavel(linhaDigitavel) {
	const part1 = linhaDigitavel.substring(0, 5);
	const part2 = linhaDigitavel.substring(5, 10);
	const part3 = linhaDigitavel.substring(10, 15);
	const part4 = linhaDigitavel.substring(15, 21);
	const part5 = linhaDigitavel.substring(21, 26);
	const part6 = linhaDigitavel.substring(26, 32);
	const part7 = linhaDigitavel.substring(32, 33);
	const part8 = linhaDigitavel.substring(33, 34);
	const part9 = linhaDigitavel.substring(34, 47);

	return `${part1}.${part2} ${part3}.${part4} ${part5}.${part6} ${part7} ${part8}${part9}`;
}

module.exports = gerarLinhaDigitavel;
