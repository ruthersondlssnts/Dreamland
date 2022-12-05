
using DreamlandHouse.API.Services.Interfaces;
using DreamlandHouse.Services.Models;
using Microsoft.AspNetCore.Mvc;

namespace DreamlandHouse.API.Controllers;

public class BlogsController : BaseController
{
	private readonly IBlogRepository _repository;

	private readonly ILogger<BlogsController> _logger;
	public BlogsController(IBlogRepository repository, ILogger<BlogsController> logger)
	{
		_repository = repository;
		_logger = logger;
	}

	[HttpGet]
	public async Task<IActionResult> GetAllBlogs()
	{
        _logger.LogInformation("Getting all blogs");

        var blogs = await _repository.GetAllAsync();
		return Ok(blogs);
	}

	[HttpGet("{id}")]
	public async Task<ActionResult> GetBlog(int id)
	{
		var blog = await _repository.GetBlog(id);
		if (blog == null)
		{
			_logger.LogWarning("Blog with id {0} wasn't found when accessing", id);
			return NotFound();
		}

		return Ok(blog);
	}
}
