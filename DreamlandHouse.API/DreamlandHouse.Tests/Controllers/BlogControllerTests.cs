using DreamlandHouse.API.Controllers;
using DreamlandHouse.API.Services.Interfaces;
using DreamlandHouse.Services.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace DreamlandHouse.Tests.Controllers;

public class BlogControllerTests
{
    private readonly IFixture _fixture;
    private readonly Mock<IBlogRepository> _repositoryMock;
    private readonly Mock<ILogger<BlogsController>> _loggerMock;
    private readonly BlogsController _systemUnderTest;

    public BlogControllerTests()
    {
        _fixture = new Fixture();
        _repositoryMock =_fixture.Freeze<Mock<IBlogRepository>>();
        _loggerMock =_fixture.Freeze<Mock<ILogger<BlogsController>>>();
        _systemUnderTest = new BlogsController(_repositoryMock.Object, _loggerMock.Object);
    }

    [Fact]
    public async Task GetAllBlogs_ShouldReturnOkResponse_WhenDataFound()
    {
        //Arrange
        var blogsMock = _fixture.Create<IEnumerable<Blog>>();
        _repositoryMock.Setup(x => x.GetAllAsync()).ReturnsAsync(blogsMock);
        //Act
        var result = await _systemUnderTest.GetAllBlogs().ConfigureAwait(false);
        //Assert
        result.Should().NotBeNull();
        result.Should().BeAssignableTo<IActionResult>();
        result.Should().BeAssignableTo<OkObjectResult>();
        result.As<OkObjectResult>().Value
             .Should()
             .NotBeNull()
             .And.BeOfType(blogsMock.GetType());

        _repositoryMock.Verify(x=>x.GetAllAsync(), Times.Once());
    }

    [Fact]
    public async Task GetBlog_ShouldReturnOkResponse_WhenValidInput()
    {
        //Arrange
        var blogMock = _fixture.Create<Blog>();
        var id = _fixture.Create<int>();
        _repositoryMock.Setup(x => x.GetBlog(id)).ReturnsAsync(blogMock);

        //Act
        var result = await _systemUnderTest.GetBlog(id).ConfigureAwait(false);

        //Assert
        result.Should().NotBeNull();
        result.Should().BeAssignableTo<IActionResult>();
        result.Should().BeAssignableTo<OkObjectResult>();
        result.As<OkObjectResult>().Value
             .Should()
             .NotBeNull()
             .And.BeOfType(blogMock.GetType());

        _repositoryMock.Verify(x => x.GetBlog(id), Times.Once());
    }

    [Fact]
    public async Task GetBlog_ShouldReturnNotFound_WhenNoDataFound()
    {
        //Arrange
        Blog blogMock = null!;
        var id = _fixture.Create<int>();
        _repositoryMock.Setup(x => x.GetBlog(id)).ReturnsAsync(blogMock);

        //Act
        var result = await _systemUnderTest.GetBlog(id).ConfigureAwait(false);

        //Assert
        result.Should().NotBeNull();
        result.Should().BeAssignableTo<IActionResult>();
        result.Should().BeAssignableTo<NotFoundResult>();

        _repositoryMock.Verify(x => x.GetBlog(id), Times.Once());
    }
}
