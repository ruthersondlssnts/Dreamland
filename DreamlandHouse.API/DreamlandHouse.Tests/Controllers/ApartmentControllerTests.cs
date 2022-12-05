using AutoFixture;
using AutoFixture.AutoMoq;
using AutoMapper;
using DreamlandHouse.API.Controllers;
using DreamlandHouse.API.Services.Interfaces;
using DreamlandHouse.Services.Models;
using DreamlandHouse.Services.Models.DTOs;
using DreamlandHouse.Services.Models.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DreamlandHouse.Tests.Controllers;

public class ApartmentControllerTests
{
    private readonly IFixture _fixture;
    private readonly Mock<IApartmentRepository> _repositoryMock;
    private readonly Mock<IMapper> _mapperMock;
    private readonly Mock<ILogger<ApartmentsController>> _loggerMock;
    private readonly Mock<IConfiguration> _configMock;
    private readonly Mock<IFileManager> _filemanagerMock;
    private readonly ApartmentsController _systemUnderTest;

    public ApartmentControllerTests()
    {
        _fixture = new Fixture();
        _fixture.Customize(new AutoMoqCustomization());
        _repositoryMock = _fixture.Freeze<Mock<IApartmentRepository>>();
        _loggerMock = _fixture.Freeze<Mock<ILogger<ApartmentsController>>>();
        _mapperMock = _fixture.Freeze<Mock<IMapper>>();
        _configMock = _fixture.Freeze<Mock<IConfiguration>>();
        _filemanagerMock = _fixture.Freeze<Mock<IFileManager>>();
        _systemUnderTest = new ApartmentsController(_repositoryMock.Object,
            _mapperMock.Object,
            _filemanagerMock.Object,
            _configMock.Object,
            _loggerMock.Object);
    }

    [Fact]
    public async Task GetAllApartments_ShouldReturnOkResponse_WhenDataFound()
    {
        //Arrange
        var apartmentsMock = _fixture.Create<IEnumerable<Apartment>>();
        var paginatedRequestMock = _fixture.Create<ApartmentGetRequestDTO>();
        var paginationMetadataMock = _fixture.Create<PaginationMetadata>();
        var apartmentsGetDTOMock = _fixture.Create<ApartmentGetPaginatedDTO[]>();
        _systemUnderTest.ControllerContext = new ControllerContext();
        _systemUnderTest.ControllerContext.HttpContext = new DefaultHttpContext();


        _repositoryMock.Setup(x => x.GetPaginatedAsync(paginatedRequestMock)).ReturnsAsync((apartmentsMock, paginationMetadataMock));
        //Act
        var result = await _systemUnderTest.GetApartments(paginatedRequestMock).ConfigureAwait(false);
        //Assert
        result.Should().NotBeNull();
        result.Should().BeAssignableTo<IActionResult>();
        result.Should().BeAssignableTo<OkObjectResult>();
        result.As<OkObjectResult>().Value
             .Should()
             .NotBeNull()
             .And.BeOfType(apartmentsGetDTOMock.GetType());

        _repositoryMock.Verify(x => x.GetPaginatedAsync(paginatedRequestMock), Times.Once());
    }
}
