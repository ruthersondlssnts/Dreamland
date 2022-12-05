
using DreamlandHouse.API.Services.Interfaces;
using DreamlandHouse.Services.Models;
using Microsoft.AspNetCore.Mvc;

namespace DreamlandHouse.API.Controllers;

public class ContactsController : BaseController
{
	private readonly IContactRepository _repository;

	public ContactsController(IContactRepository repository)
	{
		_repository = repository;
	}

	[HttpPost]
	public async Task<IActionResult> Create(Contact contact)
	{
		if (!ModelState.IsValid)
			return BadRequest(ModelState);

		await _repository.CreateAsync(contact);
		await _repository.SaveChangesAsync();

		return NoContent();
	}

 
}
