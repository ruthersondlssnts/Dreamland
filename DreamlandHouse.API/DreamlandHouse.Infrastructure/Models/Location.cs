using System.ComponentModel.DataAnnotations;

namespace DreamlandHouse.Services.Models;

public class Location
{
	[Key]
	public int Id { get; set; }
	[Required]
	public string Name { get; set; } = string.Empty;
	[Required]
	public string Country { get; set; } = string.Empty;
}