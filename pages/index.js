import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import fs from "fs"
import matter from 'gray-matter'
import Link from 'next/link'

export async function getStaticProps() {
  // get the post
  const files = fs.readdirSync("posts");
  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const readFiles = fs.readFileSync(`posts/${filename}`);
    const {data: frontMatter} = matter(readFiles);

    return {
      slug,
      frontMatter,
    };
  });

  return {
    props: {
      posts,
    }
  }
}

const inter = Inter({ subsets: ['latin'] })

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
       <div className="p-10">
        {posts.map((post) => {
          return (
            <Link key={`${post.slug}`} href={`/blog/${post.slug}`}>
            <div className="mb-4">
              <img src={`${post.frontMatter.socialImage}`} />
              <h1 className="text-xl py-3">{post.frontMatter.title}</h1>
              <p>{post.frontMatter.metaDesc}</p>
            </div>
            </Link>
          )
        })}
       </div>
      </main>
    </>
  )
}
