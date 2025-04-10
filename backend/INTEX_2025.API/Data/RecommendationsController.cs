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

    [HttpGet("GetShowId")]
    public IActionResult GetShowId([FromQuery] string show_id)
    {
        var rec = _recommendationContext.ShowRecommendations
            .FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec);
    }
    
    [HttpGet("GetMovieAction")]
    public IActionResult GetMovieAction([FromQuery] string show_id)
    {
        var rec = _recommendationContext.MovieActions
            .FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec);
    }
    
    [HttpGet("GetMovieAdventure")]
    public IActionResult GetMovieAdventure([FromQuery] string show_id)
    {
        var rec = _recommendationContext.MovieAdventures
            .FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec);
    }
    
    [HttpGet("GetMovieChildren")]
    public IActionResult GetMovieChildren([FromQuery] string show_id)
    {
        var rec = _recommendationContext.MovieChildrens
            .FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec);
    }
    
    [HttpGet("GetMovieComedies")]
    public IActionResult GetMovieComedies([FromQuery] string show_id)
    {
        var rec = _recommendationContext.MovieComedies
            .FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec);
    }
    
    [HttpGet("GetMovieComediesDramaInternational")]
    public IActionResult GetMovieComediesDramaInternational([FromQuery] string show_id)
    {
        var rec = _recommendationContext.MovieComediesDramaInternationals
            .FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec);
    }
    
    
    [HttpGet("GetMovieComediesInternational")]
    public IActionResult GetMovieComediesInternational([FromQuery] string show_id)
    {
        var rec = _recommendationContext.MovieComediesInternationals
            .FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec);
    }
    
    [HttpGet("GetMovieDocumentaries")]
    public IActionResult GetMovieDocumentaries([FromQuery] string show_id)
    {
        var rec = _recommendationContext.MovieDocumentaries
            .FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec);
    }
    
    [HttpGet("GetMovieDramas")]
    public IActionResult GetMovieDramas([FromQuery] string show_id)
    {
        var rec = _recommendationContext.MovieDramas
            .FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec);
    }
    
    [HttpGet("GetMovieDramasInternational")]
    public IActionResult GetMovieDramasInternational([FromQuery] string show_id)
    {
        var rec = _recommendationContext.MovieDramasInternationals
            .FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec);
    }
    
    [HttpGet("GetMovieDramasRomantic")]
    public IActionResult GetMovieDramasRomantic([FromQuery] string show_id)
    {
        var rec = _recommendationContext.MovieDramasRomantics
            .FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec);
    }
    
    [HttpGet("GetMovieFamily")]
    public IActionResult GetMovieFamily([FromQuery] string show_id)
    {
        var rec = _recommendationContext.MovieFamilies
            .FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec);
    }
    
    [HttpGet("GetMovieFantasy")]
    public IActionResult GetMovieFantasy([FromQuery] string show_id)
    {
        var rec = _recommendationContext.MovieFantasies
            .FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec);
    }
    
    [HttpGet("GetMovieHorror")]
    public IActionResult GetMovieHorror([FromQuery] string show_id)
    {
        var rec = _recommendationContext.MovieHorrors
            .FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec);
    }
    
    [HttpGet("GetMovieInternationalThrillers")]
    public IActionResult GetMovieInternationalThrillers([FromQuery] string show_id)
    {
        var rec = _recommendationContext.MovieInternationalThrillers
            .FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec);
    }
    
    [HttpGet("GetMovieMusicals")]
    public IActionResult GetMovieMusicals([FromQuery] string show_id)
    {
        var rec = _recommendationContext.MovieMusicals
            .FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec);
    }
    
    [HttpGet("GetMovieSpirituality")]
    public IActionResult GetMovieSpirituality([FromQuery] string show_id)
    {
        var rec = _recommendationContext.MovieSpiritualities
            .FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec);
    }
    
    [HttpGet("GetMovieThrillers")]
    public IActionResult GetMovieThrillers([FromQuery] string show_id)
    {
        var rec = _recommendationContext.MovieThrillers
            .FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec);
    }
    
    [HttpGet("GetTvShowAction")]
    public IActionResult GetTvShowAction([FromQuery] string show_id)
    {
        var rec = _recommendationContext.TvShowActions
            .FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec);
    }
    
    [HttpGet("GetTvShowAdventure")]
    public IActionResult GetTvShowAdventure([FromQuery] string show_id)
    {
        var rec = _recommendationContext.TvShowAdventures
            .FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec);
    }
    
    [HttpGet("GetTvShowAnimeInternational")]
    public IActionResult GetTvShowAnimeInternational([FromQuery] string show_id)
    {
        var rec = _recommendationContext.TvShowAnimeInternationals
            .FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec);
    }
    
    [HttpGet("GetTvShowComedies")]
    public IActionResult GetTvShowComedies([FromQuery] string show_id)
    {
        var rec = _recommendationContext.TvShowComedies
            .FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec);
    }
    
    [HttpGet("GetTvShowCrimeDocuseries")]
    public IActionResult GetTvShowCrimeDocuseries([FromQuery] string show_id)
    {
        var rec = _recommendationContext.TvShowCrimeDocuseries
            .FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec);
    }
    
    [HttpGet("GetTvShowDocuseries")]
    public IActionResult GetTvShowDocuseries([FromQuery] string show_id)
    {
        var rec = _recommendationContext.TvShowDocuseries
            .FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec);
    }
    
    [HttpGet("GetTvShowDramas")]
    public IActionResult GetTvShowDramas([FromQuery] string show_id)
    {
        var rec = _recommendationContext.TvShowDramas
            .FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec);
    }
    
    [HttpGet("GetTvShowFantasy")]
    public IActionResult GetTvShowFantasy([FromQuery] string show_id)
    {
        var rec = _recommendationContext.TvShowFantasies
            .FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec);
    }
    
    [HttpGet("GetTvShowInternationalRomanticDrama")]
    public IActionResult GetTvShowInternationalRomanticDrama([FromQuery] string show_id)
    {
        var rec = _recommendationContext.TvShowInternationalRomanticDramas
            .FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec);
    }
    
    [HttpGet("GetTvShowKids")]
    public IActionResult GetTvShowKids([FromQuery] string show_id)
    {
        var rec = _recommendationContext.TvShowKids
            .FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec);
    }
    
    [HttpGet("GetTvShowLanguage")]
    public IActionResult GetTvShowLanguage([FromQuery] string show_id)
    {
        var rec = _recommendationContext.TvShowLanguages
            .FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec);
    }
    
    [HttpGet("GetTvShowNature")]
    public IActionResult GetTvShowNature([FromQuery] string show_id)
    {
        var rec = _recommendationContext.TvShowNatures
            .FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec);
    }
    
    [HttpGet("GetTvShowReality")]
    public IActionResult GetTvShowReality([FromQuery] string show_id)
    {
        var rec = _recommendationContext.TvShowRealities
            .FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec);
    }
    
    [HttpGet("GetTvShowThriller")]
    public IActionResult GetTvShowThriller([FromQuery] string show_id)
    {
        var rec = _recommendationContext.TvShowThrillers
            .FirstOrDefault(r => r.show_id == show_id);
        return Ok(rec);
    }

    [HttpGet("GetUserRecommendations")]
