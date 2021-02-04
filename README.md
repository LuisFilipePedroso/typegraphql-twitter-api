# Welcome

This is the repository of my Youtube video where I explained about type-graphql.
You can check this video here: https://www.youtube.com/watch?v=1gqa0eQ8uSM&t=695s

# Running the project. 

First, you must have to have a mongo image running. I use to use docker to help me with it. So, I recommend you to also use docker.
The first thing you should do is exec the following command:

    docker run --name mongo -p 27017:27017  mongo
  
Then, check whether the mongo image is running with the command:

    docker ps 
  
If is not running, you must have to execute the following command:

    docker start mongo
  
After do that. You must have to install the dependencies with the command:

    yarn
    // or npm install 
  
Then, just start the API with the command:

    yarn dev:server
    // or npm run dev:server
  
# Techs 🛤 

- NodeJS
- Typescript
- GraphQl
- Apollo Server
- Typegraphql
