using System.ComponentModel.DataAnnotations;
using DreamlandHouse.Services.Models.Enums;
using Microsoft.AspNetCore.Http;

namespace DreamlandHouse.Services.Models.DTOs;

public class ApartmentDemandDTO
{
	public DateTime DateTime { get; set; }
	public int Count { get; set; }
	public ChartTimescale Timescale { get; set; }
}