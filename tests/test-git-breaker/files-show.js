// https://github.com/jdalrymple/gitbeaker/issues/2322
const { Gitlab } = require('@gitbeaker/node');

async function main() {
	const gitlabApi = new Gitlab({
		host: 'https://gitlab.com',
    token: process.env.DANGER_GITLAB_API_TOKEN,
	})

	// https://gitlab.com/gitlab-org/gitlab-foss
  // curl --header "PRIVATE-TOKEN: glpat-your-header" "https://gitlab.com/api/v4/projects/13083/repository/files/Gemfile?ref=master"
  try {
    const result = await gitlabApi.RepositoryFiles.show("13083", "Gemfile", "master")
    console.log(result)
  } catch (e) {
    // lol https://github.com/jdalrymple/gitbeaker/issues/396
    // {"name":"HTTPError","code":"ERR_NON_2XX_3XX_RESPONSE","timings":{"start":1664653841018,"socket":1664653841018,"lookup":1664653841020,"connect":1664653841042,"secureConnect":1664653841074,"upload":1664653841074,"response":1664653841367,"end":1664653841367,"phases":{"wait":0,"dns":2,"tcp":22,"tls":32,"request":0,"firstByte":293,"download":0,"total":349}}}
    console.log(JSON.stringify(e))
  }
}

main()