public IActionResult GetUserRecommendations([FromQuery] string email)
{
    var user = _context.MoviesUsers.FirstOrDefault(u => u.Email == email);
    if (user == null) return NotFound("User not found");

    var userShowIds = _context.MoviesRatings
        .Where(r => r.UserId == user.UserId)
        .Select(r => r.ShowId)
        .ToList();

    var recommendationsByShowId = new Dictionary<string, List<MoviesTitle>>();

    // All your recommendation table lookups
    var tables = new List<Func<string, object?>>
    {
        sid => _recommendationContext.MovieActions.FirstOrDefault(m => m.show_id == sid),
        sid => _recommendationContext.MovieAdventures.FirstOrDefault(m => m.show_id == sid),
        sid => _recommendationContext.MovieChildrens.FirstOrDefault(m => m.show_id == sid),
        sid => _recommendationContext.MovieComedies.FirstOrDefault(m => m.show_id == sid),
        sid => _recommendationContext.MovieComediesDramaInternationals.FirstOrDefault(m => m.show_id == sid),
        sid => _recommendationContext.MovieComediesInternationals.FirstOrDefault(m => m.show_id == sid),
        sid => _recommendationContext.MovieDocumentaries.FirstOrDefault(m => m.show_id == sid),
        sid => _recommendationContext.MovieDocumentariesInternationals.FirstOrDefault(m => m.show_id == sid),
        sid => _recommendationContext.MovieDramas.FirstOrDefault(m => m.show_id == sid),
        sid => _recommendationContext.MovieDramasInternationals.FirstOrDefault(m => m.show_id == sid),
        sid => _recommendationContext.MovieDramasRomantics.FirstOrDefault(m => m.show_id == sid),
        sid => _recommendationContext.MovieFamilies.FirstOrDefault(m => m.show_id == sid),
        sid => _recommendationContext.MovieFantasies.FirstOrDefault(m => m.show_id == sid),
        sid => _recommendationContext.MovieHorrors.FirstOrDefault(m => m.show_id == sid),
        sid => _recommendationContext.MovieInternationalThrillers.FirstOrDefault(m => m.show_id == sid),
        sid => _recommendationContext.MovieMusicals.FirstOrDefault(m => m.show_id == sid),
        sid => _recommendationContext.MovieSpiritualities.FirstOrDefault(m => m.show_id == sid),
        sid => _recommendationContext.MovieThrillers.FirstOrDefault(m => m.show_id == sid),
        sid => _recommendationContext.TvShowActions.FirstOrDefault(m => m.show_id == sid),
        sid => _recommendationContext.TvShowAdventures.FirstOrDefault(m => m.show_id == sid),
        sid => _recommendationContext.TvShowAnimeInternationals.FirstOrDefault(m => m.show_id == sid),
        sid => _recommendationContext.TvShowComedies.FirstOrDefault(m => m.show_id == sid),
        sid => _recommendationContext.TvShowCrimeDocuseries.FirstOrDefault(m => m.show_id == sid),
        sid => _recommendationContext.TvShowDocuseries.FirstOrDefault(m => m.show_id == sid),
        sid => _recommendationContext.TvShowDramas.FirstOrDefault(m => m.show_id == sid),
        sid => _recommendationContext.TvShowFantasies.FirstOrDefault(m => m.show_id == sid),
        sid => _recommendationContext.TvShowInternationalRomanticDramas.FirstOrDefault(m => m.show_id == sid),
        sid => _recommendationContext.TvShowKids.FirstOrDefault(m => m.show_id == sid),
        sid => _recommendationContext.TvShowLanguages.FirstOrDefault(m => m.show_id == sid),
        sid => _recommendationContext.TvShowNatures.FirstOrDefault(m => m.show_id == sid),
        sid => _recommendationContext.TvShowRealities.FirstOrDefault(m => m.show_id == sid),
        sid => _recommendationContext.TvShowThrillers.FirstOrDefault(m => m.show_id == sid),
        sid => _recommendationContext.ShowRecommendations.FirstOrDefault(m => m.show_id == sid)
    };

    foreach (var showId in userShowIds)
    {
        foreach (var table in tables)
        {
            var match = table(showId);
            if (match != null)
            {
                var recTitles = GetRecsFromObj(match);
                if (recTitles.Count > 0)
                {
                    var fullMovies = _context.MoviesTitles
                        .Where(m => recTitles.Contains(m.Title))
                        .ToList();

                    recommendationsByShowId[showId] = fullMovies;
                }

                break; 
            }
        }
    }

    return Ok(recommendationsByShowId);
}


    private List<string> GetRecsFromObj(object recObj)
    {
        var recs = new List<string>();

        var props = recObj.GetType().GetProperties()
            .Where(p => p.Name.StartsWith("Recommendation"));

        foreach (var prop in props)
        {
            var value = prop.GetValue(recObj)?.ToString();
            if (!string.IsNullOrEmpty(value))
            {
                recs.Add(value);
            }
        }

        return recs;
    }


    [HttpGet("GetWatchedTitles")]
    public IActionResult GetWatchedTitles()
    {
        // Step 1: Get email of logged-in user (from Identity)
        var loginEmail = User.FindFirst(ClaimTypes.Email)?.Value ?? User.Identity?.Name;

        if (string.IsNullOrEmpty(loginEmail))
        {
            return Unauthorized("No authenticated user found.");
        }

        // Step 2: Find matching user in movies_users table
        var user = _context.MoviesUsers.FirstOrDefault(u => u.Email == loginEmail);
        if (user == null)
        {
            return NotFound("User not found in movies_users table.");
        }

        // Step 3: Get all ShowIds they’ve rated
        var showIds = _context.MoviesRatings
            .Where(r => r.UserId == user.UserId)
            .Select(r => r.ShowId)
            .ToList();

        return Ok(showIds);
    }
}

