using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DreamlandHouse.Services.Models;
using DreamlandHouse.Services.Models.Enums;

namespace DreamlandHouse.Services.Models;

public class Apartment
{
	[Key]
	public int Id { get; set; }
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
	[Required]
	public string ImagePaths { get; set; } = string.Empty; //comma separated
	[ForeignKey("ProjectId")]
	public virtual Project Project { get; set; } = null!;
	[Required]
	public int ProjectId { get; set; }

}