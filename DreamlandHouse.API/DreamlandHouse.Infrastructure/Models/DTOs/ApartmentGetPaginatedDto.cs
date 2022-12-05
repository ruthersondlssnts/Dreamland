using System.ComponentModel.DataAnnotations;
using DreamlandHouse.Services.Models.Enums;
using Microsoft.AspNetCore.Http;

namespace DreamlandHouse.Services.Models.DTOs;

public class ApartmentGetPaginatedDTO
{
	public int Id { get; set; }
	public string ReferenceNumber { get; set; } = string.Empty;
	public string Type { get; set; } = string.Empty;
	public string Name { get; set; } = string.Empty;
	public string Price { get; set; } = string.Empty;
	public int Bedrooms { get; set; }
	public int Bathrooms { get; set; }
	public int SquareFoot { get; set; }
	public string ImagePaths { get; set; } = string.Empty; //comma separated
	public string Location { get; set; } = string.Empty;
}