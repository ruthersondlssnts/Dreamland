using DreamlandHouse.API.Services.Interfaces;
using DreamlandHouse.Services.Data;
using DreamlandHouse.Services.Models;

namespace DreamlandHouse.API.Services.Repositories;

public class ContactRepository : IContactRepository
{
	private readonly DreamlandHouseDbContext _context;

	public ContactRepository(DreamlandHouseDbContext context)
	{
		_context = context ?? throw new ArgumentNullException(nameof(context));
	}

	public async Task CreateAsync(Contact contact)
	{
		await _context.Contacts.AddAsync(contact);
	}

	public async Task<bool> SaveChangesAsync()
	{
		return (await _context.SaveChangesAsync() >= 0);
	}
}
