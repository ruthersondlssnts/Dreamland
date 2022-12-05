

using System.ComponentModel.DataAnnotations;
using DreamlandHouse.Services.Models.Enums;
using Microsoft.AspNetCore.Http;

namespace DreamlandHouse.Services.Models.DTOs;

public class ApartmentGetRequestDTO
{
	public ApartmentGetRequestDTO()
	{

	}

	public int? startPrice { get; set; }
	public int? endPrice { get; set; }
	public int[]? locationIds { get; set; }
	public int[]? projectIds { get; set; }
	public int? type { get; set; }
	public int? bedrooms { get; set; }
	public int pageNumber { get; set; } = 1;
	public int pageSize { get; set; } = 9;
}