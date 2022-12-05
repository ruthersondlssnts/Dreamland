using DreamlandHouse.Services.Models;

namespace DreamlandHouse.API.Services.Interfaces;

public interface IBlogRepository
{
	Task<IEnumerable<Blog>> GetAllAsync();
	Task<Blog?> GetBlog(int id);
}