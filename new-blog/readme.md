[x] Copy the current route (/api/profile) then when it is refreshed,
redirect to home (or index.html whatever) then go to the copied route.
[] User can change their profile picture
So  basically, I want user to upload their picture into the Browser and React is going to receive it. The React send the file to NodeJS server ad Node is going to upload the file to Cloudinary. Eventually, React is going to get the file to display for the client.
[x] User can be able to edit and delete their posts
[] User can comment in other User's post
[] Server rendering html or pug (or anything else)
[x] Clean the states for "post" and "user"
[] User some style like Material UI for font, color, space and no border
[] Home page (URL: /#/ )
- [x] List of tags
- [] List of articles pulled from either Feed, Global, or by Tag
- [] Pagination for list of articles
[] Sign in/Sign up pages (URL: /#/login, /#/register )
- [x] Uses JWT (store the token in localStorage)
- [] Authentication can be easily switched to session/cookie based
[] Settings page (URL: /#/settings )
[x]Editor page to create/edit articles (URL: /#/editor, /#/editor/article-slug-here )
[]Article page (URL: /#/article/article-slug-here )
- [x] Delete article button (only shown to article's author)
- [] Render markdown from server client side
- [] Comments section at bottom of page
- [] Delete comment button (only shown to comment's author)
[]Profile page (URL: /#/profile/:username, /#/profile/:username/favorites )
- [] Show basic user info
- [x] List of articles populated from author's created articles or author's favorited articles


- Webpack is quite difficult to debug
