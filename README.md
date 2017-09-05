# This is a Development Middleware - Do not use in production

Here's a little hack to bypass cors in some situations, to develop your frontend applciation (like, when you cannot enable cors in the API server).

Usage is simple:

 - Download it
 - ```` npm install```` or just ``` yarn ```
 - ``` node index.js ```
 - The calls on your client should be like: ```http://localhost:3000/q?url<API_URL>```

LICENSE: MIT