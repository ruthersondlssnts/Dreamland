using DreamlandHouse.Services.Models;
using Microsoft.EntityFrameworkCore;

namespace DreamlandHouse.Services.Data;

public class DreamlandHouseDbContext : DbContext
{
	public DbSet<Apartment> Apartments { get; set; } = null!;
	public DbSet<Location> Locations { get; set; } = null!;
	public DbSet<Project> Projects { get; set; } = null!;
	public DbSet<Registration> Registrations { get; set; } = null!;
	public DbSet<Enquiry> Enquiries { get; set; } = null!;
	public DbSet<Contact> Contacts { get; set; } = null!;
	public DbSet<Blog> Blogs { get; set; } = null!;

	public DreamlandHouseDbContext(DbContextOptions<DreamlandHouseDbContext> options)
		: base(options)
	{

	}

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.Seed();
	}
}

