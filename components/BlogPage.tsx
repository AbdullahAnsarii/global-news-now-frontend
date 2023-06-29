import { BASE_URL_SERVER } from "@/common";
import { createArrayFromNumber } from "@/helpers/arrayFromNumber";
import { convertDate } from "@/helpers/dateHandler";
import { Blog, Category } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default async function BlogPage({ slug }:  { slug: string }) {
   
    
      return (
      <h1>{slug}</h1>
      )
}