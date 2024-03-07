import "dotenv/config.js";
import path from "path";
import { fileURLToPath } from "url";
import Endpoints from "../axios/endpoints.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

var date = 0;

export default class Controller {
  static async start(req, res) {
    await execPromise("$(pwd)/scripts/shell/delete_cron.sh");
    const {stdout, stderr} = await execPromise("date +%s");
    date = parseInt(stdout) + 15;
    await execPromise("$(pwd)/scripts/shell/new_cron.sh");

    return res.status(200).json({message: "Started"});
  }

  static async refresh(req, res) {
    const {stdout, stderr} = await execPromise("date +%s");
    const now = parseInt(stdout);
    console.log(now, this.date); 
    if(now > date) {
      try {
	console.log("Refreshing...");     
        const data = Endpoints.fetchToken({data: {}});
      } catch (error) {
        console.log(error);
	return res.status(500).json({message: "Internal server error"}); 
      }
    }
  }
}
