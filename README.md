# MetVoyage

CS654 group project

## Setup Instructions

1. [Install MySql locally](https://dev.mysql.com/doc/refman/8.4/en/installing.html)
2. Clones the repository.
3. Use your local database settings to create .env file in the server directory that has all the variables required in query.js.  
    * Review .env.example for minimum variables. PORT is needed if the default port of 5000 conflicts with another app running.
5. Open a terminal at the server directory and run npm install.
6. Run npm start. The server should start successfully.
7. Open another terminal at the client directory and run npm install.
8. Run npm run dev. The client should start successfully.
9. Open localhost at tht client port in your favorite browser.
10. Test the buttons work (axios is slow).
