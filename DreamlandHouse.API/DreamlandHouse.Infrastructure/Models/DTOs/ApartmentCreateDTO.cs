using System.ComponentModel.DataAnnotations;
using DreamlandHouse.Services.Models.Enums;
using Microsoft.AspNetCore.Http;

namespace DreamlandHouse.Services.Models.DTOs;

public class ApartmentCreateDTO
{
	[Required]
	public string ReferenceNumber { get; set; } = string.Empty;
	[Required]
	public ApartmentType Type { get; set; }
	[Required]
	public string Name { get; set; } = string.Empty;
	[Required]
	public double Price { get; set; }
	[Required]
	public string Address { get; set; } = string.Empty;
	[Required]
	public string Description { get; set; } = string.Empty;
	[Required]
	public int Bedrooms { get; set; }
	[Required]
	public int Bathrooms { get; set; }
	[Required]
	public int SquareFoot { get; set; }
	[Required]
	public string Amenities { get; set; } = string.Empty; //comma separated
	public string ImagePaths { get; set; } = string.Empty; //comma separated
	[Required]
	public int ProjectId { get; set; }
	[Required]
	public List<IFormFile> Photos { get; set; } = null!;
}