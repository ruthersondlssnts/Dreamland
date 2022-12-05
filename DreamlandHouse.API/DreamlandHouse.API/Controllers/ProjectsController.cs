
using AutoMapper;
using DreamlandHouse.API.Services.Interfaces;
using DreamlandHouse.Services.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace DreamlandHouse.API.Controllers;

public class ProjectsController : BaseController
{
	private readonly IProjectRepository _repository;
	private readonly IMapper _mapper;

	public ProjectsController(IProjectRepository repository, IMapper mapper)
	{
		_repository = repository;
		_mapper = mapper;
	}

	[HttpGet("GetAllProjectsAndLocations")]
	public async Task<IActionResult> GetAllProjectsAndLocations()
	{
		var (projects, locations) = await _repository.GetAllProjectsAndLocationsAsync();

		return Ok(new ProjectLocationGetDTO
		{
			Locations = locations,
			Projects = projects
		});
	}
}
