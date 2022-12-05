using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DreamlandHouse.Services.Models.Enums;

namespace DreamlandHouse.Services.Models;

public class Registration : IValidatableObject
{
	[Key]
	public int Id { get; set; }
	[Required]
	public string Fullname { get; set; } = string.Empty;
	[EmailAddress]
	[Required]
	public string Email { get; set; } = string.Empty;
	[Required]
	public string Address { get; set; } = string.Empty;
	[Required]
	[Phone]
	public string Mobile { get; set; } = string.Empty;
	[Required]
	public DateTime Birthday { get; set; }
	public string IdentificationType { get; set; } = string.Empty;
	public string IdentificationFile { get; set; } = string.Empty;
	public bool IsNotFilipinoCitizen { get; set; } = false;
	public string ForeignIdentificationType { get; set; } = string.Empty;
	public string ForeignIdentificationFile { get; set; } = string.Empty;
	public string ForeignPlaceOfBirth { get; set; } = string.Empty;

	public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
	{
		if (IsNotFilipinoCitizen == true && string.IsNullOrEmpty(ForeignIdentificationType))
			yield return new ValidationResult(
				"The Foreign Identification Type is required", new[] { nameof(ForeignIdentificationType) });

		if (IsNotFilipinoCitizen == true && string.IsNullOrEmpty(ForeignIdentificationFile))
			yield return new ValidationResult(
				"The Foreign Identification File is required", new[] { nameof(ForeignIdentificationFile) });

		if (IsNotFilipinoCitizen == true && string.IsNullOrEmpty(ForeignPlaceOfBirth))
			yield return new ValidationResult(
				"The Foreign Place Of Birth is required", new[] { nameof(ForeignPlaceOfBirth) });

		if (GetAge(Birthday) < 18)
			yield return new ValidationResult("Must be 18 years old and above", new[] { nameof(Birthday) });
	}

	public static int GetAge(DateTime birthday)
	{
		int age = DateTime.Now.Year - birthday.Year;
		if (DateTime.Now < birthday.AddYears(age))
			age--;

		return age;
	}
}
