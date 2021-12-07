import { Catch, Err, Try } from "./main";

const niceJsonParse = Catch(JSON.parse);

function hi() {
	Try(niceJsonParse("{}").catch((e) => Err(e)));
	Try(niceJsonParse("{}").expect("Received valid JSON from server"));
}
