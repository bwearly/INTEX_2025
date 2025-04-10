using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace INTEX_2025.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class YoutubeController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IHttpClientFactory _httpClientFactory;

        public YoutubeController(IConfiguration config, IHttpClientFactory httpClientFactory)
        {
            _config = config;
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet("GetTrailer")]
        public async Task<IActionResult> GetTrailer([FromQuery] string title)
        {
            var apiKey = _config["YouTube:ApiKey"];
            var query = $"{title} official trailer";

            var client = _httpClientFactory.CreateClient();
            var url = $"https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q={Uri.EscapeDataString(query)}&key={apiKey}";

            var response = await client.GetAsync(url);
            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, "Failed to fetch trailer.");
            }

            var json = await response.Content.ReadFromJsonAsync<YoutubeResponse>();

            return Ok(json?.Items?.FirstOrDefault()?.Id?.VideoId);
        }
    }

    public class YoutubeResponse
    {
        public List<YoutubeItem> Items { get; set; }
    }

    public class YoutubeItem
    {
        public YoutubeVideoId Id { get; set; }
    }

    public class YoutubeVideoId
    {
        public string VideoId { get; set; }
    }

}
