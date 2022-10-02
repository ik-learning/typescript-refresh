// https://github.com/jdalrymple/gitbeaker/issues/2322
const { Gitlab } = require('gitlab');

async function main() {
	const gitlabApi = new Gitlab({
		host: 'https://gitlab.com',
    token: process.env.DANGER_GITLAB_API_TOKEN,
	})

	// https://gitlab.com/gitlab-org/gitlab-foss
  try {
    const result = await gitlabApi.RepositoryFiles.show("13083", "Gemfile", "master")
    console.log(result)
  } catch (e) {
    // {"name":"HTTPError","response":{"size":0,"timeout":0},"description":"404 File Not Found"}
    console.log(JSON.stringify(e))
  }
}

main()
