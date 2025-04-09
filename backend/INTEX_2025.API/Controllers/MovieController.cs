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

        // POST: /Movie/AddMovie
        [HttpPost("AddMovie")]
        [Authorize(Roles ="Admin")]
        public IActionResult AddMovie([FromBody] MoviesTitle newMovie)
        {
            _context.MoviesTitles.Add(newMovie);
            _context.SaveChanges();
            return Ok(newMovie);
        }


        [HttpPut("UpdateMovie/{showId}")]
        [Authorize(Roles = "Admin")]

        public IActionResult UpdateMovie(string showId, [FromBody] MoviesTitle updatedMovie)
        {
            var existingMovie = _context.MoviesTitles.FirstOrDefault(m => m.ShowId == showId);

            if (existingMovie == null)
            {
                return NotFound(new { message = "Movie not found" });
            }

            // Update fields
            existingMovie.Title = updatedMovie.Title;
            existingMovie.Type = updatedMovie.Type;
            existingMovie.Director = updatedMovie.Director;
            existingMovie.Cast = updatedMovie.Cast;
            existingMovie.Country = updatedMovie.Country;
            existingMovie.Description = updatedMovie.Description;
            existingMovie.ReleaseYear = updatedMovie.ReleaseYear;
            existingMovie.Rating = updatedMovie.Rating;
            existingMovie.Duration = updatedMovie.Duration;

            // Update genres (sample)
            existingMovie.Action = updatedMovie.Action;
            existingMovie.Adventure = updatedMovie.Adventure;
            existingMovie.Dramas = updatedMovie.Dramas;
            existingMovie.Documentaries = updatedMovie.Documentaries;
            // ... Add other genre fields here

            _context.MoviesTitles.Update(existingMovie);
            _context.SaveChanges();

            return Ok(existingMovie);
        }



        // DELETE: /Movie/DeleteMovie/{showId}
        [HttpDelete("DeleteMovie/{showId}")]
        [Authorize(Roles = "Admin")]

        public IActionResult DeleteMovie(int showId)
        {
            var movie = _context.MoviesTitles.Find(showId);

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
    }
}
