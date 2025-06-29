This is the back-end for NC-news Reddit-style application.
 It provides RESTful endpoints to fetch, sort, update, and manage articles, topics, users, and comments.

 Minimum requirements:
  Node.js: v23.6.1 or higher
  PostgreSQL:v16.8 or higher

# NC News- setting it up locally
1. Clone the repo and install the dependencies:
    Clone the repo : git clone
    Open the repo  : cd your-repo
    Install dependencies: npm install
2. Set up the databases
    Create the test and dev databases : npm run setup-dbs
    Seed the dev database : npm run seed-dev

3. To set up .env files:
   Create a .env.development file
   Inside the .env.development file, add: PGDATABASE=nc_news
   Create a .env.test file
   Inside the .env.test file, add: PGDATABASE=nc_news_test

4. Run the app locally, using the command: npm run dev

 
 # Running Tests
  Make sure your env.test file is set up correctly and your test database(nc_news_test) had been created.

  1. Run the tests:
  npm test
