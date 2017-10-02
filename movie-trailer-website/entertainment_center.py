import media
import fresh_tomatoes
import urllib
import json
# Constructor of Movie Class takes title, description, image URL
# and web URL as argument


def get_info(movie_name):
    # Get a response after opening the URL
    response = urllib.urlopen("http://www.omdbapi.com/?t="+movie_name+"&y=&plot=short&r=json")  # NOQA
    # Data from the website in the form of JSON is recieved
    output = response.read()
    # Parsing Values from JSON data
    wjdata = json.loads(output)
    return wjdata
data = get_info("Toy Story")

toy_story = media.Movie(data['Title'], data['Plot'], data['Poster'],
                        "https://www.youtube.com/watch?v=KYz2wyBy3kc")

data = get_info("Avatar")
avatar = media.Movie(data['Title'], data['Plot'], data['Poster'],
                     "https://www.youtube.com/watch?v=5PSNL1qE6VY")

data = get_info("Interstellar")
interstellar = media.Movie(data['Title'], data['Plot'], data['Poster'],
                           "https://www.youtube.com/watch?v=zSWdZVtXT7E")

data = get_info("School of Rock")
school_of_rock = media.Movie(data['Title'], data['Plot'], data['Poster'],
                             "https://www.youtube.com/watch?v=XCwy6lW5Ixc")

data = get_info("Ratatouille")
ratatouille = media.Movie(data['Title'], data['Plot'], data['Poster'],
                          "https://www.youtube.com/watch?v=c3sBBRxDAqk")

data = get_info("Midnight In Paris")
midnight_in_paris = media.Movie(data['Title'], data['Plot'], data['Poster'],
                                "https://www.youtube.com/watch?v=FAfR8omt-CY")
data = get_info("3 Idiots")
idiots = media.Movie(data['Title'], data['Plot'], data['Poster'],
                     "https://www.youtube.com/watch?v=xvszmNXdM4w")

# List of Movie objects
movies = [idiots, toy_story, avatar, interstellar, ratatouille,
          midnight_in_paris]
# Method which takes the Array of Movie objects as argument
# and convert into a website
fresh_tomatoes.open_movies_page(movies)
