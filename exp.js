#!/bin/env node

if(process.argv.length < 6) {
	console.log('Usage: node ./exp.js ALGO a n M');
	console.log('ALGO can be one of the below:');
	console.log([
		'\tnat - compute "naturally": O(n)',
		'\trep - compute by the repeated squaring: O(log(n))',
		'\tnor - compute by the repeated squaring without recursion: O(log(n))',
	].join('\n'));
	return 0;
}

const ALGO = process.argv[2];
const a = BigInt(process.argv[3]);
const n = BigInt(process.argv[4]);
const M = BigInt(process.argv[5]);

if(n < 0) {
	throw new Error('n should be larger than 0!!!');
}
if(M <= 0) {
	throw new Error('M should be positive!!!');
}

switch(ALGO) {
	case 'nat':
		let ans = 1n;
		for(let i=0; i<n; i++) {
			ans = (ans * a) % M
		}
		console.log(ans);
		break;
	case 'rep':
		const exp_mod = (a, n, M) => {
			if(n == 0) return 1n;
			const x = exp_mod(a, n>>1n, M);
			const y = (x * x) % M;
			return (n%2n == 0) ? y : (y * a) % M;
		};
		console.log(exp_mod(a, n, M));
		break;
	case 'nor':
		let a2 = a;
		let ant = 1n;
		let nn = n;
		while(nn > 0) {
			if(nn%2n == 1) ant = (ant * a2) % M;
			a2 = (a2 * a2) % M;
			nn >>= 1n;
		}
		console.log(ant);
		break;
	default:
		throw new Error('E: unknown algorithm: ' + ALGO);
}

