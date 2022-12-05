using DreamlandHouse.Services.Models;
using DreamlandHouse.Services.Models.DTOs;
using DreamlandHouse.Services.Models.Enums;
using DreamlandHouse.Services.Models.Services;

namespace DreamlandHouse.API.Services.Interfaces;

public interface IApartmentRepository
{
	Task<(IEnumerable<Apartment>, PaginationMetadata)> GetPaginatedAsync(ApartmentGetRequestDTO apartmentQuery);
	Task<bool> SaveChangesAsync();
	Task<IEnumerable<ApartmentDemandDTO>?> ApartmentGetDemandAsync(ChartTimescale timescale, string refNo);
	Task CreateAsync(Apartment apartment);
	Task<Apartment?> GetApartmentAsync(int id);
}