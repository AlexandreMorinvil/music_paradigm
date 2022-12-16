
<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

To run this program, the following software need to be install :

* Using a Linux Operating System
* Possessing 3 different public domain linked to the same IP address
* Installing docker
* Installing docker-compose
* Installing git

#### Using a Linux Operating System

The application was tested to work on linux. It might be portable on a Window operating system, but this is not guarranteed.

#### Possessing 3 different public domain

In order for this application, it is necessary to possess 3 different domain names all linked to the same IP address, which must correspond to the IP address of the hosting server. For example, the three domain names for the Twin's Experiment are :

* music.neuro.ki.se
* paradigm.neuro.ki.se
* labmaster.neuro.ki.se

The reason is that the deployment suggested here works through a reversed proxy that uses the URL to discriminate the service concerned.

#### Installing docker

To install docker, if the operating system used is a Debian/Ubuntu distribution, run the following commands in a bash console :

```sh
sudo apt-get update
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

Afterward, to proceed to the installation of docker, run the following command :

```sh
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

To install docker, follow the instructions provided in the following link in accordance to your Linux distribution:
[Docker Installation] (https://docs.docker.com/get-docker/)

#### Installing docker-compose

To install docker-compose, run the following commands in a bash console :

```sh
sudo curl -L "https://github.com/docker/compose/releases/download/1.28.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

A more detailled explaination of the steps to intall docker-compose is described in the following link :
[Docker Compose Intallation](https://docs.docker.com/compose/install/)

#### Installing git

To install git, if the operating system used is a Debian/Ubuntu distribution, run the following commands in a bash console :

```sh
sudo apt-get update
sudo apt-get install git

```

A more detailled set of instructions to install git is described in the following link :
[Git Intallation](https://git-scm.com/download/linux)

### Installation

#### For deployent online

1. Create a root repository to contain all the files of the application.

```sh
cd
mkdir music_paradigm_application
cd music_paradigm_application 
```

2. Clone the repository containing the application and all the necessary files for its deployment.

```sh
cd
cd music_paradigm_application
git clone http://git.mistlab.ca/amorinvil/music_paradigm.git
```

3. Move the content of the 'deployment' folder in the root repository

```sh
cd
cd music_paradigm_application
cp music_paradigm/deployment/docker-compose.yml docker-compose.yml
cp music_paradigm/deployment/nginx.tmpl nginx.tmpl
cp music_paradigm/deployment/.env .env
```

The folder in question contains the `docker-compose.yml` file used for the deployment of the application

4. Adjusting the `.env` file's environment variable.

```sh
cd
cd music_paradigm_application
nano .env
```

(The file is currently already properly configuration for the Twin's Experiment's deployment)

In this file four elements must be adjusted : 

* HOST_FRONTEND_SERVER 
This environment variable corresponds to the URL associated to the frontend server.

* HOST_BACKEND_SERVER
This environment variable corresponds to the URL associated to the backend server.

* HOST_DATABASE_MANAGER=labmaster.neuro.ki.se
This environment variable corresponds to the URL associated to the database manager.

* MANAGEMENT_EMAIL=john.sennett@ki.se
This will be the Email adress associated to the SSL services.

5. Generating a 4096-bit encrypted SSL certificate
   
Verify that the openssl program is properly installed by running the command `openssl version -a`.
If the openssl program is not install, proceed to its installation with the following commands :
   
Afterward, generate the 4096-bit encrypted SSL certificate by running the following commands. Be aware that this command will take a long time before reaching completing (probably between one and two hours). Optionally, the 4096 bit could be changed to 2048 bits by changing the 4096 by 2048 in the command (This will result in a faster generation of the SSL certificate).
   
```sh
cd
cd music_paradigm_application
openssl dhparam -out dhparam.pem 4096
```

After the generation of the SSL certificate, the application should be ready to run.


<!-- USAGE EXAMPLES -->
## Deployment

#### To deploy the application

The file structure should minimally contain the following :

-- music_paradigm_application (root folde)
	|-- .env
	|-- dhparams.pem
	|-- docker-compose.yml
	|-- music_paradigm/
	`-- nginx.tmpl

In oder to deploy the application, the following command must be run in the root folder (the `music_paradigm_application` folder) :

```sh
sudo docker-compose -f "docker-compose.yml" up -d --build
```


After the deployment command, there should be a small delay (a few minutes) before the application becomes operational. 

The application should be accessible through the HOST_FRONTEND_SERVER address in a web browser. Im the case of the Twin's experiment, this address is [music.neuro.ki.se](music.neuro.ki.se). By accessing htis page, you should be prompted to a black login page. If the said page appears, this means that the application what deployed almost completely sucessfully.

The last element to pay attention with is the type of protocol used to connect to the page. In the web browser, you should make sure the address you have reached indicates the following with the HTTPS (secure HTTP) connection :

https://music.neuro.ki.se

If HTTPS is indeed the type of connection indicated, the application has then been completely successfully lauched.

If instead the address indicated is the type of connection is HTTP (non-secure HTTP) such as the following :

http://music.neuro.ki.se

This means that a problem occured with the SSL protocole in the deployment. Generally, this issue can be resolved by turning off the application and turning it on again.

#### To turn off the application

In order to turn off the application, from the root folder (the `music_paradigm_application` folder), run the following command :

```sh
sudo docker-compose -f "docker-compose.yml" down
```

## Usage

### Initial Login Page

When launching the application, the initial default Password and Username of the login page are :

* Username : LabMaster
* Password : CoffeyLabInConcordia

### Managing users

This section will be detailed in the future.

### Managing experiments

This section will be detailed in the future.

### Doing an experiment

This section will be detailed in the future.

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.







## To develop the application

### To run the application within the container 
### (For deployment)

$ docker-compose -f "docker-compose.yml" up -d --build

### To run the application outside the container 
### (For development and debugging purposes)

## 1. Ensure that MongoDB is correctly installed
# To install Mongo-Express

$ sudo npm install -g mongo-express

## 2. Start the MongoDB service
## (Depending on you instalation of mongodb, the command might be one of the following)

$ sudo systemctl start mongod

$ sudo systemctl start mongodb

# 3. Run the following commands

$ ./music_paradigm_api/npm run start
$ ./music_paradigm_web/npm run serve

## Formatting

* Prettier
* Eslint

Need to install prettier-Eslint 
(The following tutorial give a well detailed explaination of the proceedure for setting it up : https://www.robinwieruch.de/prettier-eslint)
