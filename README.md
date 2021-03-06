# Goal Bruins

## Introduction

Our team implemented an interactive goal planner called Goal Bruins for users to create, follow, and archive their own personal goals. The application also provides social features such as following/unfollowing and liking/unliking goals created by other users on the platform. 


To provide users with the most relevant and updated information, our app can push the most popular goals on the platform to the user based on likes and follows, and also rank the goals based on creation time/alphabetical order.


Given the current remote learning environment, students may find it difficult to work productively and complete personal goals on time. Our app is designed to allow users to keep track of their own personal and academic goals while socializing with others.


Goal Bruins provides a positive sharing platform where all Bruins can join together and encourage each other to overcome procrastination and complete their goals!


## Video Demo

https://drive.google.com/drive/folders/1AhRhbEzXO7q72vJUzzGmFsXZDjlZBzvD?usp=sharing


## How to Run this App

Navigate to the directory you want to save our package in the command line and download the code by entering

```
git clone https://github.com/MDZHX/goal-bruins.git
```

Then enter the folder

```
cd goal-bruins
```

We first need to install required packages for the backend server and then start up the server

```
cd server
```

```
npm install
npm start
```

Then you need to open up a new terminal, navigate to the folder `goal-bruins` and do the following:

```
cd client
```

```
npm install
npm start
```

A new browser window will open automatically.

To close the app, you can enter CTRL + C in both terminals or simply close the two terminals.

## Known Issues

* Due to performance issues, the app might exhibit unexpected behavior upon very frequent user interactions in a short period of time.
* The "Add Goals" button only works when the filter is set to "All".
* The filtering results for creation time might be inaccurate in certain situations, as there may be problems when coordinating local time with server time.

