export default (function () {
  return {
    get: async ({ contentId }: { contentId?: string }) => {
      return await fetch(`https://nazoge.kitunebi.com/api/articles/${!!contentId ? contentId : "LIST"}`)
        .then(async (r) => await r.json())
        .catch((e) => e.message);
    }
  };
})();
