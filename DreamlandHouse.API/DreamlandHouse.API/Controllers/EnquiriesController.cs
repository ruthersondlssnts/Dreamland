
using DreamlandHouse.API.Services.Interfaces;
using DreamlandHouse.Services.Models;
using Microsoft.AspNetCore.Mvc;

namespace DreamlandHouse.API.Controllers;

public class EnquiriesController : BaseController
{
	private readonly IEnquiryRepository _repository;

	public EnquiriesController(IEnquiryRepository repository)
	{
		_repository = repository;
	}

	[HttpPost]
	public async Task<IActionResult> Create(Enquiry enquiry)
	{
		if (!ModelState.IsValid)
			return BadRequest(ModelState);

		await _repository.CreateAsync(enquiry);
		await _repository.SaveChangesAsync();

		return NoContent();
	}
}
