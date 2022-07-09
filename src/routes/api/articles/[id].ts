async function apiRequest({
  apiKey,
  domain,
  endpoint,
  contentId
}: {
  apiKey: string;
  domain: string;
  endpoint: string;
  contentId?: string;
}): Promise<Object | string> {
  return await fetch(
    `https://${domain}.microcms.io/api/v1/${endpoint}${contentId ? "/" + contentId : ""}`,
    {
      headers: {
        "X-MICROCMS-API-KEY": apiKey
      }
    }
  )
    .then(async (r) => await r.json())
    .catch((e) => e.message);
}

export async function get({ params, env }: { params: Record<string, string>, env: Record<string, string> }) {
  let isList = params.id === "LIST";

  let res = await apiRequest({
    apiKey: env.MICROCMS_API_KEY,
    domain: env.DOMAIN,
    endpoint: "articles",
    contentId: isList ? void 0 : params.id
  });

  return new Response(JSON.stringify(res), {
    status: res instanceof String ? 400 : 200,
    headers: {
      "Content-type": "application/json"
    }
  });
}
