using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Graph;

namespace DreamlandHouse.API.Controllers
{
    [Authorize]
    public class GraphController : BaseController
    {
        private readonly GraphServiceClient _graphClient;

        public GraphController(GraphServiceClient graphClient)
        {
            _graphClient = graphClient;
        }

        [HttpGet("Profile")]
        public async Task<IActionResult> ProfilePicture()
        {
            var photoStream = await _graphClient.Me.Photo.Content.Request().GetAsync();
            byte[] photoByte = ((MemoryStream)photoStream).ToArray();

            return Ok(Convert.ToBase64String(photoByte));
        }

    }
}
