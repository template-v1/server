import { BlogCategory, BlogTag } from "src/enum/blogs.enum";

export interface UpdateBlogDto {
  id: string;
  image?: string[];
  content: string;
  categories?: BlogCategory[];
  tags?: BlogTag[];
}
