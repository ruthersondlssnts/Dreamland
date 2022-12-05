using Microsoft.AspNetCore.Http;

namespace DreamlandHouse.API.Services.Interfaces;

public interface IFileManager
{
	Task Upload(IFormFile imageFile, string filename, string blobContainer);
}