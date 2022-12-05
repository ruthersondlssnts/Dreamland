using DreamlandHouse.Services.Models;

namespace DreamlandHouse.API.Services.Interfaces;

public interface IContactRepository
{
	Task CreateAsync(Contact enquiry);
	Task<bool> SaveChangesAsync();
}