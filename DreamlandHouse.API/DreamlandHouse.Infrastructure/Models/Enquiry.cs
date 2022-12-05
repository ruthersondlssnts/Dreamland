using System.ComponentModel.DataAnnotations;
using DreamlandHouse.Services.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace DreamlandHouse.Services.Models;

[Index(nameof(ReferenceNumber))]
public class Enquiry
{
	[Key]
	public int Id { get; set; }
	[Required]
	public string Firstname { get; set; } = string.Empty;
	[Required]
	public string Lastname { get; set; } = string.Empty;
	[Required]
	[EmailAddress]
	public string Email { get; set; } = string.Empty;
	[Required]
	public string Country { get; set; } = string.Empty;
	public string ReferenceNumber { get; set; } = string.Empty;
	public ApartmentType? ApartmentType { get; set; }
	public int? LocationId { get; set; }
	public int? ProjectId { get; set; }
	[Range(0, 30)]
	public int? Bedrooms { get; set; }
	public string Message { get; set; } = string.Empty;
	public DateTime DateCreated { get; set; } = DateTime.Now;
}