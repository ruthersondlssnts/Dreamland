using DreamlandHouse.API.Services.Interfaces;
using DreamlandHouse.Services.Data;
using DreamlandHouse.Services.Models;
using DreamlandHouse.Services.Models.DTOs;
using DreamlandHouse.Services.Models.Enums;
using DreamlandHouse.Services.Models.Services;
using Microsoft.EntityFrameworkCore;

namespace DreamlandHouse.API.Services.Repositories;

public class ApartmentRepository : IApartmentRepository
{
	private readonly DreamlandHouseDbContext _context;

	public ApartmentRepository(DreamlandHouseDbContext context)
	{
		_context = context ?? throw new ArgumentNullException(nameof(context));
	}


	public async Task<Apartment?> GetApartmentAsync(int id)
	{
		var apartment = await _context.Apartments
			.Include(a => a.Project)
			.ThenInclude(p => p.Location)
			.Where(a => a.Id == id)
			.FirstOrDefaultAsync();

		return apartment;
	}
 
    public async Task<IEnumerable<ApartmentDemandDTO>?> ApartmentGetDemandAsync(ChartTimescale timescale, string refNo)
	{
		switch (timescale)
		{
			case ChartTimescale.FiveDays:
				return await _context.Enquiries
					.Where(e => e.ReferenceNumber == refNo &&
						e.DateCreated.Date >= DateTime.Today.Date.AddDays(-5) &&
						e.DateCreated.Date <= DateTime.Today.Date)
					.GroupBy(g => g.DateCreated.Date)
						.Select(n => new ApartmentDemandDTO
						{
							DateTime = n.Key,
							Count = n.Count(),
							Timescale = ChartTimescale.FiveDays
						}).ToListAsync();
			case ChartTimescale.OneMonth:
				return await _context.Enquiries
					.Where(e => e.ReferenceNumber == refNo &&
						e.DateCreated.Date >= DateTime.Today.Date.AddMonths(-1) &&
						e.DateCreated.Date <= DateTime.Today.Date)
					.GroupBy(g => g.DateCreated.Date)
						.Select(n => new ApartmentDemandDTO
						{
							DateTime = n.Key,
							Count = n.Count(),
							Timescale = ChartTimescale.OneMonth
						}).ToListAsync();
			case ChartTimescale.SixMonths:
				return await _context.Enquiries
					.Where(e => e.ReferenceNumber == refNo &&
						e.DateCreated.Date >= DateTime.Today.Date.AddMonths(-6) &&
						e.DateCreated.Date <= DateTime.Today.Date)
					.GroupBy(g => g.DateCreated.Date)
						.Select(n => new ApartmentDemandDTO
						{
							DateTime = n.Key,
							Count = n.Count(),
							Timescale = ChartTimescale.Max
						}).ToListAsync();
			case ChartTimescale.YearToDate:
				return await _context.Enquiries
					.Where(e => e.ReferenceNumber == refNo &&
						e.DateCreated.Year == DateTime.Today.Year)
					.GroupBy(g => g.DateCreated.Date)
						.Select(n => new ApartmentDemandDTO
						{
							DateTime = n.Key,
							Count = n.Count(),
							Timescale = ChartTimescale.YearToDate
						}).ToListAsync();
			case ChartTimescale.Max:
				return await _context.Enquiries.Where(e => e.ReferenceNumber == refNo)
					.GroupBy(g => g.DateCreated.Date)
						.Select(n => new ApartmentDemandDTO
						{
							DateTime = n.Key,
							Count = n.Count(),
							Timescale = ChartTimescale.Max
						}).ToListAsync();
			default:
				return null;
		}
	}

	public async Task<(IEnumerable<Apartment>, PaginationMetadata)> GetPaginatedAsync(ApartmentGetRequestDTO apartmentQuery)
	{
		int pageSize = apartmentQuery.pageSize;
		int pageNumber = apartmentQuery.pageNumber;
		// collection to start from
		var collection = _context.Apartments
			.Include(a => a.Project)
			.ThenInclude(a => a.Location)
			as IQueryable<Apartment>;

		if (apartmentQuery.startPrice != null)
		{
			collection = collection.Where(a => a.Price >= apartmentQuery.startPrice &&
				(apartmentQuery.endPrice != null ? a.Price <= apartmentQuery.endPrice : true));
		}

		if (apartmentQuery.bedrooms != null)
		{
			collection = collection.Where(a => a.Bedrooms == apartmentQuery.bedrooms);
		}

		if (apartmentQuery.type != null)
		{
			collection = collection.Where(a => a.Type == (ApartmentType)apartmentQuery.type);
		}

		if (apartmentQuery.projectIds != null || apartmentQuery.locationIds != null)
		{
			collection = collection.Where(a =>
				(apartmentQuery.projectIds != null ? apartmentQuery.projectIds.Contains(a.ProjectId) : false) ||
				(apartmentQuery.locationIds != null ? apartmentQuery.locationIds.Contains(a.Project.LocationId) : false));
		}

		var totalItemCount = await collection.CountAsync();

		var paginationMetadata = new PaginationMetadata(
			totalItemCount, pageSize, pageNumber);

		var collectionToReturn = await collection.OrderBy(a=>a.Id)
			.Skip(pageSize * (pageNumber - 1))
			.Take(pageSize)
			.ToListAsync();

		return (collectionToReturn, paginationMetadata);
	}

	public async Task CreateAsync(Apartment apartment)
	{
		await _context.Apartments.AddAsync(apartment);
	}

	public async Task<bool> SaveChangesAsync()
	{
		return (await _context.SaveChangesAsync() >= 0);
	}
}
