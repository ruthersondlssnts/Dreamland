using DreamlandHouse.API.Services.Interfaces;
using DreamlandHouse.Services.Data;
using DreamlandHouse.Services.Models;
using Microsoft.EntityFrameworkCore;

namespace DreamlandHouse.API.Services.Repositories;

public class ProjectRepository : IProjectRepository
{
	private readonly DreamlandHouseDbContext _context;

	public ProjectRepository(DreamlandHouseDbContext context)
	{
		_context = context ?? throw new ArgumentNullException(nameof(context));
	}

	public async Task<(IEnumerable<Project>, IEnumerable<Location>)> GetAllProjectsAndLocationsAsync()
	{
		var projects = await _context.Projects.Include(p => p.Location).ToListAsync();
		var locations = await _context.Locations.ToListAsync();
		return (projects, locations);
	}
}
