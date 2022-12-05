using DreamlandHouse.Services.Models;
using DreamlandHouse.Services.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace DreamlandHouse.Services.Data;

public static class ModelBuilderExtensions
{
	public static void Seed(this ModelBuilder modelBuilder)
	{
		modelBuilder.Entity<Location>().HasData(SeedData.GenerateLocations());
		modelBuilder.Entity<Project>().HasData(SeedData.GenerateProjects());
		modelBuilder.Entity<Apartment>().HasData(SeedData.GenerateApartments());
		modelBuilder.Entity<Blog>().HasData(SeedData.GenerateBlogs());
		modelBuilder.Entity<Enquiry>().HasData(SeedData.GenerateEnquiries());
		modelBuilder.Entity<Registration>().HasData(SeedData.GenerateRegistrations());
    }

}

