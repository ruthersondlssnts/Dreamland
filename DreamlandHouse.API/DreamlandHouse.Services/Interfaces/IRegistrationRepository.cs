using DreamlandHouse.Services.Models;

namespace DreamlandHouse.API.Services.Interfaces;

public interface IRegistrationRepository
{
	Task CreateAsync(Registration registration);
	Task<IEnumerable<Registration>> GetAllAsync();
	Task<bool> SaveChangesAsync();
}