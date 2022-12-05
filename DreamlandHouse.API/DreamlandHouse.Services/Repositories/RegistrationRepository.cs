using DreamlandHouse.API.Services.Interfaces;
using DreamlandHouse.Services.Data;
using DreamlandHouse.Services.Models;
using Microsoft.EntityFrameworkCore;

namespace DreamlandHouse.API.Services.Repositories;

public class RegistrationRepository : IRegistrationRepository
{
	private readonly DreamlandHouseDbContext _context;

	public RegistrationRepository(DreamlandHouseDbContext context)
	{
		_context = context ?? throw new ArgumentNullException(nameof(context));
	}

	public async Task<IEnumerable<Registration>> GetAllAsync()
	{
		return await _context.Registrations.ToListAsync();
	}

	public async Task CreateAsync(Registration registration)
	{
		await _context.Registrations.AddAsync(registration);
	}


	public async Task<bool> SaveChangesAsync()
	{
		return (await _context.SaveChangesAsync() >= 0);
	}
}
