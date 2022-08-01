# Sharing Services API

![Application Image](./public/app_image.png)

A backend server API to handle ressources sharing in a network.
The server have been made in `NodeJs`.

## Installation & Usage

First and foremost, you must have `nodeJs` installed on your computer. Then type the following command in your terminal : 

```
git clone https://github.com/yayolande/sharingServicesAPI
cd sharingServicesAPI
npm install
npm start
```

## Developer Instruction

One thing to note for those that want to modify the code source is that the application use Typescript. Therefore, you have to compile your code to Javascript first before being able to run the nodeJs server.

For this reason, I created a simple bash script that automate the compilation of `*.ts` file while a change occurs. Just run in your linux terminal :

```
cd api/
chmod + x aut_compiler.sh
./aut_compiler.sh
```

> The file **aut_compiler.sh** only work on linux.

