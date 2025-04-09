using INTEX_2025.API.Data;
using Microsoft.AspNetCore.Mvc;

namespace INTEX_2025.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RecommendationsController : ControllerBase
{
    private RecommendationsDbContext _recommendationContext;
    
    public RecommendationsController(RecommendationsDbContext temp)
    {
        _recommendationContext = temp;
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
}