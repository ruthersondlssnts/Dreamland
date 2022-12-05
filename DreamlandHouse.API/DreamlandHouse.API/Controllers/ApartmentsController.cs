using System.Text.Json;
using AutoMapper;
using DreamlandHouse.API.Services.Interfaces;
using DreamlandHouse.Services.Models;
using DreamlandHouse.Services.Models.DTOs;
using DreamlandHouse.Services.Models.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DreamlandHouse.API.Controllers;

public class ApartmentsController : BaseController
{
	private readonly IApartmentRepository _repository;
	private readonly IMapper _mapper;
	private readonly IFileManager _fileManager;
	private readonly ILogger<ApartmentsController> _logger;
	private readonly IConfiguration _configuration;
    const int maxApartmentsPageSize = 20;

	public ApartmentsController(IApartmentRepository repository,
		IMapper mapper,
		IFileManager fileManager,
		IConfiguration configuration,
		ILogger<ApartmentsController> logger)
	{
		_repository = repository;
		_mapper = mapper;
		_fileManager = fileManager;
		_logger = logger;
		_configuration = configuration;
	}

	[HttpGet]
	public async Task<IActionResult> GetApartments([FromQuery] ApartmentGetRequestDTO apartmentQuery)
	{
        _logger.LogInformation("Getting paginated apartments");

        if (apartmentQuery.pageSize > maxApartmentsPageSize)
		{
			apartmentQuery.pageSize = maxApartmentsPageSize;
		}

		var (apartments, paginationMetadata) = await _repository
			.GetPaginatedAsync(apartmentQuery);

		Response.Headers.Add("X-Pagination",
			JsonSerializer.Serialize(paginationMetadata));

        return Ok(_mapper.Map<IEnumerable<ApartmentGetPaginatedDTO>>(apartments));
	}

	[HttpGet("GetApartmentDemand")]
	public async Task<ActionResult<IEnumerable<ApartmentDemandDTO>>> GetApartmentDemand(ChartTimescale timescale, string refNo)
	{
        _logger.LogInformation("Getting apartment demand of apartment {0}", refNo);

        var demands = await _repository.ApartmentGetDemandAsync(timescale, refNo);

		return Ok(demands);
	}

	[HttpGet("{id}")]
	public async Task<ActionResult> GetApartment(int id)
	{
		var apartment = await _repository.GetApartmentAsync(id);
		if (apartment == null)
		{
			_logger.LogWarning("Apartment with id {0} wasn't found when accessing", id);
			return NotFound();
		}

		return Ok(_mapper.Map<ApartmentDetailDTO>(apartment));
	}

	[Authorize]
	[HttpPost]
	public async Task<IActionResult> Create([FromForm] ApartmentCreateDTO apartment)
	{
		if (!ModelState.IsValid)
			return BadRequest(ModelState);

		string filenames = string.Empty;

		if (apartment.Photos != null && apartment.Photos.Count > 0)
		{
			foreach (IFormFile photo in apartment.Photos)
			{
				string filename = string.Empty;
				string extension = System.IO.Path.GetExtension(photo.FileName);
				filename = Guid.NewGuid() + extension;
				await _fileManager.Upload(photo, "apartments/" + filename, _configuration["BlobContainerName"]);
				filenames += filename + ",";
			}
		}

		apartment.ImagePaths = filenames;
		var finalApartment = _mapper.Map<Apartment>(apartment);

		await _repository.CreateAsync(finalApartment);
		await _repository.SaveChangesAsync();

		return NoContent();
	}

    [HttpGet("ApartmentDemoException")]
    public IActionResult ApartmentDemoException()
    {
        throw new ArgumentNullException();
    }
}
