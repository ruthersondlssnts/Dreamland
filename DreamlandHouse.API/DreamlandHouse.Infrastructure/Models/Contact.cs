using System.ComponentModel.DataAnnotations;
using DreamlandHouse.Services.Models.Enums;

namespace DreamlandHouse.Services.Models;

public class Contact
{
	[Key]
	public int Id { get; set; }
	[Required]
	public string Name { get; set; } = string.Empty;
	[EmailAddress]
	[Required]
	public string Email { get; set; } = string.Empty;
	[Required]
	public string Message { get; set; } = string.Empty;
}