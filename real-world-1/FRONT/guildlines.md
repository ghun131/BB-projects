Routing Guidelines
[x] Home page (URL: /#/ )
 [x] - List of tags
 [x] - List of articles pulled from either Feed, Global, or by Tag
 [x] - Pagination for list of articles
[] Sign in/Sign up pages (URL: /#/login, /#/register )
 [x] - Uses JWT (store the token in localStorage)
 [] - Authentication can be easily switched to session/cookie based
[x] Settings page (URL: /#/settings )
[x] Editor page to create/edit articles (URL: /#/editor, /#/editor/article-slug-here )
[] Article page (URL: /#/article/article-slug-here )
 [x] - Delete article button (only shown to article's author)
 [] - Render markdown from server client side
 [x] - Comments section at bottom of page
 [x] - Delete comment button (only shown to comment's author)
[x] Profile page (URL: /#/profile/:username, /#/profile/:username/favorites )
 [x] - Show basic user info
 [x] - List of articles populated from author's created articles or author's favorited articles