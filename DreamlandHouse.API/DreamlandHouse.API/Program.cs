using Azure.Extensions.AspNetCore.Configuration.Secrets;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Azure.Storage.Blobs;
using DreamlandHouse.API.Services.Interfaces;
using DreamlandHouse.API.Services.Repositories;
using DreamlandHouse.Services.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
	options.AddPolicy("CORSPolicy", builder =>
	{
		builder
			.AllowAnyOrigin()
			.AllowAnyMethod()
			.AllowAnyHeader()
			.WithExposedHeaders("X-Pagination");
	});
});
builder.Services.AddMicrosoftIdentityWebApiAuthentication(builder.Configuration)
	.EnableTokenAcquisitionToCallDownstreamApi()
    .AddMicrosoftGraph(builder.Configuration.GetSection("Graph"))
    .AddInMemoryTokenCaches(); ;

builder.Services.AddControllers();
builder.Services.AddApplicationInsightsTelemetry();




#if !DEBUG
var kevUrl = builder.Configuration["KeyVaultUrl"];
var tenantId = builder.Configuration["AzureAd:TenantId"];
var clientId = builder.Configuration["AzureAd:ClientId"];
var clientSecret = builder.Configuration["AzureAd:ClientSecret"];

var creds = new ClientSecretCredential(tenantId, clientId, clientSecret);
var client = new SecretClient(new Uri(kevUrl), creds);

builder.Configuration.AddAzureKeyVault(client, new AzureKeyVaultConfigurationOptions());

#endif

builder.Services.AddDbContext<DreamlandHouseDbContext>(
     dbContextOptions => dbContextOptions.UseSqlServer(
        builder.Configuration["ConnectionStrings:DreamlandHouseConnection"]));




builder.Services.AddScoped<IRegistrationRepository, RegistrationRepository>();
builder.Services.AddScoped<IApartmentRepository, ApartmentRepository>();
builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
builder.Services.AddScoped<IContactRepository, ContactRepository>();
builder.Services.AddScoped<IEnquiryRepository, EnquiryRepository>();
builder.Services.AddScoped<IBlogRepository, BlogRepository>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddScoped(_ =>
{
	return new BlobServiceClient(builder.Configuration["ConnectionStrings:AzureBlobConnection"]);
});
builder.Services.AddScoped<IFileManager, FileManager>();
builder.Services.AddApplicationInsightsTelemetry();

var app = builder.Build();

app.UseExceptionHandler("/error");

app.Map("/error", (HttpContext httpContext) =>
{
	Exception? exception = httpContext.Features.Get<IExceptionHandlerPathFeature>()?.Error;
	app.Logger.LogError(exception, exception?.Message);
	return Results.Problem(title: "Internal server error. Please try again later.");
});

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
	app.UseSwagger();
	app.UseSwaggerUI();
//}

app.UseCors("CORSPolicy");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
