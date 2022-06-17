export default async (api, options = {}) => {
  // const baseUrl = "http://www.account-boosk.top:3000";
    const baseUrl = "http://www.account.com:3001";
  if (options.method === "POST") {
    const data = await fetch(`${baseUrl}${api}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options.params),
      credentials: "include",
    });
    return data.json();
  }
  if (options.method === "GET" || !options.method) {
    const params = formatParams(options.params);
    const data = await fetch(`${baseUrl}${api}${params}`, {
      method: "GET",
      credentials: "include",
    });
    return data.json();
  }
};

function formatParams(params = {}) {
  const url = Object.entries(params).reduce((current, prev) => {
    return `${prev}${current[0]}=${current[1]}&`;
  }, "?");
  return url.substring(0, url.length - 1);
}
