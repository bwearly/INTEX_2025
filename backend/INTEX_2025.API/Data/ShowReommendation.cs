using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace INTEX_2025.API.Data;

[Table("show_recommendations")]
public class ShowRecommendation
{
    [Key]
    public string show_id { get; set; }
    public string If_you_liked { get; set; }
    public string Recommendation1 { get; set; }
    public string Recommendation2 { get; set; }
    public string Recommendation3 { get; set; }
    public string Recommendation4 { get; set; }
    public string Recommendation5 { get; set; }
}