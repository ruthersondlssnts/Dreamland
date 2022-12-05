using DreamlandHouse.Services.Models;

namespace DreamlandHouse.API.Services.Interfaces;

public interface IEnquiryRepository
{
	Task CreateAsync(Enquiry enquiry);
	Task<bool> SaveChangesAsync();
}