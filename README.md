# wp-reader
Android hybrid app for reading wp blogs

uses ionicframework

# Not done yet

Just the beggining. Need to fix views on app.post and a lot of other things

# How to use it?

If you want to start using it, you need to have an account in mongo lab

And add you API key in app.js

````
.constant('MONGOLAB_CONFIG', {
	API_KEY: 'YOUR-MONGOLAB-API-KEY',
	DB_NAME: 'wp-reader'
})
````


# Demo

http://theoneyouarelookingfor.com/app/

Enter your email, after that you can add blogs (<blogname>.wordpress.com). Your added blogs will be synced with your email adress. Page refresh might be needed to see new blogs
