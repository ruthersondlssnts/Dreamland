using DreamlandHouse.API.Controllers;
using DreamlandHouse.API.Services.Interfaces;
using DreamlandHouse.Services.Models;
using Microsoft.AspNetCore.Mvc;

namespace DreamlandHouse.Tests.Controllers;

public class RegistrationControllerTests
{
    private readonly IFixture _fixture;
    private readonly Mock<IRegistrationRepository> _repositoryMock;
    private readonly RegistrationsController _systemUnderTest;

    public RegistrationControllerTests()
    {
        _fixture = new Fixture();
        _repositoryMock = _fixture.Freeze<Mock<IRegistrationRepository>>();
        _systemUnderTest = new RegistrationsController(_repositoryMock.Object);
    }

    [Fact]
    public async Task CreateRegistration_ShouldReturnNoContent_WhenValidRequest()
    {
        //Arrange
        var regMock = _fixture.Create<Registration>();
        _repositoryMock.Setup(x => x.CreateAsync(regMock)).Verifiable();
        //Act
        var result = await _systemUnderTest.Create(regMock).ConfigureAwait(false);
        //Assert
        result.Should().NotBeNull();
        result.Should().BeAssignableTo<IActionResult>();
        result.Should().BeAssignableTo<NoContentResult>();
        _repositoryMock.Verify(x => x.CreateAsync(regMock), Times.Once());
    }

    [Fact]
    public async Task CreateRegistration_ShouldReturnBadRequest_WhenInvalidValidRequest()
    {
        //Arrange
        var regMock = _fixture.Create<Registration>();
        _repositoryMock.Setup(x => x.CreateAsync(regMock)).Verifiable();
        _systemUnderTest.ModelState.AddModelError("ForeignIdentificationType", "The Foreign Identification Type is required");
        //Act
        var result = await _systemUnderTest.Create(regMock).ConfigureAwait(false);
        //Assert
        result.Should().NotBeNull();
        result.Should().BeAssignableTo<IActionResult>();
        result.Should().BeAssignableTo<BadRequestObjectResult>();
        _repositoryMock.Verify(x => x.CreateAsync(regMock), Times.Never());
    }


}