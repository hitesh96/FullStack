import webbrowser


class Movie():
    """
        title (str): This contains the Title of the movie.
        storyline(str): This contains the description of the movie.
        poster_image_url: The URL of the poster showed in the website
                          is contained in it
        trailer_youtube_url: This contains the URL of the youtube trailer
                             of the movie."""
    def __init__(self, movie_title, movie_storyline, poster_image,
                 trailer_youtube):
        self.title = movie_title
        self.storyline = movie_storyline
        self.poster_image_url = poster_image
        self.trailer_youtube_url = trailer_youtube

    # Opens the webpage of the given URL.
    def show_trailer(self):
        webbrowser.open(self.trailer_youtube_url)
