using System;
using System.Collections.Generic;

namespace INTEX_2025.API.Data;

public partial class MoviesRating
{
    public int? UserId { get; set; }

    public string? ShowId { get; set; }

    public int? Rating { get; set; }
}
