# movie-trailer-website
## Introduction
This is a server-side code written in Python to store the list of my favorite movies including box art imagery and a movie trailer URL. We can serve this data as a webpage allowing visitors to review the movies and watch the trailer.



## Steps to open the website
1. Unzip the file to a specific folder.
2. Open fresh_tomatoes.html to view the website.

## Standard Python Libararies Used:
 - <b> urllib</b>: This module provides a high-level interface for fetching data across the World Wide Web. In particular, the urlopen() function is used to open the websites 
 - <b>json</b>: This module helps to deal with data in JSON Format.
 - <b>webbroweser</b>: Similar to urllib.

## How to Add Your Favorite Movie
1. This code is written in Python.To Download <br>
(For Windows)    <a href="https://www.python.org/downloads/">Click Here</a> </br>(For Mac)<a href="https://www.python.org/downloads/mac-osx/">Click Here</a><br> 

2. Open entertainment.py using python IDLE.
3. Call the get_info method with your favorite movie as the string argument which will return the movie info in JSON
format and store it into your variable(say myData).
For Example: data = get_info("Fault in our stars")

4. Add the title, Plot, Poster URL and Youtube URL of the movie as arguments in Movie class contructor in meida.py file.
For example: fault_in_our_stars = media.Movie(data['Title'], data['Plot'], data['Poster'],
                             "https://www.youtube.com/watch?v=9ItBvH5J6ss")
                             
5. Add this object in the movies list at the end of the file and Run the module.
6. That's It!

## Changes Made
 - Used omdb API to get the data of the website in JSON Format.<br>
```
    def get_info(movie_name):
        response = urllib.urlopen("http://www.omdbapi.com/?t="+movie_name+"&y=&plot=short&r=json")
        output = response.read()
        wjdata = json.loads(output)
        return wjdata
```
Calling the function:
```
   data = get_info("Toy Story")
   toy_story = media.Movie(data['Title'], data['Plot'], data['Poster'],"https://www.youtube.com/watch?v=KYz2wyBy3kc")
```
 - Style:<br>
  a. Changed the Background
  ```
  body {
            padding-top: 80px;
            background-image: url("grey-website.jpg");
        }
  ```  
  b. Change the font attributes of Header and Title of movies
  ```
  .myfont{
            font-family: 'Bungee Shade', cursive;
            font-color: #FFFFFF;
            font-size: 50px;
        }
        
  .title{
            font-family: 'Exo' , sans-serif;
            background-color: #FFFFFF;
        }
  ```
  c. Added border in the Movie Tiles
  ```
    .movie-tile {
            border: 2px solid white;
            border-radius: 10px;
            margin-bottom: 20px;
            padding-top: 20px;
            
        }
        
  ```
  d. Slow Down the Animation 
  ```
  // Animate in the movies when the page loads
        $(document).ready(function () {
          $('.movie-tile').hide().first().show("fast", function showNext() {
            $(this).next("div").show("slow", showNext);
          });
        });
  ```
