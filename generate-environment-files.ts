import {config as loadEnv} from "dotenv"
import {writeFileSync} from "fs"

loadEnv()

const {
  API_DOMAIN,
  API_DOMAIN_PROD,
  NODE_ENV,
} = process.env
const isProd = NODE_ENV === "production"
const apiDomain = isProd ? API_DOMAIN_PROD : API_DOMAIN
if (!apiDomain) {
  throw new Error(`Error. You forgot to specify ${isProd ? "API_DOMAIN_PROD" : "API_DOMAIN"}.`)
}

const targetPath = isProd ? "./src/environments/environment.prod.ts" : "./src/environments/environment.ts"

const envContent = `export const environment = {
  production: false,
  appName: "Metagram",
  apiHost: "${apiDomain}/api/v0"
};
`

writeFileSync(targetPath, envContent)
