using INTEX_2025.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
    }
}
