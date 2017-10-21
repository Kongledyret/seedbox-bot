import { httpRequest } from "../components/Http";
import { cookieJars } from "../mem/CookieJars";
import request from "request";
import urlJoin from "url-join";

//TODO: 在调用处，LoginQb返回false时做相应处理
async function LoginQb(boxConfig) {
  let cookieJar = request.jar();
  let result = await httpRequest({
    jar: cookieJar,
    url: urlJoin(boxConfig.url, '/login'),
    form: { username: boxConfig.username, password: boxConfig.password },
    auth: { username: boxConfig.username, password: boxConfig.password },
    method: "POST",
  });

  if (result.errors || result.response.statusCode !== 200) {
    return false;
  }
  cookieJars[boxConfig.url] = cookieJar;
  return true;
}

export { LoginQb };