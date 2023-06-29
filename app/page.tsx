import { BASE_URL_SERVER } from "@/common"
import { Blog } from "@/types"
import Image from "next/image"

export default async function Page() {

  let latestNews: Blog[] = []

  let internationalNews: Blog[] = []

  const data = await Promise.all([
    await (await
      fetch(BASE_URL_SERVER
        + "blog/find-by-filters?"
        + new URLSearchParams({
          perPage: '5',
          sortByField: "createdAt",
          sortOrder: "desc"
        }), {
        method: "GET",
        cache: "no-store"
      })).json(),
    await (await
      fetch(BASE_URL_SERVER
        + "blog/find-by-filters?"
        + new URLSearchParams({
          perPage: '8',
          categoryId: '16',
          sortByField: "createdAt"

        }), {
        method: "GET",
        cache: "no-store"
      })).json()
  ])

  latestNews = data[0];
  internationalNews = data[1];

  return <div className=" max-w-7xl mx-auto my-8" >
    <h1 className="hidden">Global News Now Homepage</h1>
    <div className="border-l-4 border-black">
      <p className="p-2">Latest Articles</p>
    </div>
    <div className="flex gap-8 ">
      <div className="w-[50%]">
        <div className='relative h-[200px] md:h-[400px] w-full'>
          <Image src={latestNews[0]?.image || ""} alt={latestNews[0]?.title} title={latestNews[0]?.title} fill style={{
            objectFit: 'cover',
            borderRadius: '0.25rem'
          }} />
          <div className="absolute bottom-0 left-0 w-[75%] bg-white opacity-75 rounded-bl py-3 px-3">
            <p className="line-clamp-3">{latestNews[0]?.title}</p>
          </div>
        </div>
      </div>

      <div className="w-[50%] flex flex-wrap gap-8">
        {latestNews?.slice(1).map(blog => (
          <div key={blog.id} className='relative h-[100px] md:h-[calc(200px-1rem)] w-[calc(50%-1rem)]'>
            <Image src={blog?.image || ""} alt={blog?.title} title={blog?.title} fill style={{
              objectFit: 'cover',
              borderRadius: '0.25rem'
            }} />
            <div className="absolute bottom-0 left-0 w-[75%] bg-white opacity-75 rounded-bl py-3 px-3">
              <p className="line-clamp-3 text-xs">{blog?.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="border-l-4 border-black my-4 flex justify-between items-center">
      <p className="px-2">What&apos;s happening in the world</p>
      <button className="bg-black hover:bg-slate-800 text-slate-200 text-sm rounded-sm px-4 py-2">View more</button>
    </div>
    <div className="w-full flex flex-wrap gap-4">
      {internationalNews.map(blog => (
        <div key={blog.id} className='relative h-[100px] md:h-[calc(200px-1rem)] w-[calc(25%-0.75rem)]'>
          <Image src={blog?.image || ""} alt={blog?.title} title={blog?.title} fill style={{
            objectFit: 'cover',
            borderRadius: '0.25rem'
          }} />
          <div className="absolute bottom-0 left-0 w-[75%] bg-white opacity-75 rounded-bl py-3 px-3">
            <p className="line-clamp-3 text-xs">{blog?.title}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
}