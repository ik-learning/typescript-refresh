// https://github.com/jdalrymple/gitbeaker/issues/894
const { Projects } = require('@gitbeaker/node');

const api = new Projects({
	host: 'https://gitlab.XXXXXXX.COM',
	token: 'SOME_TOKEN'
});
