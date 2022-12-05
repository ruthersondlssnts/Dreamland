using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DreamlandHouse.Services.Models;

public class Project
{
	[Key]
	public int Id { get; set; }
	[Required]
	public string Name { get; set; } = string.Empty;
	[Required]
	public string Description { get; set; } = string.Empty;
	[Required]
	public string ImagePath { get; set; } = string.Empty;
	[Required]
	public int LocationId { get; set; }
	[ForeignKey("LocationId")]
	public virtual Location Location { get; set; } = null!;
}