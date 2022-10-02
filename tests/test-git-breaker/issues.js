// https://github.com/jdalrymple/gitbeaker/issues/2322
const { Gitlab } = require('@gitbeaker/node');

async function main() {
	const gitlabApi = new Gitlab({
		host: 'https://gitlab.com',
    token: process.env.DANGER_GITLAB_API_TOKEN,
	})

	// https://gitlab.com/subesokun/gitbeaker-issue-2322
	const issues = await gitlabApi.Issues.all({
		projectId: '33484309',
		labels: ['A::Open', 'B'],
		state: 'opened'
	})

	// prints 20 instead of 21
	console.log(issues.length)
}

main()
