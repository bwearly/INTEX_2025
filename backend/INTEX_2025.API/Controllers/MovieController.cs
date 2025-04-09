using INTEX_2025.API.Data;
using Microsoft.AspNetCore.Authorization;
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
                .OrderBy(m => m.ShowId)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList(); // ← this will include ALL properties including genres

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

        [HttpPost("AddMovie")]
        public IActionResult AddMovie([FromBody] MoviesTitle newMovie)
        {
            if (string.IsNullOrEmpty(newMovie.ShowId))
            {
                newMovie.ShowId = Guid.NewGuid().ToString(); // ✅ generates a unique string ID
            }

            _context.MoviesTitles.Add(newMovie);
            _context.SaveChanges();

            return Ok(newMovie); // ✅ returns full movie including showId
        }



       [HttpPut("UpdateMovie/{showId}")]
        // [Authorize(Roles = "Admin")]
        public IActionResult UpdateMovie(string showId, [FromBody] MoviesTitle updatedMovie)
        {
            try
            {
                var existingMovie = _context.MoviesTitles.FirstOrDefault(m => m.ShowId == showId);

                if (existingMovie == null)
                {
                    return NotFound(new { message = "Movie not found" });
                }

                // Update basic string and numeric fields (null-safe)
                existingMovie.Title = updatedMovie.Title ?? existingMovie.Title;
                existingMovie.Type = updatedMovie.Type ?? existingMovie.Type;
                existingMovie.Director = updatedMovie.Director ?? existingMovie.Director;
                existingMovie.Cast = updatedMovie.Cast ?? existingMovie.Cast;
                existingMovie.Country = updatedMovie.Country ?? existingMovie.Country;
                existingMovie.Description = updatedMovie.Description ?? existingMovie.Description;
                existingMovie.ReleaseYear = updatedMovie.ReleaseYear ?? existingMovie.ReleaseYear;
                existingMovie.Rating = updatedMovie.Rating ?? existingMovie.Rating;
                existingMovie.Duration = updatedMovie.Duration ?? existingMovie.Duration;

                // Safely update genres (set to 0 if null)
                existingMovie.Action = updatedMovie.Action ?? 0;
                existingMovie.Adventure = updatedMovie.Adventure ?? 0;
                existingMovie.Dramas = updatedMovie.Dramas ?? 0;
                existingMovie.Documentaries = updatedMovie.Documentaries ?? 0;
                // Add more genres as needed...

                _context.MoviesTitles.Update(existingMovie);
                _context.SaveChanges();

                return Ok(existingMovie);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    error = "Failed to update movie",
                    details = ex.Message,
                    stack = ex.StackTrace
                });
            }
        }



        [HttpDelete("DeleteMovie/{showId}")]
        public IActionResult DeleteMovie(string showId)
        {
            var movie = _context.MoviesTitles.FirstOrDefault(m => m.ShowId == showId);

            if (movie == null)
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

        [HttpGet("GetGenres")]
        public IActionResult GetGenres()
        {
            var genreProperties = typeof(MoviesTitle).GetProperties()
                .Where(prop => prop.PropertyType == typeof(int?) && prop.Name != "ReleaseYear")
                .Select(prop => prop.Name)
                .ToList();

            return Ok(genreProperties);
        }

    }
}
