using DreamlandHouse.API.Services.Interfaces;
using DreamlandHouse.Services.Data;
using DreamlandHouse.Services.Models;
using Microsoft.EntityFrameworkCore;

namespace DreamlandHouse.API.Services.Repositories;

public class BlogRepository : IBlogRepository
{
	private readonly DreamlandHouseDbContext _context;

	public BlogRepository(DreamlandHouseDbContext context)
	{
		_context = context ?? throw new ArgumentNullException(nameof(context));
	}

	public async Task<IEnumerable<Blog>> GetAllAsync()
	{
		return await _context.Blogs.ToListAsync();
	}
	public async Task<Blog?> GetBlog(int id)
	{
		var blog = await _context.Blogs
			.Where(a => a.Id == id)
			.FirstOrDefaultAsync();

		return blog;
	}
}
