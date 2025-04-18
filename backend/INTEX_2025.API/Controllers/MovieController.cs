﻿using System.Security.Claims;
using INTEX_2025.API.Data;
using INTEX_2025.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace INTEX_2025.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class MovieController : ControllerBase
    {
        private MoviesDbContext _context;

        public MovieController(MoviesDbContext temp)
        {
            _context = temp;
        }

        [HttpGet("AllMovies")]
        [Authorize]
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

        [HttpPost("Rate")]
        [Authorize]
        public IActionResult RateMovie([FromBody] RateMovieDto dto)
        {
            if (string.IsNullOrEmpty(dto.ShowId) || dto.Rating < 1 || dto.Rating > 5)
            {
                return BadRequest("Invalid movie ID or rating value.");
            }

            if (HttpContext.Request.Cookies["CookieConsent"] == "true")
            {
                var key = $"rating:{dto.ShowId}";
                HttpContext.Session.SetInt32(key, dto.Rating);

                return Ok(new { message = $"Rating {dto.Rating} for movie {dto.ShowId} stored in session." });
            }

            return StatusCode(403, new { message = "Cookie consent required to store rating." });
        }

        [HttpGet("Rating/{ShowId}")]
        [Authorize]
        public IActionResult GetRatingFromSession(string showId)
        {
            var key = $"rating:{showId}";
            var rating = HttpContext.Session.GetInt32(key);

            if (rating.HasValue)
            {
                return Ok(new { ShowId = showId, Rating = rating.Value });
            }

            return NotFound(new { message = "No rating found in session for this movie." });
        }


        [HttpGet("GetEntertainmentType")]
        [Authorize]
        public IActionResult GetEntertainmentType()
        {
            var entertainmentType = _context.MoviesTitles.Select(X => X.Type).Distinct().ToList();

            return Ok(entertainmentType);
        }

        [HttpPost("AddMovie")]
        [Authorize(Roles = "Admin")]
        public IActionResult AddMovie([FromBody] MoviesTitle newMovie)
        {
            if (string.IsNullOrEmpty(newMovie.ShowId))
            {
                newMovie.ShowId = Guid.NewGuid().ToString(); 
            }

            _context.MoviesTitles.Add(newMovie);
            _context.SaveChanges();

            return Ok(newMovie);
        }

        [HttpPut("UpdateMovie/{showId}")]
        [Authorize(Roles = "Admin")]
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
        [Authorize(Roles = "Admin")]
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
        [AllowAnonymous]
        public IActionResult SearchMovies([FromQuery] string query)
        {
        if (string.IsNullOrWhiteSpace(query))
            return BadRequest("Search query cannot be empty.");

        var loweredQuery = query.Trim().ToLower();

        var movies = _context.MoviesTitles
            .Where(m => m.Title.ToLower().Contains(loweredQuery))
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

            return Ok(movies);
        }

        [HttpGet("GetGenres")]
        [Authorize]
        public IActionResult GetGenres()
        {
            var genreProperties = typeof(MoviesTitle).GetProperties()
                .Where(prop => prop.PropertyType == typeof(int?) && prop.Name != "ReleaseYear")
                .Select(prop => prop.Name)
                .ToList();

            return Ok(genreProperties);
        }

        [HttpGet("TvShows")]
        [Authorize]
        public IActionResult GetTvShows([FromQuery] int page = 1, [FromQuery] int pageSize = 100)
        {
            if (page < 1 || pageSize < 1)
                return BadRequest("Page and pageSize must be greater than 0.");

            var shows = _context.MoviesTitles
                .Where(m => m.Type == "TV Show")
                .OrderBy(m => m.ShowId)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalCount = _context.MoviesTitles.Count(m => m.Type == "TV Show");

            return Ok(new
            {
                TotalCount = totalCount,
                CurrentPage = page,
                PageSize = pageSize,
                Movies = shows
            });
        }

        [HttpGet("me")]
        public IActionResult GetCurrentUser()
        {
            var user = HttpContext.User;

            if (!user.Identity.IsAuthenticated)
            {
                return Unauthorized();
            }

            var email = user.Identity.Name;
            var role = user.IsInRole("Admin") ? "admin" : "user";

            return Ok(new
            {
                email = email,
                role = role
            });
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetMovieById(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("No ID provided");
            }

            var movie = await _context.MoviesTitles
                .FirstOrDefaultAsync(m => m.ShowId == id);

            if (movie == null)
            {
                return NotFound($"Movie with ShowId {id} not found");
            }

            return Ok(new { Movies = new[] { movie } });
        }



        [HttpPost("ByIds")]
        [Authorize]
        public IActionResult GetMoviesByIds([FromBody] List<string> ids)
        {
            if (ids == null || !ids.Any())
                return BadRequest("No IDs provided");

            var matched = _context.MoviesTitles
                .Where(m => ids.Contains(m.ShowId))
                .ToList();

            return Ok(new { Movies = matched });
        }

        [HttpGet("UserProfile")]
        [Authorize]
        public async Task<IActionResult> GetUserProfile()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            if (string.IsNullOrEmpty(email))
            {
                return Unauthorized(new { message = "User email not found in token." });
            }

            var movieUser = await _context.MoviesUsers
                .FirstOrDefaultAsync(mu => mu.Email.ToLower() == email.ToLower());

            if (movieUser == null)
            {
                return NotFound(new { message = "Movie user not found." });
            }

            var userProfileDto = new MovieUserDto
            {
                Name = movieUser.Name,
                Age = (int)movieUser.Age,
                Email = movieUser.Email,
                Gender = movieUser.Gender,
                City = movieUser.City
            };

            return Ok(userProfileDto);
        }
    }

    [ApiController]
    [Route("/")]
    public class RootController : ControllerBase
    {
        [HttpGet]
        public IActionResult Index()
        {
            return Ok("CineNiche API is running 🚀");
        }
    }

    public class MovieUserDto
    {
        public string Name { get; set; }
        public int Age { get; set; }  // Adjust type if necessary
        public string Email { get; set; }
        public string Gender { get; set; }
        public string City { get; set; }
    }
}
