# Marvel Legends API

 

A REST API  that retrieves action figure information from a [Marvel Legends](https://en.wikipedia.org/wiki/Marvel_Legends) Database created by me.

  

## Lore

I built this API because I wanted to create a simple Marvel Legends checklist web application to track my collection. I realized that Hasbro does not provide an API or public database accessible for developers who collect Marvel Legends action figures like myself. 

Developers who would like to build a simple or complex checklist website to track their Marvel Legends collection will be able to use this API, saving them time having to build their own database from scratch. 

<b>Important:</b> I'm aware exposing JWS Token using an alert box is not even close to best practice in terms of authentication. But currently I'm using this API for myself and to showcase my ability in creating a Rest API from scratch. 

## Getting Started
### Resources

* [Node.js](https://nodejs.org/en)

* [Express.js](https://expressjs.com/)

* [Typescript](https://www.typescriptlang.org/)

* [MongoDB](https://www.mongodb.com/)

* [AWS Cognito](https://aws.amazon.com/pm/cognito/?gclid=Cj0KCQjw_qexBhCoARIsAFgBletam0LnQmpX9ey5aFORQNIblsu-DqoBPYKn1oZfi2cGiPjdAE3v69waAkMjEALw_wcB&trk=f5fef02c-2926-48d3-898a-b4d668742a20&sc_channel=ps&ef_id=Cj0KCQjw_qexBhCoARIsAFgBletam0LnQmpX9ey5aFORQNIblsu-DqoBPYKn1oZfi2cGiPjdAE3v69waAkMjEALw_wcB:G:s&s_kwcid=AL!4422!3!651737511575!e!!g!!cognito!19845796024!146736269189)

* [AWS S3](https://aws.amazon.com/pm/serv-s3/?gclid=Cj0KCQjw_qexBhCoARIsAFgBlevXBCXIYmjxrzRbXJAqzWVDcYEKqM0LcBykeXl6-1KaZZb6mjBxwDUaAuw9EALw_wcB&trk=fecf68c9-3874-4ae2-a7ed-72b6d19c8034&sc_channel=ps&ef_id=Cj0KCQjw_qexBhCoARIsAFgBlevXBCXIYmjxrzRbXJAqzWVDcYEKqM0LcBykeXl6-1KaZZb6mjBxwDUaAuw9EALw_wcB:G:s&s_kwcid=AL!4422!3!536452728638!e!!g!!aws%20s3!11204620052!112938567994)
  
  
  

### Requesting Access
* Request an account from me to retrieve JWT (Acess Token from Cognito).
	* Use these credentials for example purposes
		* username: xekaja9228@em2lab.com
		* password: Test123!!
* Once log in credentials are authenticated, you will receive a JWT token that has to be included in the next steps.


  

### Requesting Resources

Retrieve all action figures.
```
https://marvellegendsapi.com/figure/
```

Retrieve action figures by using [query parameters](https://www.branch.io/glossary/query-parameters/#:~:text=Query%20parameters%20are%20a%20defined,on%20the%20data%20being%20passed.). All parameters are optional, but you <b>must</b> include at least 1 parameter.
```
https://marvellegendsapi.com/figure/search?name={name}&character={character}&series={series}&part={part}&year={year}&manufacturer={manufacturer}&variant={variant}&exclusive={exclusive}
```

### Example of API call 
Using JavaScript's [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
```
fetch('https://marvellegendsapi.com/figure/search?name={name}',
	{
		method:"GET",
		headers:{
			"Content-Type" : "application/json",
			"Authorization" : "Bearer {access token}"
	}
})
```

### Example of API response
```
[{
	"_id": "66133e3aa01cedaa2ca00184",
	"name": "Iron Man",
	"character": [
		"Tony Stark",
		"Iron Man"
	],
	"series": "Series 1",
	"year": "2002",
	"manufacturer": "ToyBiz",
	"variant": false,
	"image": "https://marvellegendsbucket.s3.amazonaws.com/2001/series-1/iron-man.jpg"
}]
```

## Parameters 


| Parameter | Required / Optional |Type| Description|
|--|--|--| -- |
|`name`| Optional| String| Search an action figure by name
|`character`|Optional| String| Search an action figure by character (e.g., 'Tony Stark', 'Captain America', 'Sam Wilson' ) 
|`series`|Optional| String|  Search an action figure by series (e.g., 'Sugarman BAF')
|`part`|Optional| String|  Search an action figure by BAF part (e.g., 'Left Arm')
|`year`|Optional| String|  Search an action figure by release year (e.g., '2011')
|`manufacturer`|Optional| String |  Search an action figure by manufacturer (e.g., 'Hasbro', 'ToyBiz')
|`variant`|Optional| Boolean|  Search variants of an action figure (e.g., true or false)
|`exclusive`|Optional| String | Search exclusive action figures. Using <u>'all'</u> as value will retrieve all the exclusive figures. Using a <u>specific retailer</u> (e.g., 'Walgreens') will retrieve only Walgreens exclusives. 


## Author

  
X: [@wirbyy](https://twitter.com/wirbyy)

