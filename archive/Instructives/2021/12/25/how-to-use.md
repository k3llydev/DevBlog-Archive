<!--
   AUTHOR=Kelly
   COMPLEXITY=0
   CATEGORY=Instructives
   LAST_MODIFIED=2022-12-29
   KEYWORDS=HowToUse,DevBlog
   DESCRIPTION=This post is simply an example of what can be done with both applications I've created to handle my DevBlog. It has the same features as the Markdown syntax with a few additions in the front-end application. This is a two-application workaround because one handles the posts and stores them as static HTML files and the other application retrieves this information and converts it into what my DevBlog is.
-->

# How to use my DevBlog

This project is simply a demonstration of my interest in coding and learning new things along with sharing it with others. This might not be the next-generation developer blog, but it surely is a reference for others under my guidance and hopefully, it might help someone else someday.

Articles can be written as easily as writing [Markdown syntax](https://wikipedia.org/wiki/Markdown). It has most of the features that the Markdown standard has and a couple more thanks to a library I've used. For example, here is a brief piece of code of a recursive solution of the Fibonacci sequence:

```javascript
function Fibonacci(n) {
    if(n <= 1) return n;
    return Fibonacci(n - 1) + Fibonacci(n - 2);
}
```

## More features

Here are some usual features available with the markdown syntax:

- Tables
- Images
- Links

## Automatic images integration

I've also given the capability of automatically uploading the images to the configured hosting server so every time I'm using an illustration in any article, it will also be deployed.

![An illustration](/assets/polymer.png)

## Should I keep it going?

As far as I've been writing this you might be able to tell that the capabilities of this application are the same (if not a few more) as Markdown. Now the only remaining task is to bring the articles from my older DevBlog to this one.
