using System.Security.Claims;
using INTEX_2025.API.Data;
using Microsoft.AspNetCore.Mvc;

namespace INTEX_2025.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RecommendationsController : ControllerBase
{
    private RecommendationsDbContext _recommendationContext;
    private readonly MoviesDbContext _context;

    public RecommendationsController(RecommendationsDbContext recommendationContext, MoviesDbContext context)
    {
        _recommendationContext = recommendationContext;
        _context = context;
    }

    private IActionResult ReturnRawShowIds<T>(T? rec) where T : class
    {
        if (rec == null)
            return Ok(new { Recommendations = new List<string>() });

        var showIdList = rec.GetType().GetProperties()
            .Where(p => p.Name.StartsWith("Recommendation", StringComparison.OrdinalIgnoreCase)
                        && p.Name.Length > "Recommendation".Length
                        && char.IsDigit(p.Name["Recommendation".Length]))
            .Select(p => p.GetValue(rec)?.ToString())
            .Where(id => !string.IsNullOrWhiteSpace(id))
            .ToList();

        return Ok(new { Recommendations = showIdList });
    }

    // MOVIES
    [HttpGet("GetMovieDocumentaries")] public IActionResult GetMovieDocumentaries([FromQuery] string show_id) => ReturnRawShowIds(_recommendationContext.MovieDocumentaries.FirstOrDefault(r => r.show_id == show_id));
    [HttpGet("GetMovieAction")] public IActionResult GetMovieAction([FromQuery] string show_id) => ReturnRawShowIds(_recommendationContext.MovieActions.FirstOrDefault(r => r.show_id == show_id));
    [HttpGet("GetMovieAdventure")] public IActionResult GetMovieAdventure([FromQuery] string show_id) => ReturnRawShowIds(_recommendationContext.MovieAdventures.FirstOrDefault(r => r.show_id == show_id));
    [HttpGet("GetMovieChildren")] public IActionResult GetMovieChildren([FromQuery] string show_id) => ReturnRawShowIds(_recommendationContext.MovieChildrens.FirstOrDefault(r => r.show_id == show_id));
    [HttpGet("GetMovieComedies")] public IActionResult GetMovieComedies([FromQuery] string show_id) => ReturnRawShowIds(_recommendationContext.MovieComedies.FirstOrDefault(r => r.show_id == show_id));
    [HttpGet("GetMovieComediesDramaInternational")] public IActionResult GetMovieComediesDramaInternational([FromQuery] string show_id) => ReturnRawShowIds(_recommendationContext.MovieComediesDramaInternationals.FirstOrDefault(r => r.show_id == show_id));
    [HttpGet("GetMovieComediesInternational")] public IActionResult GetMovieComediesInternational([FromQuery] string show_id) => ReturnRawShowIds(_recommendationContext.MovieComediesInternationals.FirstOrDefault(r => r.show_id == show_id));
    [HttpGet("GetMovieDramas")] public IActionResult GetMovieDramas([FromQuery] string show_id) => ReturnRawShowIds(_recommendationContext.MovieDramas.FirstOrDefault(r => r.show_id == show_id));
    [HttpGet("GetMovieDramasInternational")] public IActionResult GetMovieDramasInternational([FromQuery] string show_id) => ReturnRawShowIds(_recommendationContext.MovieDramasInternationals.FirstOrDefault(r => r.show_id == show_id));
    [HttpGet("GetMovieDramasRomantic")] public IActionResult GetMovieDramasRomantic([FromQuery] string show_id) => ReturnRawShowIds(_recommendationContext.MovieDramasRomantics.FirstOrDefault(r => r.show_id == show_id));
    [HttpGet("GetMovieFamily")] public IActionResult GetMovieFamily([FromQuery] string show_id) => ReturnRawShowIds(_recommendationContext.MovieFamilies.FirstOrDefault(r => r.show_id == show_id));
    [HttpGet("GetMovieFantasy")] public IActionResult GetMovieFantasy([FromQuery] string show_id) => ReturnRawShowIds(_recommendationContext.MovieFantasies.FirstOrDefault(r => r.show_id == show_id));
    [HttpGet("GetMovieHorror")] public IActionResult GetMovieHorror([FromQuery] string show_id) => ReturnRawShowIds(_recommendationContext.MovieHorrors.FirstOrDefault(r => r.show_id == show_id));
    [HttpGet("GetMovieInternationalThrillers")] public IActionResult GetMovieInternationalThrillers([FromQuery] string show_id) => ReturnRawShowIds(_recommendationContext.MovieInternationalThrillers.FirstOrDefault(r => r.show_id == show_id));
    [HttpGet("GetMovieMusicals")] public IActionResult GetMovieMusicals([FromQuery] string show_id) => ReturnRawShowIds(_recommendationContext.MovieMusicals.FirstOrDefault(r => r.show_id == show_id));
    [HttpGet("GetMovieSpirituality")] public IActionResult GetMovieSpirituality([FromQuery] string show_id) => ReturnRawShowIds(_recommendationContext.MovieSpiritualities.FirstOrDefault(r => r.show_id == show_id));
    [HttpGet("GetMovieThrillers")] public IActionResult GetMovieThrillers([FromQuery] string show_id) => ReturnRawShowIds(_recommendationContext.MovieThrillers.FirstOrDefault(r => r.show_id == show_id));

