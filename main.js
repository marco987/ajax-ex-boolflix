
// LINK COPERTINA:
// https://image.tmdb.org/t/p/w185/s2VDcsMh9ZhjFUxw77uCFDpTuXp.jpg


function searchClick() {

  var query = $('#query').val();
  console.log(query);

  getMovies(query);
  getTV(query);
}

function getMovies(query) {

  // MOVIES
  $.ajax({

    url: "https://api.themoviedb.org/3/search/movie",
    method: "GET",
    data: {

      api_key: "e99307154c6dfb0b4750f6603256716d",
      language: "it-IT",
      query: query

    },
    success: function(data) {

      console.log("MOVIES OUTPUT");
      console.log(data);

      var movies = data.results;
      printAdv("movies", movies);
    },
    error: function() {

      alert('Errore!!');
    }

  });
}

function getTV(query) {

  // TV
  $.ajax({

    url: "https://api.themoviedb.org/3/search/tv",
    method: "GET",
    data: {

      api_key: "e99307154c6dfb0b4750f6603256716d",
      language: "it-IT",
      query: query

    },
    success: function(data) {

      console.log("TV OUTPUT");
      console.log(data);

      var tv = data.results;
      printAdv("tv", tv);
    },
    error: function() {

      alert('Errore!!');
    }

  });
}

function print(type, movies) {

  var objs = $("#results");

  for (var i=0;i<movies.length;i++) {

    var movie = movies[i];

    // var source = document.getElementById("entry-template").innerHTML;
    var source = $("#movie").html();
    var template = Handlebars.compile(source);

    title = "";
    originalTitle = "";

    if (type == "movies") {

      title = movie.title;
      originalTitle = movie.original_title;
    } else {

      title = movie.name;
      originalTitle = movie.original_name;
    }

    var context = {
      type: type,
      title: title,
      originalTitle: originalTitle,
      movieLan: getLangFlag(movie.original_language),
      movieRate: getStarFromRate(movie.vote_average),
      img: getPosterImg(movie.poster_path)
    };

    var html = template(context);

    objs.append(html);
  }
}

function printAdv(type, movies) {

  var objs = $("#results");

  for (var i=0;i<movies.length;i++) {

    var movie = movies[i];

    // var source = document.getElementById("entry-template").innerHTML;
    var source = $("#movie-adv").html();
    var template = Handlebars.compile(source);

    title = "";
    originalTitle = "";

    if (type == "movies") {

      title = movie.title;
      originalTitle = movie.original_title;
    } else {

      title = movie.name;
      originalTitle = movie.original_name;
    }

    var context = {
      type: type,
      title: title,
      originalTitle: originalTitle,
      movieLan: getLangFlag(movie.original_language),
      movieRate: getStarFromRate(movie.vote_average),
      img: getPosterImg(movie.poster_path)
    };

    var html = template(context);

    objs.append(html);
  }
}

function getStarFromRate(rate) {

  var roundedRate = Math.floor(rate/2); // 300

  var graphStar = "";
  for (var i=0;i<5;i++) {

    if (i < roundedRate) {
      graphStar += '<i class="fas fa-star"></i>';
    } else {
      graphStar += '<i class="far fa-star"></i>';
    }
  }

  return graphStar;
}

function getLangFlag(lang) {

  var availableFlag = [
    "it",
    "en"
  ];

  var flag = "";
  if (availableFlag.includes(lang)) {

    flag = "<img src='img/" + lang + ".svg' class='lang'>";
  } else {

    flag = lang;
  }

  return flag;
}

function getPosterImg(url) {

  var imgTag = "";
  if (url) {

    imgTag = "<img src='https://image.tmdb.org/t/p/w185" + url + "' class='poster'/>"
  }

  return imgTag;
}

function init() {

  console.log("init");

  $('#myButton').click(searchClick);
}

$(document).ready(init);
