using System.ComponentModel.DataAnnotations;
using DreamlandHouse.Services.Models.Enums;
using Microsoft.AspNetCore.Http;

namespace DreamlandHouse.Services.Models.DTOs;

public class ProjectLocationGetDTO
{
	public IEnumerable<Project> Projects { get; set; } = null!;
	public IEnumerable<Location> Locations { get; set; } = null!;
}