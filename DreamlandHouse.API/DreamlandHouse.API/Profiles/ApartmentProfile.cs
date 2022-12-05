
using AutoMapper;
using DreamlandHouse.Services.Models;
using DreamlandHouse.Services.Models.DTOs;

namespace DreamlandHouse.API.Profiles;

public class ApartmentProfile : Profile
{
	public ApartmentProfile()
	{
		CreateMap<ApartmentCreateDTO, Apartment>();
		CreateMap<Apartment, ApartmentGetPaginatedDTO>()
			.ForMember(d => d.Price, opt => opt
			.MapFrom(s => String.Format("{0:n0}", s.Price)))
			.ForMember(d => d.Location, opt => opt
			.MapFrom(s => s.Project.Location.Name + ", " + s.Project.Location.Country));
		CreateMap<Apartment, ApartmentDetailDTO>()
			.ForMember(d => d.Location, opt => opt
			.MapFrom(s => s.Project.Location.Name + ", " + s.Project.Location.Country))
			.ForMember(d => d.Price, opt => opt
			.MapFrom(s => String.Format("{0:n0}", s.Price)))
			.ForMember(d => d.Project, opt => opt
			.MapFrom(s => s.Project.Name))
			.ForMember(d => d.ProjectId, opt => opt
			.MapFrom(s => s.Project.Id))
			.ForMember(d => d.ApartmentTypeId, opt => opt
			.MapFrom(s => (int)s.Type))
			.ForMember(d => d.LocationId, opt => opt
			.MapFrom(s => s.Project.LocationId));


	}
}
