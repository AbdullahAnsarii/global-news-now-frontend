import BlogPage from "@/components/BlogPage";
import CategoryPage from "@/components/CategoryPage";


export default async function CategoryAndBlog({ params, searchParams }: { params: { slug: string }, searchParams: { [key: string]: string | string[] | undefined } }) {
  
  if(params.slug.length === 1) return <CategoryPage slug={params.slug[0]} searchParams={searchParams} />

  else if (params.slug.length === 2) return <BlogPage categorySlug={params.slug[0]} blogSlug={params.slug[1]} />

}