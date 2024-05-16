export default function sitemap() {
  const defaultPages = [
    {
      url: "https://www.htxshows.com/",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    },
    {
      url: "https://www.htxshows.com/post-show",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: "https://www.htxshows.com/terms-of-service",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9
    }
    // other pages
  ];

  const sitemap = [
    ...defaultPages,
    ...postSlugs.map(e => ({
      url: `https://www.htxshows.com/events/${e.slug}`,
      lastModified: e.modified_at,
      changeFrequency: "daily",
      priority: 0.8
    })),
    ...categorySlugs.map(e => ({
      url: `https://www.htxshows.com/category/${e}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7
    }))
  ];

  return sitemap;
}


