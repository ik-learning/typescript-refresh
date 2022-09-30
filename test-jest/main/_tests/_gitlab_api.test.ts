// https://github.com/ivankatliarchuk/danger-js/blob/main/source/platforms/gitlab/_tests/_gitlab_api.test.ts
// NockDefinition no longer exists
import nock, { Definition } from "nock"
import { resolve } from "path"
import { readFileSync } from "fs"

// under tests
import { default as GitLabAPI, getGitLabAPICredentialsFromEnv } from "../GitLabAPI"

const nockBack = nock.back
nockBack.fixtures = __dirname + "/fixtures"

// We're testing https://gitlab.com/gitlab-org/gitlab-foss/merge_requests/27117
// This has been chosen because it is already merged and publicly available, it's unlikely to change

/** Returns a fixture. */
const loadFixture = (path: string): any =>
  JSON.parse(readFileSync(resolve(nockBack.fixtures, `${path}.json`), {}).toString())[0]

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

  it("projectURL is defined", () => {
    expect(api.projectURL).toBe("https://gitlab.com/gitlab-org/gitlab-foss")
  })

  it("mergeRequestURL is defined", () => {
    expect(api.mergeRequestURL).toBe("https://gitlab.com/gitlab-org/gitlab-foss/merge_requests/27117")
  })

  const sanitizeUserResponse = (nocks: Definition[]): Definition[] => {
    return nocks.map((nock: Definition) => {
      let { response, ...restNock } = nock

      // @ts-ignore
      const { identities } = response

      response = {
        // @ts-ignore
        ...response,
        username: "username",
        name: "First Last",
        organization: "My Organization",
        email: "username@example.com",
        avatar_url: "https://www.",
        web_url: "https://www.",
        identities: identities.map(({ extern_uid, ...rest }: any) => ({ ...rest, extern_uid: "xxxx" })),
      }

      return { ...restNock, response }
    })
  }

  it("getUser returns the current user profile id", async () => {
    // To re-record this you need to provide a valid DANGER_GITLAB_API_TOKEN
    const { nockDone } = await nockBack("getUser.json", { afterRecord: sanitizeUserResponse })
    const result = await api.getUser()
    nockDone()
    const { response } = loadFixture("getUser")
    expect(result).toEqual(response)
  })
});
