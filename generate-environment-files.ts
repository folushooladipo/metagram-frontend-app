import {config as loadEnv} from "dotenv"
import {writeFileSync} from "fs"

loadEnv()

const {
  API_DOMAIN: apiDomain,
} = process.env

if (!apiDomain) {
  throw new Error("Error. You forgot to specify API_DOMAIN.")
}

const targetPath = "./src/environments/environment.ts"
const envContent = `export const environment = {
  production: false,
  appName: "Metagram",
  apiHost: "${apiDomain}/api/v0"
}
`

writeFileSync(targetPath, envContent)

console.log(`Finished generating ${targetPath}\n\n`)
