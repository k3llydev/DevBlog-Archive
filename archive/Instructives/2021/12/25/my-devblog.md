<!--
   AUTHOR=Kelly
   COMPLEXITY=0
   CATEGORY=Instructives
   LAST_MODIFIED=2022-12-29
   KEYWORDS=HowTo,Tools
   DESCRIPTION=This post demonstrates the capabilities of two applications created to manage my DevBlog. The first application handles posts and stores them as static HTML files, while the second retrieves and converts this information into the live blog. It also supports Markdown syntax with additional front-end features.
-->

# How I Use My DevBlog

This project serves as a demonstration of my passion for coding, continuous learning, and sharing knowledge with others. While it may not be the most advanced developer blog, it is a valuable reference for those I mentor, and I hope it will help others in the future.

Articles are written using a format similar to [Markdown syntax](https://wikipedia.org/wiki/Markdown), with most of the standard Markdown features supported, along with a few extras provided by a custom library. Here's an example of a simple recursive solution for the Fibonacci sequence:

```javascript
function Fibonacci(n) {
    if(n <= 1) return n;
    return Fibonacci(n - 1) + Fibonacci(n - 2);
}
```

## Additional Features

Here are some common features supported by the blog:

- Tables
- Images
- Links

## Automatic Image Integration

I’ve also added functionality for automatically uploading images to a configured hosting server. This ensures that when an image is used in any article, it is deployed along with the post.

![An illustration](/assets/polymer.png)

## What's Next?

As you've seen, this blog application supports all the functionality of Markdown and even offers a few extra features. The next step is to migrate articles from my previous DevBlog to this new platform.
