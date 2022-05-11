<!--
AUTHOR=k3llydev
KEYWORDS=POC
DATE=April 29, 2022
LAST_UPDATED=April 29, 2022
HASH=an-example-post
TIMESTAMP=2
-->

# A quick POC for my DevBlog

This article was written as an example of how powerful this tool can be. I'm simply writting markdown sytntax and at any point, this will become HTML in my DevBlog.

I've always loved doing these kind of things because they seem a lot fun for me. In my research through this project, I found many JavaScript libraries that helped me a lot in this journey. One of them is `marked`, which is actually the library I use to transform this syntax into HTML, with a little help from HTML Minify for sure. And also, I had to configure my API to have a quick way of updating this information exactly when I post a new article.

I'm highly considering adding a webhook to GitHub (that's where this app is hosted) so whenever I push any change, this is automatically updated. It will be so great to not have to call the enpoint myself everytime a new post is added.

For now, this are the to dos:

- Connect GitHub webhook to API
- Overall improvements to build process
- An alternative for assets

And I will surely keep working on this project on my journey through AWS.