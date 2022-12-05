using DreamlandHouse.API.Services.Interfaces;
using DreamlandHouse.Services.Data;
using DreamlandHouse.Services.Models;

namespace DreamlandHouse.API.Services.Repositories;

public class EnquiryRepository : IEnquiryRepository
{
	private readonly DreamlandHouseDbContext _context;

	public EnquiryRepository(DreamlandHouseDbContext context)
	{
		_context = context ?? throw new ArgumentNullException(nameof(context));
	}

	public async Task CreateAsync(Enquiry enquiry)
	{
		await _context.Enquiries.AddAsync(enquiry);
	}

	public async Task<bool> SaveChangesAsync()
	{
		return (await _context.SaveChangesAsync() >= 0);
	}
}
