using Microsoft.EntityFrameworkCore;

namespace INTEX_2025.API.Data;

public class RecommendationsDbContext : DbContext
{


public RecommendationsDbContext(DbContextOptions<RecommendationsDbContext> options): base(options)
    {
    
    }

public DbSet<ShowRecommendation> ShowRecommendations { get; set; }
public DbSet<MovieAction> MovieActions { get; set; }
public DbSet<MovieAdventure> MovieAdventures { get; set; }
public DbSet<MovieChildren> MovieChildrens { get; set; }
public DbSet<MovieComedies> MovieComedies { get; set; }
public DbSet<MovieComediesDramaInternational> MovieComediesDramaInternationals { get; set; }
public DbSet<MovieComediesInternational> MovieComediesInternationals { get; set; }
public DbSet<MovieDocumentaries> MovieDocumentaries { get; set; }
public DbSet<MovieDocumentariesInternational> MovieDocumentariesInternationals { get; set; }
public DbSet<MovieDramas> MovieDramas { get; set; }
public DbSet<MovieDramasInternational> MovieDramasInternationals { get; set; }
public DbSet<MovieDramasRomantic> MovieDramasRomantics { get; set; }
public DbSet<MovieFamily> MovieFamilies { get; set; }
public DbSet<MovieFantasy> MovieFantasies { get; set; }
public DbSet<MovieHorror> MovieHorrors { get; set; }
public DbSet<MovieInternationalThrillers> MovieInternationalThrillers { get; set; }
public DbSet<MovieMusicals> MovieMusicals { get; set; }
public DbSet<MovieSpirituality> MovieSpiritualities { get; set; }
public DbSet<MovieThrillers> MovieThrillers { get; set; }
public DbSet<TvShowAction> TvShowActions { get; set; }
public DbSet<TvShowAdventure> TvShowAdventures { get; set; }
public DbSet<TvShowAnimeInternational> TvShowAnimeInternationals { get; set; }
public DbSet<TvShowComedies> TvShowComedies { get; set; }
public DbSet<TvShowCrimeDocuseries> TvShowCrimeDocuseries { get; set; }
public DbSet<TvShowDocuseries> TvShowDocuseries { get; set; }
public DbSet<TvShowDramas> TvShowDramas { get; set; }
public DbSet<TvShowFantasy> TvShowFantasies { get; set; }
public DbSet<TvShowInternationalRomanticDrama> TvShowInternationalRomanticDramas { get; set; }
public DbSet<TvShowKids> TvShowKids { get; set; }
public DbSet<TvShowLanguage> TvShowLanguages { get; set; }
public DbSet<TvShowNature> TvShowNatures { get; set; }
public DbSet<TvShowReality> TvShowRealities { get; set; }
public DbSet<TvShowThriller> TvShowThrillers { get; set; }

    
}