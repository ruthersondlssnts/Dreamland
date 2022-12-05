using System.ComponentModel.DataAnnotations;
using DreamlandHouse.Services.Models.Enums;

namespace DreamlandHouse.Services.Models;

public class Blog
{
	[Key]
	public int Id { get; set; }
	[Required]
	public string Title { get; set; } = string.Empty;
	[Required]
	public DateTime DateCreated { get; set; } = DateTime.Now;
	[Required]
	public string Description { get; set; } = string.Empty;
	[Required]
	public string Author { get; set; } = string.Empty;
	[Required]
	public string ImagePath { get; set; } = string.Empty;
	[Required]
	public string Tags { get; set; } = string.Empty; //comma separated
}