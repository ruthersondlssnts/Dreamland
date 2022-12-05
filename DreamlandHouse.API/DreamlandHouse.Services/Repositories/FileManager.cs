using DreamlandHouse.API.Services.Interfaces;
using DreamlandHouse.Services.Models;
using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Http;

namespace DreamlandHouse.API.Services.Repositories;

public class FileManager : IFileManager
{
	private readonly BlobServiceClient _blobServiceClient;
	public FileManager(BlobServiceClient blobServiceClient)
	{
		_blobServiceClient = blobServiceClient;
	}

	public async Task Upload(IFormFile file, string filename, string blobContainerName)
	{
		var blobContainer = _blobServiceClient.GetBlobContainerClient(blobContainerName);

		var blobClient = blobContainer.GetBlobClient(filename);

		await blobClient.UploadAsync(file.OpenReadStream());
	}
}
