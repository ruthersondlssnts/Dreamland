using System.ComponentModel.DataAnnotations;
using DreamlandHouse.Services.Models.Enums;
using Microsoft.AspNetCore.Http;

namespace DreamlandHouse.Services.Models.DTOs;

public class ApartmentDetailDTO
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
	public string Amenities { get; set; } = string.Empty; //comma separated
	public string Location { get; set; } = string.Empty;
	public string Address { get; set; } = string.Empty;
	public string Project { get; set; } = string.Empty;
	public string Description { get; set; } = string.Empty;
	public int LocationId { get; set; }
	public int ProjectId { get; set; }
	public int ApartmentTypeId { get; set; }
}