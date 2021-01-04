##### To Run the application

### To run the application within the container 
### (For deployment)

$ docker-compose -f "docker-compose.yml" up -d --build

### To run the application outside the container 
### (For development and debugging purposes)

## 1. Ensure that MongoDB is correctly installed
# To install Mongo-Express

$ sudo npm install -g mongo-express

## 2. Start the MongoDB service

$ sudo systemctl start mongod

# 3. Run the following commands

$ ./music_paradigm_api/npm run start
$ ./music_paradigm_web/npm run serve

## Formatting

* Prettier
* Eslint

Need to install prettier-Eslint 
(The following tutorial give a well detailed explaination of the proceedure for setting it up : https://www.robinwieruch.de/prettier-eslint)
