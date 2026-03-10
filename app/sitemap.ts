import type { MetadataRoute } from "next";
import { connectDB } from "@/lib/mongodb";
import { Post } from "@/models/Post";
import { Project } from "@/models/Project";
import { getSiteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  try {
    await connectDB();

    const [posts, projects] = await Promise.all([
      Post.find().select("slugify updatedAt").lean(),
      Project.find().select("slugify updatedAt").lean(),
    ]);

    const postRoutes: MetadataRoute.Sitemap = posts
      .filter((post: any) => typeof post?.slugify === "string" && post.slugify.trim())
      .map((post: any) => ({
        url: `${siteUrl}/posts/${post.slugify}`,
        lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      }));

    const projectRoutes: MetadataRoute.Sitemap = projects
      .filter((project: any) => typeof project?.slugify === "string" && project.slugify.trim())
      .map((project: any) => ({
        url: `${siteUrl}/projects/${project.slugify}`,
        lastModified: project.updatedAt ? new Date(project.updatedAt) : new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      }));

    return [...staticRoutes, ...postRoutes, ...projectRoutes];
  } catch {
    return staticRoutes;
  }
}
