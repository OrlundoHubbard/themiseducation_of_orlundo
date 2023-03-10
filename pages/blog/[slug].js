import React from "react";
import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";


export async function getStaticPaths() {
    // get slugs
    const files = fs.readdirSync("posts");
    const paths = files.map((filename)=> ({
        params: {
            slug: filename.replace(".md", ""),
        }
    }));

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params: {slug}}) {
    // get content for each blog
    const filename = fs.readFileSync(`posts/${slug}.md`);
    const {data: frontMatter, content} = matter(filename);

    return {
        props: {
            frontMatter,
            content,
        },
    }
}

function BlogPage({frontMatter, content}) {
    console.log(frontMatter)
    return (
        <div className="p-10">
            <h1 className="text-2xl font-sans">{frontMatter.title}</h1>
            <article className="prose lg:prose-xl" dangerouslySetInnerHTML={{__html: md().render(content)}}/>
        </div>
    )
}

export default BlogPage;