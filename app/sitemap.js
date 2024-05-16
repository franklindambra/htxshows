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
    ...defaultPages
  ];

  return sitemap;
}