    // TV SHOWS
    [HttpGet("GetTvShowAction")] public IActionResult GetTvShowAction([FromQuery] string show_id) => ReturnRawShowIds(_recommendationContext.TvShowActions.FirstOrDefault(r => r.show_id == show_id));
    [HttpGet("GetTvShowAdventure")] public IActionResult GetTvShowAdventure([FromQuery] string show_id) => ReturnRawShowIds(_recommendationContext.TvShowAdventures.FirstOrDefault(r => r.show_id == show_id));
    [HttpGet("GetTvShowAnimeInternational")] public IActionResult GetTvShowAnimeInternational([FromQuery] string show_id) => ReturnRawShowIds(_recommendationContext.TvShowAnimeInternationals.FirstOrDefault(r => r.show_id == show_id));
    [HttpGet("GetTvShowComedies")] public IActionResult GetTvShowComedies([FromQuery] string show_id) => ReturnRawShowIds(_recommendationContext.TvShowComedies.FirstOrDefault(r => r.show_id == show_id));
    [HttpGet("GetTvShowCrimeDocuseries")] public IActionResult GetTvShowCrimeDocuseries([FromQuery] string show_id) => ReturnRawShowIds(_recommendationContext.TvShowCrimeDocuseries.FirstOrDefault(r => r.show_id == show_id));
    [HttpGet("GetTvShowDocuseries")] public IActionResult GetTvShowDocuseries([FromQuery] string show_id) => ReturnRawShowIds(_recommendationContext.TvShowDocuseries.FirstOrDefault(r => r.show_id == show_id));
    [HttpGet("GetTvShowDramas")] public IActionResult GetTvShowDramas([FromQuery] string show_id) => ReturnRawShowIds(_recommendationContext.TvShowDramas.FirstOrDefault(r => r.show_id == show_id));
    [HttpGet("GetTvShowFantasy")] public IActionResult GetTvShowFantasy([FromQuery] string show_id) => ReturnRawShowIds(_recommendationContext.TvShowFantasies.FirstOrDefault(r => r.show_id == show_id));
    [HttpGet("GetTvShowInternationalRomanticDrama")] public IActionResult GetTvShowInternationalRomanticDrama([FromQuery] string show_id) => ReturnRawShowIds(_recommendationContext.TvShowInternationalRomanticDramas.FirstOrDefault(r => r.show_id == show_id));
    [HttpGet("GetTvShowKids")] public IActionResult GetTvShowKids([FromQuery] string show_id) => ReturnRawShowIds(_recommendationContext.TvShowKids.FirstOrDefault(r => r.show_id == show_id));
    [HttpGet("GetTvShowLanguage")] public IActionResult GetTvShowLanguage([FromQuery] string show_id) => ReturnRawShowIds(_recommendationContext.TvShowLanguages.FirstOrDefault(r => r.show_id == show_id));
    [HttpGet("GetTvShowNature")] public IActionResult GetTvShowNature([FromQuery] string show_id) => ReturnRawShowIds(_recommendationContext.TvShowNatures.FirstOrDefault(r => r.show_id == show_id));
    [HttpGet("GetTvShowReality")] public IActionResult GetTvShowReality([FromQuery] string show_id) => ReturnRawShowIds(_recommendationContext.TvShowRealities.FirstOrDefault(r => r.show_id == show_id));
    [HttpGet("GetTvShowThriller")] public IActionResult GetTvShowThriller([FromQuery] string show_id) => ReturnRawShowIds(_recommendationContext.TvShowThrillers.FirstOrDefault(r => r.show_id == show_id));

    [HttpGet("GetWatchedTitles")]
    public IActionResult GetWatchedTitles()
    {
        var loginEmail = User.FindFirst(ClaimTypes.Email)?.Value ?? User.Identity?.Name;

        if (string.IsNullOrEmpty(loginEmail))
        {
            return Unauthorized("No authenticated user found.");
        }

        var user = _context.MoviesUsers.FirstOrDefault(u => u.Email == loginEmail);
        if (user == null)
        {
            return NotFound("User not found in movies_users table.");
        }

        var showIds = _context.MoviesRatings
            .Where(r => r.UserId == user.UserId)
            .Select(r => r.ShowId)
            .ToList();

        return Ok(showIds);
    }

    [HttpGet("GetShowId")] public IActionResult GetShowId([FromQuery] string show_id)
    { 
        var rec = _recommendationContext.ShowRecommendations.FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec); 
    }
}
