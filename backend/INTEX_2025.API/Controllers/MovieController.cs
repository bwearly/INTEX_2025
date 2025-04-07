using INTEX_2025.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace INTEX_2025.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private MoviesDbContext _context;
        public MovieController(MoviesDbContext temp)
        {
            _context = temp;
        }

        [HttpGet("AllMovies")]
        public IActionResult GetMovies()
        {
            var movies = _context.MoviesTitles.AsQueryable();
            var totalMovies = _context.MoviesTitles;

            var movieObject = new
            {
                Movies = movies,
            };
            return Ok(movieObject);
        }

        [HttpGet("GetEntertainmentType")]
        public IActionResult GetEntertainmentType() 
        {
            var entertainmentType = _context.MoviesTitles.Select(X => X.Type).Distinct().ToList();
            
            return Ok(entertainmentType);
        }

        //[HttpGet("MoviesByGenre")]
        //public IActionResult GetMoviesByGenre()
        //{
        //    var genres = new[] { "Action", "Adventure", "Anime Series International TV Shows", "British TV Shows Docuseries International TV Shows", "Children", "Comedies", "Comedies Dramas International Movies", "Comedies International Movies", "Comedies Romantic Movies", "Crime TV Shows Docuseries", "Documentaries", "Domcumentaries International Movies", "Docuseries", "Dramas", "Dramas International Movies", "Dramas Romantic Movies", "Family Movies", "Fantasy", "Horror Movies", "International Movies Thriller", "International TV Shows Romantic TV Shows TV Dramas", "Kids' TV", "Language TV Shows", "Musicals", "Nature TV", "Reality TV", "Spirituality", "TV Action", "TV Comedies", "TV Dramas", "Talk Shows TV Comedies", "Thrillers" };
        //    var result = new Dictionary<string, List<string>>();

        //    foreach (var genre in genres)
        //    {
        //        var movies = _context.MoviesTitles
        //            .Where(m => EF.Property<int>(m, genre) == 1)
        //            .Select(m => m.Title)
        //            .ToList();

        //        result[genre] = movies;
        //    }

        //    return Ok(result);
        //}

    }
}
