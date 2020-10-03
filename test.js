const str =
  "access_token=ae97dc32a552bd1ecb311dfd004a94c91ea14c2f; token=0a4596f5826242995490491baf7d1da5eca45be4";

const cookieParser = (cookies) => {
  let cookieObject = {};

  cookies.split(";").forEach((cookie) => {
    let parsedCookie = cookie.trim().split("=");

    console.log(parsedCookie);
    cookieObject[parsedCookie[0]] = parsedCookie[1];
  });

  console.log(cookieObject);

  return cookieObject;
};

console.log(cookieParser(str));
