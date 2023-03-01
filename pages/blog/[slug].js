import React from "react";
import fs from "fs";

export async function getStaticPaths() {
    // get slugs
    const files = fs.readdirSync("posts");
    const paths = files.map((filename)=> {
        params: {
            slug: filename.replace(".md", "");
        }
    })

}

function BlogPage() {
    return (
        <div>

        </div>
    )
}

export default BlogPage;