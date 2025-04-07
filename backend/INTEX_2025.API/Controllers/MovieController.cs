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
        public IActionResult GetMovies([FromQuery] int page = 1, [FromQuery] int pageSize = 100)
        {
            if (page < 1 || pageSize < 1)
                return BadRequest("Page and pageSize must be greater than 0.");

            var movies = _context.MoviesTitles
                .OrderBy(m => m.ShowId) // or any consistent order
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(m => new
                {
                    m.ShowId,
                    m.Title,
                    m.Director,
                    m.Cast,
                    m.ReleaseYear,
                    m.Rating,
                    m.Description,
                    m.Type,
                    PosterUrl = $"/posters/{Uri.EscapeDataString(m.Title)}.jpg"
                })
                .ToList();

            var totalCount = _context.MoviesTitles.Count();

            return Ok(new
            {
                TotalCount = totalCount,
                CurrentPage = page,
                PageSize = pageSize,
                Movies = movies
            });
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

        [HttpPost("AddMovie")]
        public IActionResult AddMovie([FromBody] MoviesTitle newMovie)
        {
            _context.MoviesTitles.Add(newMovie);
            _context.SaveChanges();
            return Ok(newMovie);
        }

        [HttpPost("UpdatedMovie/{ShowId}")]

        public IActionResult UpdateMovie(int ShowId, [FromBody] MoviesTitle updatedMovie)
        {
            var existingMovie = _context.MoviesTitles.FirstOrDefault(m => m.ShowId == updatedMovie.ShowId);

            if (existingMovie == null)
            {
                return NotFound();
            }

            // Basic info
            existingMovie.Title = updatedMovie.Title;
            existingMovie.Director = updatedMovie.Director;
            existingMovie.Cast = updatedMovie.Cast;
            existingMovie.Description = updatedMovie.Description;
            existingMovie.Duration = updatedMovie.Duration;
            existingMovie.Rating = updatedMovie.Rating;
            existingMovie.ReleaseYear = updatedMovie.ReleaseYear;
            existingMovie.Type = updatedMovie.Type;

            var genreNames = new[]
                {
                    "Action", "Adventure", "Anime Series International TV Shows", "British TV Shows Docuseries International TV Shows", "Children",
                    "Comedies", "Comedies Dramas International Movies", "Comedies International Movies", "Comedies Romantic Movies", "Crime TV Shows Docuseries",
                    "Documentaries", "Domcumentaries International Movies", "Docuseries", "Dramas", "Dramas International Movies", "Dramas Romantic Movies",
                    "Family Movies", "Fantasy", "Horror Movies", "International Movies Thriller", "International TV Shows Romantic TV Shows TV Dramas",
                    "Kids' TV", "Language TV Shows", "Musicals", "Nature TV", "Reality TV", "Spirituality", "TV Action", "TV Comedies", "TV Dramas",
                    "Talk Shows TV Comedies", "Thrillers"
                };

            foreach (var genre in genreNames)
            {
                // Get the property info from the EF model (via metadata or reflection)
                var propInfo = typeof(MoviesTitle).GetProperties()
                    .FirstOrDefault(p => p.GetCustomAttributes(typeof(System.ComponentModel.DataAnnotations.Schema.ColumnAttribute), false)
                        is System.ComponentModel.DataAnnotations.Schema.ColumnAttribute[] attrs && attrs.Any(a => a.Name == genre));

                if (propInfo != null)
                {
                    var newValue = propInfo.GetValue(updatedMovie);
                    propInfo.SetValue(existingMovie, newValue);
                }
            }

            _context.MoviesTitles.Update(existingMovie);
            _context.SaveChanges();

            return Ok(existingMovie);
        }

        [HttpDelete("DeleteMovie/{showId}")]
        public IActionResult DeleteMovie(int showId)
        {
            var movie = _context.MoviesTitles.Find(showId);

            if (movie != null)
            {
                return NotFound(new { message = "Movie not found" });
            }

            _context.MoviesTitles.Remove(movie);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpGet("Search")]
        public IActionResult SearchMovies([FromQuery] string query)
        {
            if (string.IsNullOrWhiteSpace(query))
                return BadRequest("Search query cannot be empty.");

            var movies = _context.MoviesTitles
                .Where(m => EF.Functions.Like(m.Title.ToLower(), $"%{query.ToLower()}%"))
                .Select(m => new
                {
                    m.ShowId,
                    m.Title,
                    m.Director,
                    m.Cast,
                    m.ReleaseYear,
                    m.Rating,
                    m.Description
                })
                .ToList();

            return movies.Any() ? Ok(movies) : NotFound("No movies matched your search.");
        }
    }
}
