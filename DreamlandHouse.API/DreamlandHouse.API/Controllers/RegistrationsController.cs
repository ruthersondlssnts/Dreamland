
using DreamlandHouse.API.Services.Interfaces;
using DreamlandHouse.Services.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DreamlandHouse.API.Controllers;

public class RegistrationsController : BaseController
{
	private readonly IRegistrationRepository _repository;

	public RegistrationsController(IRegistrationRepository repository)
	{
		_repository = repository;
	}

	[HttpPost]
	public async Task<IActionResult> Create(Registration user)
	{
		if (!ModelState.IsValid)
			return BadRequest(ModelState);

		await _repository.CreateAsync(user);
		await _repository.SaveChangesAsync();

		return NoContent();
	}
    [HttpGet]
    [Authorize]
	public async Task<IActionResult> GetAllRegistrations()
	{
		var registrations = await _repository.GetAllAsync();
		return Ok(registrations);
	}
}
