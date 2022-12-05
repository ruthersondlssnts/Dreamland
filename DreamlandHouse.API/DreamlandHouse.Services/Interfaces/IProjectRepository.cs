using DreamlandHouse.Services.Models;

namespace DreamlandHouse.API.Services.Interfaces;

public interface IProjectRepository
{
	Task<(IEnumerable<Project>, IEnumerable<Location>)> GetAllProjectsAndLocationsAsync();
}