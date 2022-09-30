// https://github.com/ivankatliarchuk/danger-js/blob/main/source/platforms/gitlab/_tests/_gitlab_api.test.ts
import nock from "nock"

//
import { default as GitLabAPI, getGitLabAPICredentialsFromEnv } from "../GitLabAPI"

const nockBack = nock.back

describe("GitLab API", () => {
  let api: GitLabAPI

  beforeAll(() => {
    nock.recorder.rec()
    nockBack.setMode("record")
  })

  afterAll(() => {
    nock.restore()
  })

  beforeEach(() => {
    api = new GitLabAPI(
      { pullRequestID: "27117", repoSlug: "gitlab-org/gitlab-foss" },
      getGitLabAPICredentialsFromEnv({
        DANGER_GITLAB_HOST: "gitlab.com",
        DANGER_GITLAB_API_TOKEN: "FAKE_DANGER_GITLAB_API_TOKEN",
      })
    )
  })

  it("configures host from CI_API_V4_URL", () => {
    api = new GitLabAPI(
      { pullRequestID: "27117", repoSlug: "gitlab-org/gitlab-foss" },
      getGitLabAPICredentialsFromEnv({
        CI_API_V4_URL: "https://testciapiv4url.com/api/v4",
        DANGER_GITLAB_API_TOKEN: "FAKE_DANGER_GITLAB_API_TOKEN",
      })
    )

    expect(api.projectURL).toBe("https://testciapiv4url.com/gitlab-org/gitlab-foss")
  })
});
