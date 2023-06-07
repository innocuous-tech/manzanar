import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: 'https://momentinmanzanar.com',
      lastModified,
    },
    {
      url: 'https://momentinmanzanar.com/team',
      lastModified,
    },
    {
      url: 'https://momentinmanzanar.com/about',
      lastModified,
    },
    {
      url: 'https://momentinmanzanar.com/experience/ichiro',
      lastModified,
    },
    {
      url: 'https://momentinmanzanar.com/experience/media/video-1',
      lastModified,
    },
    {
      url: 'https://momentinmanzanar.com/experience/media/video-2',
      lastModified,
    },
  ];
}
