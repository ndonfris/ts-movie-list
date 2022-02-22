* What are these files?

The files in this directory contain an example MongoDB used in this api.  

* How do I set them up?

For this I used gui called MongoDB Compass. If you are trying to host the
server locally I would highly recommend this software.  
  
MongoDB Compass allows you to directly import json files to a database. Here
are the steps I used to set up the database:  
1. Create a new connection. This can be named whatever you want.(I used
   movieServer).  
1. Connect to the connection (click on green "connect" button). The url should
   look something like:   
       `mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false.`  
1. Create a database named movies (click on green "Create Database" button)   
1. In the left control panel, hover over movies. Click the plus button for each
   database json file in this directory. The files here are already named to their
   corresponding collection in the database.

* How did I host on the cloud?  

Documentation for this is in the [mongoURI.ts](../source/config/mongoURI.ts) and [mongoKeys.ts](../source/config/mongoKeys.ts) files in the [config](../source/config/)
directory. Essentially you create a MongoDB on your preferred cloud provider.
After that, you just paste the relevant information into the mongoKeys.ts file. 
I found [this](https://www.mongodb.com/developer/how-to/use-atlas-on-heroku/) link helpful for using MongoDB on Heroku.



