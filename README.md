# Matheus Saldanha's WebPage! [![Codacy Badge](https://api.codacy.com/project/badge/Grade/5eee205014354cb7a2f3276274d00b11)](https://www.codacy.com/project/mhjsaldanha/mjsaldanha.com/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=matheushjs/mjsaldanha.com&amp;utm_campaign=Badge_Grade_Dashboard)

<img src="https://mjsaldanha.com/images/elf_icon.png" width="128" height="128">

Check me out at [mjsaldanha.com](http://www.mjsaldanha.com) :D

# Rendering Pages with EJS (The "Renderer")

We are using EJS for making HTML templates, so we have the ability to embed javascript within HTML, such as below.
```html
<h2>
	Hello, <% callname %>!
</h2>
```
And to render such page, we would need to call `res.render("page", { callname: user.callname });`.

Consider that we have a navigation bar that shows the name of the user whenever he is logged in.
The navigation bar appears in every page, so we would need to render every page by passing `user.callname` to the rendering call, which is bothersome and prone to errors.
That's why we decided to encapsulate the rendering within a class called **Renderer**, and all of these global template parameters, such as `user.callname`,
  are passed to the renderer upon its construction (see below).

```js
class Renderer {
  constructor(callname = null, specialUser = false, language = "en"){
    this.callname = callname;
    this.specialUser = specialUser;
    this.language = language;
  }
  ...
}
```

The **Renderer** object is created by a middleware and placed in `req.renderer`.
Then, for rendering a page, we should always render it through calls to the Renderer methods, which always pass the global template parameters to the EJS renderer.

# Website Translation and Localization

For making the website available in multiple languages, we face a difficulty: *cookies are extremely easy to use, but Search Engine Crawlers won't deal well with it*.
So, how did we decide to solve this problem?

1. We mainly use cookies for serving the website in different languages
2. We provide specific URLs that the Search Engine Crawlers can request for receiving the home page (and **only the home page**), in another language.

Our home page contains the main portion of our website, so it isn't a big loss that the crawler can see the other pages in, say, japanese.
Besides, the other options for localizing the website would be:

1. Use different URLS for each language, such as `mjsaldanha.com/ja/articles`
2. Use GET parameters to define the language
3. Use subdomains such as `ja.mjsaldanha.com`

And each of these options are a gigantic pain in the ass because we'd have to change all anchors `<a href="..." ></a>` within the website to point to the correct language.
By using cookies we avoid this problem, and manage to save the user's preference.

# Project Diagram

![](/soft_eng/diagrams.png)
