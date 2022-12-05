using AutoFixture.AutoMoq;
using AutoMapper;
using DreamlandHouse.API.Controllers;
using DreamlandHouse.API.Services.Repositories;
using DreamlandHouse.Services.Data;
using DreamlandHouse.Services.Models;
using DreamlandHouse.Services.Models.DTOs;
using DreamlandHouse.Services.Models.Services;
using Microsoft.EntityFrameworkCore;

namespace DreamlandHouse.Tests.Services;
public class ApartmentRepositoryTests : IDisposable
{
    private readonly IFixture _fixture;
    private readonly DreamlandHouseDbContext _context;

    public ApartmentRepositoryTests()
    {
        _fixture = new Fixture();
        var options = new DbContextOptionsBuilder<DreamlandHouseDbContext>().UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
              .Options;

        _context = new DreamlandHouseDbContext(options);
        _context.Database.EnsureCreated();
    }

    [Fact]
    public async Task GetApartmentAsync_ShouldReturnApartment_WhenDataFound()
    {
        //Arrange
        var sut = new ApartmentRepository(_context);
        //Act
        var result = await sut.GetApartmentAsync(1);
        //Assert
        result.Should().NotBeNull();
        result.Should().BeAssignableTo<Apartment>();
    }

    [Fact]
    public async Task GetPaginatedAsync_ShouldReturnApartmentsPaginated_WhenDataFound()
    {
        //Arrange
        var sut = new ApartmentRepository(_context);
        var apartmentsRequestMock = new ApartmentGetRequestDTO { pageNumber = 1, pageSize = 9};
        //Act
        var (result, paginationmeta) = await sut.GetPaginatedAsync(apartmentsRequestMock);
        //Assert
        result.Should().NotBeNull();
        result.Should().NotBeEmpty().And.HaveCount(9);
        (result, paginationmeta).Should().BeAssignableTo<(IEnumerable<Apartment>, PaginationMetadata)>();
    }

    public void Dispose()
    {
        _context.Database.EnsureDeleted();
        _context.Dispose();
    }
}
