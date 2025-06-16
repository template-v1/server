import { BlogCategory, BlogTag } from "src/enum/blogs.enum";

export interface CreateBlogDto {
  image?: string[];
  title: string,
  content: string;
  categories?: BlogCategory[];
  tags?: BlogTag[];
}
