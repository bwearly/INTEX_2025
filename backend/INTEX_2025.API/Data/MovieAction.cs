using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace INTEX_2025.API.Data;

[Table("Movie_Action")]
public class MovieAction
{
    [Key]
    public string show_id { get; set; }
    public string If_you_liked { get; set; }
    public string Recommendation1 { get; set; }
    public string Recommendation2 { get; set; }
    public string Recommendation3 { get; set; }
    public string Recommendation4 { get; set; }
    public string Recommendation5 { get; set; }
    public string Recommendation6 { get; set; }
    public string Recommendation7 { get; set; }
    public string Recommendation8 { get; set; }
    public string Recommendation9 { get; set; }
    public string Recommendation10 { get; set; }
    public string Recommendation11 { get; set; }
    public string Recommendation12 { get; set; }
    public string Recommendation13 { get; set; }
    public string Recommendation14 { get; set; }
    public string Recommendation15 { get; set; }
    public string Recommendation16 { get; set; }
    public string Recommendation17 { get; set; }
    public string Recommendation18 { get; set; }
    public string Recommendation19 { get; set; }
    public string Recommendation20 { get; set; }
}