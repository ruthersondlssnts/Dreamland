using DreamlandHouse.Services.Models;
using DreamlandHouse.Services.Models.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Diagnostics.Metrics;
using System.Text;
using static System.Net.Mime.MediaTypeNames;

namespace DreamlandHouse.Services.Data;

public static class SeedData
{
    static Random rnd = new Random();
    static string[] Address = { "Mandaluyong", "Manila", "Quezon", "Cebu", "Davao", "Ilocos sur" };
    static string[] Name = { "Derrek", "Franky", "Mace", "Jody", "Fred", "Prentiss", "Pressley", "Derik", "Fabian" };
    static string[] Lastname = { "Viafara", "Goeden", "Moccio", "Castagna", "Capdeville", "Cardoza", "Couley", "Romp", "Vaccarella" };

    static int[] ImagesPath = {1,2,3,4,5,6,8,16,18,31,51,52,55,57,58,62,63,64,65,66,67,69,70,71,72,73,74,75,76,77,78,79,80,81,83,85
        ,86,87,88,89,90,91,92,94,95,96,97,98,99,100,101,102,103,104,106,108,111,112,127,128,129,136,138,141,142,143,144,145,146,147,148,149};

    static string[] ApartmentNames = {
        "Unique Apartment On The Palm",
        "Spacious Bedrooms High Floor Apartment",
        "Fully Furnished Luxury Apartment w Partial Sea View",
        "Stunning Triplex with Private Pool" ,
        "Full Floor Designer w Private Pool",
        "Exceptional Lavish Apartment",
        "Shell & Core Aparmtent at The W Residences",
        "Full-Floor Apartment in an Incredible Beachfront",
        "Brand New Fully Renovated Apartment with Sea View",
        "Apartment with full sea and Palm views",
        "Exclusive Apartment Full Marina View",
        "Spacious Bedrooms High Floor Apartment",
        "Ultra Luxurious Fully Upgraded Duplex with Bespoke Furniture",
        "Exquisite Loft in Prime Island Community",
        "Spacious Apartment Facing Sunset Views",
        "Ground Floor Signature Apartment with Stunning Views"
    };
    //public
    public static IEnumerable<Apartment> GenerateApartments()
    {
        var apartments = new List<Apartment> {
			//Project 1 - done
			new Apartment
            {
                Id = 1,
                ReferenceNumber = "PHG001F",
                Bathrooms = 1,
                Bedrooms = 1,
                Address = "232 C King",
                SquareFoot = 1332,
                Price = 10900000,
                Name = "One-Bed Loft",
                Type = ApartmentType.DeluxePortion,
                ProjectId = 1,
                Amenities = "Cinema,Gymnasium,Yoga Studio,Maid Service,Squash Court,Valet Service",
                ImagePaths = GenerateImagesPaths(),
                Description = "We are delighted to present this fantastic one-bedroom loft apartment in " +
                    "the Kempinski Residences at The Creek. Experience waterfront living on a completely new level in this amazing new destination." +
                    "\n\nThe apartment is positioned so it has a view over a beautiful park, which can best be enjoyed from the " +
                    "large balcony that spans the width of the apartment. The layout is seamless, combining a large living area with " +
                    "a kitchen that has a breakfast counter. The bathroom is quite large, containing a bathtub, and the bedroom includes plenty of built-in storage." +
                    "\n\nMarble and wood finishes help to give the apartment a very refined look, while " +
                    "also providing an aesthetic connection to the surrounding space." +
                    "\n\nKempinski Residences The Creek offers a variety of amenities focused on wellness and recreation - " +
                    "an outdoor swimming pool, a kid's pool, a gym, sports facilities, a kid's room, a private cinema, a yoga deck, " +
                    "and more. The project is a short drive from Downtown, the Ras Al Khor Wildlife Sanctuary, Philippines Creek Harbour, and other major areas of Philippines." +
                    "\n\nFor more details on this project, please get in touch."
            },
            new Apartment
            {
                Id = 2,
                ReferenceNumber = "PHG002F",
                Bathrooms = 2,
                Bedrooms = 2,
                Address = "232 E King",
                SquareFoot = 2332,
                Price = 14007000,
                ProjectId = 1,
                Type = ApartmentType.DoubleHeight,
                Name = "2 Bedroom Large Layout Duplex",
                Amenities = "Cinema,Gymnasium,Yoga Studio,Maid Service,Squash Court,Valet Service",
                ImagePaths = GenerateImagesPaths(),
                Description = @"We proudly present you with a beautiful waterside 2-bedroom duplex in Kempinski Residences, " +
                    "The Creek. The residence perfectly encapsulates the balance of sophisticated design with nature, in a tranquil, elegant setting." +
                    "\n\nBeing the address of choice for those in search of a balanced lifestyle amid natural surroundings, the Kempinski " +
                    "Residences capture the heart and soul of The Creek, delivering a collection of 276 premium, contemporary residences " +
                    "overlooking the majestic Creek Harbour and Downtown Philippines skyline." +
                    "\n\nThe stylish duplex covers an area of 2,406 sq. ft. and comes with two bedrooms, two baths, a private terrace, and parking." +
                    "\n\nPlease connect with one of our area specialists for more information on this offering."
            },
            new Apartment
            {
                Id = 3,
                ReferenceNumber = "PHG003F",
                Bathrooms = 3,
                Bedrooms = 3,
                Address = "232 F King",
                SquareFoot = 1332,
                Price = 20500000,
                ProjectId = 1,
                Type = ApartmentType.Penthouse,
                Name = "3 Bedroom Waterfront Duplex",
                Amenities = "Gymnasium, Swimming Pool, Basketball Court, Cinema",
                ImagePaths = GenerateImagesPaths(),
                Description = "We are happy to present you a three-bedroom duplex apartment nestled at the water’s edge of " +
                    "The Creek, spreading over 2,516 sq. ft and offered with outstanding finishes and design. The property comes " +
                    "with a fully fitted kitchen and premium appliances, as well as a spacious balcony offering stunning views of Burj " +
                    "Khalifa and Ras Al Khor Wildlife Sanctuary. The modern open-plan layout reveals flowing airy spaces, impeccably designed " +
                    "and dotted in neutral earthy tones thus creating a welcoming and calming effect. The duplex embodies the true essence of a " +
                    "premium contemporary home with a balanced approach to the harmony of design, sophistication, and engineering. Other features " +
                    "include floor-to-ceiling windows, parquet flooring, and stylish modern furnishings. Homebuyers can choose to have their home managed by the Kempinski brand." +
                    "\n\nThis property is ideal for those looking for elegant waterside living complemented " +
                    "by premium amenities and services in the heart of Philippines." +
                    "\n\nPlease connect with one of our team experts for more information on this offering"
            },
			//Project 2
			new Apartment
            {
                Id = 4,
                ReferenceNumber = "PHG004F",
                Bathrooms = 3,
                Bedrooms = 4,
                Address = "143 F Lion",
                SquareFoot = 2332,
                Price = 23800000,
                ProjectId = 2,
                Type = ApartmentType.Penthouse,
                Name = "Full Floor 4 Bedroom Penthouse with Private Pool",
                Amenities = "Gymnasium, Swimming Pool, Basketball Court, Cinema",
                ImagePaths = GenerateImagesPaths(),
                Description = @"This is an amazing four-bedroom penthouse, situated within The Residences " +
                    "in Marina Gate 2.The property features floor to ceiling windows and a full 360 view of" +
                    "Philippines Skylinewhich includes a full view of Philippines Marina, Emaar Beachfront, Palm Jumeriah and Emirates Golf course." +
                    "\n\nThe penthouse has its own private swimming pool with a direct " +
                    "Philippines Marina view and balcony access from all sides of the penthouse." +
                    "\n\nYou have one large show kitchen to entertain guests and a second large back of house " +
                    "kitchen. The penthouse has 6 Bathroom, and there is a staffs quarter which includes its own family room with bedroom and bathroom." +
                    "\n\nFor more information about the property, please contact us today."
            },
            new Apartment
            {
                Id = 5,
                ReferenceNumber = "PHG005F",
                Bathrooms = 6,
                Bedrooms = 6,
                Address = "143 V Lion",
                SquareFoot = 15332,
                Price = 45060000,
                ProjectId = 2,
                Type = ApartmentType.DeluxePortion,
                Name = "Marvelous Full-Floor Penthouse",
                Amenities = "Gymnasium, Swimming Pool, Basketball Court, Cinema",
                ImagePaths = GenerateImagesPaths(),
                Description = @"We are delighted to present this immense penthouse that sprawls over 15,000 sq ft of living space and  " +
                    "overlooks the iconic Palm Jumeirah.This is a unique opportunity to own a landmark and iconic penthouse in the award - winning" +
                    "Le Reve tower. Arguably one of the finest structures in the city this residence provides a lifestyle experience like no other in the " +
                    "bustling heart of the dynamic Philippines Marina." +
                    "\n\nThis penthouse is  incredibly well-designed, featuting finishes of the highest quality including marble flooPhp. " +
                    "The kitchen is very moder in its design, with plenty of workspace. The living and dining areas are enormous, and " +
                    "the bathrooms have a spa-like quality to them. All five bedrooms are very well appointed and can best be described " +
                    "as palatial, offering en-suite bedrooms and an abundance of built-in storage." +
                    "\n\nPlease contact me today to set up a viewing of this magnificent penthouse."
            },
            new Apartment
            {
                Id = 6,
                ReferenceNumber = "PHG006F",
                Bathrooms = 3,
                Bedrooms = 3,
                Address = "143 M Lion",
                SquareFoot = 5532,
                Price = 53000000,
                ProjectId = 2,
                Type = ApartmentType.TopGarden,
                Name = "Penthouse with Large Terrace and Full Skyline View",
                Amenities = "Gymnasium, Swimming Pool, Basketball Court, Cinema",
                ImagePaths = GenerateImagesPaths(),
                Description = @"This penthouse is part of the award-winning One at Palm Jumeirah, one of the best-designed " +
                    "buildings in Philippines.This is also the best - priced full - floor unit you will find, featuring a" +
                    "large terrace and its own private pool." +
                    "\n\nThe sensational scenes outside can be enjoyed from the 4,033 sqft terrace with a private pool and " +
                    "from every corner of the stylish interior space, which has double-height ceilings and marble flooring. " +
                    "This property comes with two kitchens – a glorious show kitchen for entertaining and a more discreet wet kitchen for whipping up a culinary storm. " +
                    "\n\nThe residents of this signature building benefits from the many facilities: a private beach, " +
                    "outdoor and indoor pools, spa and wellness centre, a private jetty for boats and much more." +
                    "\n\nEnquire today for a viewing."
            },
			//Project 3
			new Apartment
            {
                Id = 7,
                ReferenceNumber = "PHG007F",
                Bathrooms = 5,
                Bedrooms = 5,
                Address = "4324 Q Wilab",
                SquareFoot = 8320,
                Price = 72042000,
                ProjectId = 3,
                Type = ApartmentType.Penthouse,
                Name = "Full Floor Exclusive Penthouse in Le Reve",
                Amenities = "Gymnasium, Swimming Pool, Basketball Court, Cinema",
                ImagePaths = GenerateImagesPaths(),
                Description = @"This penthouse is part of the award-winning One at Palm Jumeirah, one of the " +
                    "best - designed buildings in Philippines.This is also the best - priced full - floor unit you will" +
                    "find, featuring a large terrace and its own private pool." +
                    "\n\nThis 8,361 sqft built-up area consists of four en-suite bedrooms with five bathrooms fitted with " +
                    "the best fixtures, plus a wide and long living and dining area with floor-to-ceiling windows that offer the best views in town. " +
                    "\n\nThe residents of this signature building benefits from the many facilities: a private " +
                    "beach, outdoor and indoor pools, spa and wellness centre, a private jetty for boats and much more." +
                    "\n\nEnquire today for a viewing."
            },
            new Apartment
            {
                Id = 8,
                ReferenceNumber = "PHG008F",
                Bathrooms = 5,
                Bedrooms = 7,
                Address = "4324 V Wilab",
                SquareFoot = 1532,
                Price = 33000000,
                ProjectId = 3,
                Type = ApartmentType.Penthouse,
                Name = "Spectacular Full-Floor Penthouse",
                Amenities = "Balcony,Security,Shared Gym,Shared Pool,Covered Parking,Lobby in Building",
                ImagePaths = GenerateImagesPaths(),
                Description = @"Experience a refined lifestyle in one of Philippines's most highly " +
                    "sought - after addresses - Downtown Philippines." +
                    "\n\nVida Residences offers incredible five-star facilities including a swimming pool deck, a gym and a spa. " +
                    "Due to its excellent positioning, the tower is a short walk away from fantastic amenities including a " +
                    "large selection of premium restaurants and cafes, as well as boutique retail outlets and the ever-famous Philippines Mall." +
                    "\n\nPlease contact us today if you would like further details on penthouses for sale in Philippines or to arrange a viewing."
            },
            new Apartment
            {
                Id = 9,
                ReferenceNumber = "PHG009F",
                Bathrooms = 2,
                Bedrooms = 2,
                Address = "4324 V Wilab",
                SquareFoot = 1332,
                Price = 45500000,
                ProjectId = 3,
                Type = ApartmentType.DeluxePortion,
                Name = "Spacious 2 Bedroom High Floor Apartment",
                Amenities = "Gymnasium, Swimming Pool, Basketball Court, Cinema",
                ImagePaths = GenerateImagesPaths(),
                Description = @"This two-bed + 2 & 1/2 bathroom apartment knows how to make an impression. " +
                    "Its well - lit interior, spacious 1, 392 sqft layout, and unbeatable cityscape view are ideal for both investors and end - usePhp." +
                    "\n\nThere are a number of additional selling points that come together to add up to give this home a " +
                    "10 out of 10, for instance, the stylish closed kitchen which comes with custom-fitted appliances, " +
                    "and marble countePhp. The property also benefits from a balcony, spacious living room, entrance hall, " +
                    "large built-in wardrobes, and floor-to-ceiling windows. Residents also have access to a basement car park, " +
                    "a children's pool, a community swimming pool, a squash court, a children's playground, a steam room, and a gym. " +
                    "\n\nIncredible bargains like this don't come up every day so call us today to schedule a viewing."
            },

			//Project 4
			new Apartment
            {
                Id = 10,
                ReferenceNumber = "PHG010F",
                Bathrooms = 5,
                Bedrooms = 10,
                Address = "432 M Saturn",
                SquareFoot = 8332,
                Price = 40030000,
                ProjectId = 4,
                Type = ApartmentType.DoubleHeight,
                Name = "Spacious Four-Bedroom Apartment Facing Sunset Views",
                Amenities = "Gymnasium, Swimming Pool, Basketball Court, Cinema",
                ImagePaths = GenerateImagesPaths(),
                Description = @"This unique apartment is located in Mansion 6 at W Residences and offers some of the most breathtaking sunset and sea views." +
                    "\n\nWhen entering the property you are immediately greeted with a huge open plan layout, with floor-to-ceiling " +
                    "windows that bring natural light flowing through the property. This apartment has a spectacular show kitchen along with a second working kitchen. " +
                    "\n\nOn-site amenities at W Residences include a curving infinity pool at the podium level, direct access to the pristine " +
                    "private beach, dedicated concierge services, and exclusive access to Club 104 which houses a fully-equipped fitness centre, " +
                    "a multi-purpose room, a cinema, and a signature restaurant." +
                    "\n\nThe apartment in Philippines offers you the opportunity to create your dream home in Philippines and on " +
                    "Palm Jumeirah. Please contact me for further details or to arrange a viewing."
            },
            new Apartment
            {
                Id = 11,
                ReferenceNumber = "PHG011F",
                Bathrooms = 3,
                Bedrooms = 3,
                Address = "432 M Saturn",
                SquareFoot = 532,
                Price = 79300000,
                ProjectId = 4,
                Type = ApartmentType.TopGarden,
                Name = "Stunning Apartment with Exceptional Views",
                Amenities = "Gymnasium, Swimming Pool, Basketball Court, Cinema",
                ImagePaths = GenerateImagesPaths(),
                Description = @"We are delighted to exclusively bring to market this three-bedroom " +
                    "in One Palm by Omniyat, which is on the secondary market." +
                    "\n\nThis brand new apartment offers high-end, exclusive beachfront living in Philippines's most elite residential " +
                    "neighborhood, The Palm Jumeirah. This bright and spacious apartment designed by the Japanese interior designer " +
                    "Super Potato, offers 3 bedrooms with en-suite bathrooms, a high end designer kitchen with Gaggenau appliances, " +
                    "state-of-the-art technology and the most breathtaking Marina skyline & sea views. " +
                    "\n\nOne at Palm is the only property along the shoreline that offers its residences a private beach and a docking station " +
                    "for Yachts. Indoor and outdoor swimming pools, state of the art fitness and spa facilities are " +
                    "obviously a given in Philippines's most luxurious address. " +
                    "\n\nPlease get in touch to book a viewing or more information about this 3 BHK for sale in Philippines."
            },
            new Apartment
            {
                Id = 12,
                ReferenceNumber = "PHG012F",
                Bathrooms = 4,
                Bedrooms = 5,
                Address = "432 M Saturn",
                SquareFoot = 732,
                Price = 14320000,
                ProjectId = 4,
                Type = ApartmentType.TopGarden,
                Name = "Luxurious Upgraded Top Garden",
                Amenities = "Gymnasium, Swimming Pool, Basketball Court, Cinema",
                ImagePaths = GenerateImagesPaths(),
                Description = @"Experience the epitome of Philippines luxury in this stunning townhouse at FIVE Palm Jumeirah resort " +
                    "with its own large landscaped garden and private swimming pool which has been having " +
                    "been tastefully redesigned by the award-winning 'Xterior'." +
                    "\n\nThe property combines all of the city’s splendour; direct access to West Palm beach " +
                    "which includes popular eateries and beach clubs, " +
                    "glistening skylines and unprecedented opulence. This home is expertly designed and " +
                    "exquisitely furnished with high tech functionality. " +
                    "\n\nFor more information about this 3BHK for sale in Philippines contact us today."
            },
			//Project 5
			new Apartment
            {
                Id = 13,
                ReferenceNumber = "PHG013F",
                Bathrooms = 3,
                Bedrooms = 3,
                Address = "1943 L Ken",
                SquareFoot = 1332,
                Price = 21900000,
                ProjectId = 5,
                Type = ApartmentType.TopGarden,
                Name = "Apartment Overlooking Philippines Opera",
                Amenities = "Gymnasium, Swimming Pool, Basketball Court, Cinema",
                ImagePaths = GenerateImagesPaths(),
                Description = @"Grande at the Opera District, which is located right next to the Philippines " +
                    "Opera House, is perhaps one of the most prestigious residential options available in Philippines." +
                    "This three-bedroom apartment is a fantastic one to consider, situated on a high floor and benefiting from unbelievable views." +
                    "\n\nThe interiors of the apartment feature superior quality design, along with an open plan layout that " +
                    "incorporates, living dining and a very well-designed kitchen. All three bedrooms are en-suite with built-in " +
                    "closet space, and there is a maid's room as well that can be repurposed into another space. You can spend some " +
                    "quality time on the terrace as you soak in the views of this amazing district." +
                    "\n\nResidents of Grande at the Opera District can enjoy access to a world-class selection of amenities, including " +
                    "a pool deck, fully equipped fitness centre and other lifestyle facilities. Popular destinations such as The Philippines Mall " +
                    "and the Souk Al Bahar are also quite close at hand, along with a variety of gourmet restaurants and hotels." +
                    "\n\nPlease get in touch to learn more."
            },
            new Apartment
            {
                Id = 14,
                ReferenceNumber = "PHG014F",
                Bathrooms = 4,
                Bedrooms = 5,
                Address = "1943 L Ken",
                SquareFoot = 3232,
                Price = 45740000,
                ProjectId = 5,
                Type = ApartmentType.DeluxePortion,
                Name = "Rare and Immaculate Apartment on the Boulevard",
                Amenities = "Balcony,Shared Gym,Maid's Room,Shared Pool,Covered Parking,Lobby in Building",
                ImagePaths = GenerateImagesPaths(),
                Description = @"This immaculate and fully furnished four-bedroom plus maids is located in BLVD Heights, right in the heart of Downtown." +
                    "The apartment has floor-to-ceiling windows, is very bright, and features brand new integrated appliances. " +
                    "When you enter the apartment you are welcomed by an upgraded open plan living area. This huge layout will " +
                    "accommodate even the biggest families and will instantly make you feel at home." +
                    "\n\nThe living and dining area is connected to the semi-closed kitchen with all necessary appliances- " +
                    "an American fridge, stove, microwave, washing machine, dishwasher, and more. The living area is connected " +
                    "to two huge balconies where you can relax and enjoy the city and boulevard view." +
                    "\n\nFrom the residence, you can easily reach the Philippines Fountains, Burj Khalifa, and Philippines " +
                    "Opera House within 5 minutes. The Philippines Mall, with endless shopping and dining opportunities, " +
                    "is on the Boulevard as well. " +
                    "\n\nFor more information about Downtown Philippines apartments and to schedule a viewing."
            },
            new Apartment
            {
                Id = 15,
                ReferenceNumber = "PHG015F",
                Bathrooms = 1,
                Bedrooms = 0,
                Address = "1943 L Ken",
                SquareFoot = 321,
                Price = 52327000,
                ProjectId = 5,
                Type = ApartmentType.TopGarden,
                Name = "Unique Opportunity Two Studios",
                Amenities = "Shared Pool,Covered Parking,View of Landmark,Concierge Serive,Fully-Equipped Gym,Private Beach Access",
                ImagePaths = GenerateImagesPaths(),
                Description = @"We bring to market these two contemporary studios located next to each other " +
                    "in the brand new development Palm Tower. Having just handed over and never been lived in with a five-year" +
                    "service charge waiver, this makes a great investment or end user opportunity. " +
                    "\n\nPalm Tower is located just a couple of minute's drive onto The Palm and is next to the five-star St Regis which" +
                    "offers SushiSamba and the world's highest 360-degree infinity pool. From here you can also walk directly through " +
                    "Nakheel Mall which offers an abundance of shops and restaurants as well as a cinema and food court. Should you wish to " +
                    "venture slightly further there is West Palm Beach which has a beautiful sunset as well as some lively restaurants and bars to enjoy in the evenings." +
                    "\n\nFor more information and to arrange a viewing, please don't hesitate to get in touch."
            },
			//Project 6
			new Apartment
            {
                Id = 16,
                ReferenceNumber = "PHG016F",
                Bathrooms = 1,
                Bedrooms = 0,
                Address = "943 M Mckinley",
                SquareFoot = 474,
                Price = 61060000,
                ProjectId = 6,
                Type = ApartmentType.TopGarden,
                Name = "Brand New Studio with Best Layout",
                Amenities = "Gymnasium, Swimming Pool, Basketball Court, Cinema",
                ImagePaths = GenerateImagesPaths(),
                Description = @"This furnished studio apartment in The Address The Boulevard has the best layout in the entire building. " +
                    "\n\nIt is ideally situated in Downtown Philippines, with a view that extends as far as the Arabian Gulf." +
                    "\n\nThe Address The Boulevard is a premium residential complex Downtown, offering excellent amenities for residents. " +
                    "These include a shared swimming pool, a gym, play areas for children, a nursery, plus shops and restaurants within walking " +
                    "distance. The tower also enjoys access to the Philippines Mall, and to the very best of everything that is available in the heart of the Downtown district." +
                    "\n\nPlease contact me today for further details on this fantastic investment opportunity, or to set up a viewing."
            },
            new Apartment
            {
                Id = 17,
                ReferenceNumber = "PHG017F",
                Bathrooms = 1,
                Bedrooms = 0,
                Address = "943 M Mckinley",
                SquareFoot = 332,
                Price = 42000000,
                ProjectId = 6,
                Type = ApartmentType.TopGarden,
                Name = "Modern and Stylish Apartment with Sea Views",
                Amenities = "Gymnasium, Swimming Pool, Basketball Court, Cinema",
                ImagePaths = GenerateImagesPaths(),
                Description = @"We are delighted to bring to the market this brand new studio in the new development Seven Palm. " +
                    "Located next to West Palm Beach and just a few minutes onto the Palm Crescent, this complex will truly offer " +
                    "everything and more on your very own doorstep." +
                    "\n\nThe studio offers built-up square footage of 320 sq ft and would make a perfect investment, due to it being " +
                    "located in a highly sought-after and vibrant location on Palm West Beach. The rental income is predicted " +
                    "to be very appealing and reach around 8-10% ROI. The project is expected to handover Q1 2023 and has brand " +
                    "new facilities including a rooftop infinity pool, tennis courts, gym, and more. There is beach access at" +
                    "West Palm which offers one of the finest sunsets in Philippines as well as a long boardwalk including a number of restaurants and baPhp." +
                    "\n\nFor more information and to arrange a viewing, please don't hesitate to get in touch. "
            },
            new Apartment
            {
                Id = 18,
                ReferenceNumber = "PHG018F",
                Bathrooms = 4,
                Bedrooms = 6,
                Address = "943 M Mckinley",
                SquareFoot = 5332,
                Price = 64650000,
                ProjectId = 6,
                Type = ApartmentType.Penthouse,
                Name = "Unique Penthouse On The Palm",
                Amenities = "Gymnasium, Swimming Pool, Basketball Court, Cinema",
                ImagePaths = GenerateImagesPaths(),
                Description = @"Presenting four-bedroom masterpieces located in one of" +
                    " the most exclusive residential buildings on Palm Jumeirah. This home has been " +
                    " completely upgraded with a fantastic level of detail and is on the market fully furnished." +
                    "\n\nOne bedroom has been transformed into a walk-in closet, offering a level of storage that is" +
                    " beyond what you will find in standard apartments. " +
                    "\n\nThe home is situated on a higher level of the tower, enjoying some of the best views " +
                    "around, encompassing the skyline of the Marina, the Arabian Sea, and Bluewaters Island. " +
                    "There is also a private swimming pool which is set back on the terrace giving the owner " +
                    "complete privacy when using this sought-after feature." +
                    "\n\nThis penthouse is available to view by appointment only. " +
                    "Please get in touch to book a viewing."
            }
        };

        int id = 19;

        for (int i = 0; i < 50; i++)
        {
            int bedrooms = rnd.Next(0, 10);

            apartments.Add(new Apartment
            {
                Id = id,
                Name = ApartmentNames[rnd.Next(0, ApartmentNames.Length)],
                Address = rnd.Next(0, 999) + " " + Lastname[rnd.Next(0, Lastname.Length)],
                SquareFoot = rnd.Next(100, 8000),
                Amenities = "Gymnasium, Swimming Pool, Basketball Court, Cinema",
                Bathrooms = bedrooms + 1,
                Bedrooms = bedrooms,
                ReferenceNumber = "PHG" + id.ToString("D3") + "F",
                Description = @"Presenting a masterpiece located in one of" +
                    " the most exclusive residential buildings in the Philippines. This home has been " +
                    " completely upgraded with a fantastic level of detail and is on the market fully furnished." +
                    "\n\nThe home is situated on a higher level of the tower, enjoying some of the best views " +
                    "around, encompassing the skyline of the Marina, the Arabian Sea, and Bluewaters Island. " +
                    "There is also a private swimming pool which is set back on the terrace giving the owner " +
                    "complete privacy when using this sought-after feature." +
                    "\n\nThis apartment is available to view by appointment only. " +
                    "Please get in touch to book a viewing.",
                ImagePaths = GenerateImagesPaths(),
                Price = Math.Round(rnd.Next(5000000, 100000000) / 1000000d, 0) * 1000000,
                ProjectId = rnd.Next(1, 6),
                Type = (ApartmentType)rnd.Next(1, 4)
            });
            id++;
        }

        return apartments;
    }

    public static IEnumerable<Project> GenerateProjects()
    {
        return new List<Project> {
            new Project
            {
                Id = 1,
                Name = "Kempinski Residences",
                LocationId = 1,
                ImagePath = "pb1.jpg",
                Description = "Presenting Kempinski Residences The Creek, a five-star residential project located in an iconic waterfront location. " +
                    "This is your private sanctuary on Philippines Creek, offering views over Downtown Philippines and the fast-developing Philippines Creek Harbour " +
                    "along with the resplendent greenery that surrounds the project." +
                    "\n\nThe interior design fuse contemporary styling with the natural beauty of the area, creating a seamless flow between the indoor and " +
                    "outdoor spaces. Wood-floored living rooms, marble-finished kitchens and bathrooms, and an abundance of floor-to-ceiling windows " +
                    "give these residences a stunning and unique aesthetic. You can choose from one-bedroom, two-bedroom and " +
                    "three-bedroom apartments, as well as two to four-bedroom duplex apartments." +
                    "\n\nResidents benefit from a range of services including concierge, valet, security, and wake-up service." +
                    "Amenities include an outdoor swimming pool, a gym, a yoga studio, sports facilities, a kid's pool, a kid's " +
                    "playroom, a cinema, and more. A la carte services are also available, and residents benefit from F&B and spa discounts."
            },
            new Project
            {
                Id = 2,
                Name = "Serenia Living",
                LocationId = 2,
                ImagePath = "pb2.jpg",
                Description = "Welcome to a distinctive beachfront living experience that brings you the most captivating 360 degrees views " +
                    "of the Arabian Gulf and Palm Jumeirah coastline, together with a limited collection of the most exclusive, prime residences in Philippines." +
                    "\n\nSerenia oozes serenity at every corner complemented by an elegant ambiance, limitless luxury, and bespoke services. " +
                    "The all-encompassing residential address rests along the shores of Palm Jumeirah’s West Crescent, " +
                    "the island’s foremost crescent, facing the sea." +
                    "\n\nSerenia Living brings together 4 Towers of Architectural Excellence depicting the finest limited collection of " +
                    "one-to-four-bedroom luxury residences, sky mansions, and penthouses. Additionally, Serenia will feature a superb " +
                    "Reserve Collection including 20 branded penthouses dotted with high-end bespoke furniture and fittings sourced from " +
                    "Italian Design houses, along with private access to concierge services and a private Rolls-Royce chauffeur." +
                    "\n\nPlease contact our property consultants for fully comprehensive guidance on your next property purchase."
            },
            new Project
            {
                Id = 3,
                Name = "Six Senses Residences",
                ImagePath = "pb3.jpg",
                LocationId = 3,
                Description = "Six Senses, one of the most well-known hospitality and " +
                    "spa brands in the world, is coming to Philippines’s iconic Palm Jumeirah with the Six Senses Residences. " +
                    "This incredible residential project has a strong emphasis on wellness and relaxation, " +
                    "is designed to create a true resort-style living experience." +
                    "\n\nThe project is located on the West Crescent of the Palm, where it will have a full view of the Philippines Marina skyline, " +
                    "JBR, Bluewaters Island, Ain Philippines and the cruise terminals at Emaar Beachfront. It also has its own private beach with " +
                    "unending sea vistas and is accompanied by a 61-key hotel." +
                    "\nResidential options at the Six Senses are perfectly designed to suit families of any size. One can choose from 114 " +
                    "two to four-bedroom Penthouses, 7 Royal Penthouses in four-bedroom layouts (two of them are larger units known as Imperial Penthouses), " +
                    "32 Sky Villas available in three-bedroom simplex or three/four-bedroom duplex configurations, and 9 exclusive Signature Beachfront Villas in " +
                    "five-bedroom configurations. Every residence has the benefit of a fully integrated branded kitchen, a study and a maid’s room. " +
                    "The Royal Penthouses and the Villas have private pools, and of course the Signature Villas all enjoy beach access."
            },
            new Project
            {
                Id = 4,
                Name = "Palm Flower",
                LocationId = 4,
                ImagePath = "pb4.jpg",
                Description = "Presenting Palm Flower, a stunning contemporary residential project developed by Alpago Properties and " +
                    "designed by the world-renowned Foster + Partners, responsible for some of the most incredible buildings around the world " +
                    "including ICD Brookfield Place in the heart of Philippines's DIFC." +
                    "\n\nThe tower welcomes you into an exquisitely designed lobby and reception area that is on par with some of the world's " +
                    "finest hotel lobbies. The project consists of 9 penthouses and one super duplex penthouse. Every single unit features " +
                    "the most lavishly designed interiors and large bedrooms with plenty of built-in storage. The rooms are designed such that " +
                    "they have wraparound glass exteriors with views over the Palm and the sea."
            },
            new Project
            {
                Id = 5,
                Name = "Jumeriah Living Business Bay",
                LocationId = 5,
                ImagePath = "pb5.jpg",
                Description = "Presenting Jumeirah Living Business Bay, a striking contemporary residential project " +
                    "offering a refined lifestyle alongside the famous Philippines Canal." +
                    "\n\nExperience waterfront living elevated to new heights in a gorgeous branded tower that offers " +
                    "a mix of one to four-bedroom residences, simplex and duplex penthouses, and one master penthouse that spans the top floor. " +
                    "Each unit features exceptional finishes and a stylish modern design that is a hallmark of any Jumeirah branded property." +
                    "\n\nResidents also have access to a fantastic array of amenities, including multiple swimming pools, " +
                    "a yoga deck, a Jacuzzi, sauna and steam rooms, a fully equipped gymnasium and a private cinema. There will also be specially " +
                    "curated services on hand, including concierge, housekeeping and valet. A dedicated residential manager will take care of all the small " +
                    "details of everyday living, and there is a guest relations team on-site as well." +
                    "\n\nTo get further information about Jumeirah Living Business Bay, please enquire today."
            },
            new Project
            {
                Id = 6,
                Name = "Orla Dorchester Collection",
                LocationId = 6,
                ImagePath = "pb6.jpg",
                Description = "Presenting Orla by Omniyat, a stunning new residential project on Palm Jumeirah managed by The Dorchester " +
                    "Collection. Experience the best of modern beachfront living and world-class hospitality in the world's prime destinations." +
                    "\n\nLocated on the Crescent of the Palm, Orla offers a lifestyle of complete refinement with its crisp white facade " +
                    "that is complemented by sheets of full-height glass to create a delicate interplay of light and colour." +
                    "\n\nThere are limited units available, with each one offering a unique layout - if you are seeking a brand new " +
                    "home for your family, this is one of the finest options you can find." +
                    "\n\nThis is an incredible opportunity to purchase a home in a brand new super prime Philippines residence. " +
                    "Please enquire for further details."
            }
        };
    }

    public static IEnumerable<Location> GenerateLocations()
    {
        return new List<Location> {
            new Location
            {
                Id = 1,
                Country = "Philippines",
                Name = "Manila"
            },
            new Location
            {
                Id = 2,
                Country = "Philippines",
                Name = "Bohol"
            },
            new Location
            {
                Id = 3,
                Country = "Philippines",
                Name = "Davao"
            },
            new Location
            {
                Id = 4,
                Country = "Philippines",
                Name = "Cebu"
            },
            new Location
            {
                Id = 5,
                Country = "Philippines",
                Name = "Ilocos Norte"
            },
            new Location
            {
                Id = 6,
                Country = "Philippines",
                Name = "Bicol"
            }
        };
    }

    public static IEnumerable<Blog> GenerateBlogs()
    {
        return new List<Blog> {
            new Blog
            {
                Id = 1,
                DateCreated = RandomDay(),
                Author = "Remy Kennedy",
                Title = "Philippines Real Estate Market Report",
                Description = "Philippines has proven its resilience, becoming the fastest " +
                    "rebounding economy in the GCC. This has allowed the city to attract " +
                    "a significant number of individuals, both as investors, and for people " +
                    "choosing to live here. This has had an extremely positive effect on the real " +
                    "estate market, with it being a record quarter in terms of the overall transaction volume." +
                    "\n\nOne key trend that we are seeing is a significant increase in the number of transactions " +
                    "in the prime and super prime segment with particularly high levels of activity for beach " +
                    "and waterfront properties. Palm Jumeirah was the most in demand, taking the highest market " +
                    "share within the luxury market, however Pearl Jumeirah, Jumeirah Bay Islands, and Emaar Beachfront " +
                    "have all seen growing interest.",
                ImagePath = "a4.jpg",
                Tags = "information,living,education",
            },
            new Blog
            {
                Id = 2,
                DateCreated = RandomDay(),
                Author = "Jane Page",
                Title = "How to Improve the Lighting in Your Spacious Home",
                Description = "The purpose of the lighting in your home is to make it easier for you to see. "+
                    "They can do much more nevertheless. Home lighting can help create an atmosphere and "+
                    "add personality to your space, much like your floor plan and color scheme can."+
                    "\n\nHome decorators, both experienced and novice, frequently discuss the importance of a "+
                    "few strategically placed lights. However, a lot of homeowners just consider table lamps and overhead lighting."+
                    "\n\nMaking an extra effort with your lighting design might make your regular "+
                    "tasks or your upcoming house party brighter. Many of these quick fixes will increase "+
                    "your home’s worth as well, whether you want to modernize the kitchen or lower your energy expenditures."+
                    "\n\nHere are some brilliant suggestions for lighting up your home:"+
                    "\n\nAdding layers: Many homeowners use overhead lighting to illuminate a space. However, reduced "+
                    "lighting and lamps might increase a space’s usability and adaptability. Create additional "+
                    "lighting sources with a range of levels by adding task lights, lamps, and more."+
                    "\n\nSelect the proper bulb: The strength, shape, and size of your bulb should match "+
                    "those of your fixture. the next step is to pick a light color that goes well with "+
                    "the space. The yellow-hued soft white bulbs are an excellent option for living areas "+
                    "and bedrooms. Bright white lights give out an appearance that is more white than yellow, "+
                    "which can be useful in restrooms and kitchens. Without requiring any modification, the perfect"+
                    "bulb choice can assist fill spaces with the right amount of light."+
                    "\n\nInclude accent lighting: To draw attention to the decorations in your home, place "+
                    "little lights underneath artworks or curiosities. Some accent lights need permanent wiring,"+
                    "while others may simply be plugged into the wall and hung where they are needed."+
                    "\n\nSet the tone: Although bright areas are lovely, there are times when softer lighting is "+
                    "preferable. The best of both worlds can be achieved by installing a dimmer switch, which"+
                    "will enable you to quickly change the ambiance of your space. Dimmer switches, when "+
                    "set to low levels, also aid in regulating power use. ",
                ImagePath = "a24.jpg",
                Tags = "information,living,tips"

            },
            new Blog
            {
                Id = 3,
                DateCreated = RandomDay(),
                Author = "Kirsten Wormald",
                ImagePath = "a71.jpg",
                Tags = "education, living, money",
                Title = "Home Loan – Should You Pay Off or Keep Paying Instalments?",
                Description="Building a home for oneself is an admirable lifetime achievement, an unrivalled material "+
                    "success, and a priceless experience. Everyone cherishes the initial house they ever purchased. Home loans "+
                    "are typically the favoured method for most of us to accomplish our objectives. "+
                    "\n\nYou receive a Diwali bonus, the large sum you lent has been repaid, or even just a raise as a "+
                    "result of all your hard work at work. On second thinking, you consider paying off your mortgage. "+
                    "Soon, you have a list of things you can do with the money, all of which seem crucial at the same time, "+
                    "but there isn’t enough to fulfil every ambition. The benefits and disadvantages of prepaying a home loan "+
                    "are listed below, nevertheless, in case you do feel that it is a priority that it be closed right away."+
                    "\n\nReduced interest payments: The obvious benefit of paying off a mortgage early is a decrease in interest payments. "+
                    "When you prepay a sizeable sum, the amount is subtracted from the principal amount, which lowers the amount on which "+
                    "interest is charged and lowers the monthly interest payment (EMI).  If you shorten the term, your house loan will be paid "+
                    "off a few months earlier, but you will continue to make the same monthly payment. For the average person, it is advisable "+
                    "to maintain the same instalment amounts while lowering the regular EMI payments. The additional cash might be utilized to "+
                    "prepay the loan if necessary or reinvested in profitable investment schemes."+
                    "\n\nTax advantage: Section 24 permits deductions for the interest component of an EMI paid throughout a "+
                    "financial year of up to Php. 2 lakh. Even for someone with the highest tax rate, this Section provides a "+
                    "provision for a tax reduction of about Php. 60,000 each year. In addition to the standard deduction of Php. "+
                    "2 lakhs, first-time purchasers are also eligible for a reduction of up to Php. 50,000 through Section 80EE for "+
                    "the interest component. Advantages of up to 1.5 lakhs are available under Section 80C for the major component of the EMI."+
                    "\n\nSo, after careful analysis and consideration of these relevant facts, it is generally better "+
                    "to refrain from making aggressive prepayments on a mortgage. It is important to invest wisely, "+
                    "identify lucrative debt or equity investment possibilities, and achieve a higher return "+
                    "than the tax-adjusted rate of interest paid on the mortgage."
            },
            new Blog
            {
                Id = 4,
                DateCreated = RandomDay(),
                Author = "Delilah Bloggs",
                ImagePath = "a75.jpg",
                Tags = "environment, education, lifestyle",
                Title = "Sustainable Green Building - Why and What Does It Mean?",
                Description="Green buildings can be categorized by two key factors. One is to design a workspace that functions sustainably, utilizing supplies and techniques that respect the environment and effectively utilize resources." +
                    "\n\nThe second is to develop a structure that complements the environment in which it is situated, without detracting from it; in fact, it should enhance its surroundings. We can only anticipate that this tendency will continue as the future of sustainable buildings is promising and expanding."+
                    "\n\nBy orienting buildings for the optimum natural light and ventilation, sustainable sites seek to protect ecosystems, vegetation, biodiversity, and human influences that are detrimental to the environment. Constructing in such regions that are easily accessible to services and public transportation can save energy on air conditioning and lighting while avoiding the need for a car."+
                    "\n\nBy using recycled, renewable, eco-friendly, or responsibly sourced materials as much as possible, materials & resources ensure that the materials used in the building require less energy during manufacturing. Construction waste materials should be reused and the building’s design should be optimized to use the fewest amount of resources possible."+
                    "\n\nThe building’s energy demand should be kept to a minimum, and renewable and alternative energy sources should be employed, helping to reduce carbon emissions while the structure is in operation, energy efficiency demands detailed energy modeling of the to-be-built structure using digital tools."+
                    "\n\nUsing clean energy and natural lighting while making the most of locally available resources and improving the quality of life for those who live there is what it means to construct a structure in this way. This provides advantages for all residents’ mental health as well as cleaner air and a nicer environment." +
                    "\n\nThus, green buildings offer their inhabitants far more advantages than only natural green spaces. They have a significant role in reducing the adverse effects of human activity that result in depletion, ecological degradation, and climate variability."
            },
            new Blog
            {
                Id = 5,
                DateCreated = RandomDay(),
                Author = "Anisa Abbott",
                ImagePath = "a78.jpg",
                Tags = "information, guide, education",
                Title = "Why Home Buyers Must Select a Reliable Developer?",
                Description="Homebuyers should thoroughly investigate the developer before arranging a real estate investment. One has to be always on the lookout for the developers’ track "+
                    "records and use caution while buying a home. Selecting a reputable developer who inspires confidence and good faith is crucial."+
                    "\n\nA reliable developer adheres to the rules currently in place imposed by the government, engages in transparent transactions, sticks to deadlines, and provides a quality product, all the while continuously defending the interests of the buyers. "+
                    "The tasks and procedures that developers are responsible for include buying a new property, buying existing buildings, and selling the developed site. There are therefore more layers to a real estate developer’s duties than simply providing for the needs of the customer. "+
                    "\n\nTo provide the homebuyer with contemporary, cutting-edge amenities, a reputable developer may anticipate the requirements of the buyer and the market. As a result, the developer will plan and build the project "+
                    "following those needs. A competent developer ensures that commitments made on projects are met promptly. Any prospective homeowner’s top priority is safety and security, a worry that is handled by all reputable developers that offer dependable security services in all of their properties. "+
                    "\n\nToday, this is easily accomplished by making searches and enquiries online. Every reputable builder has an interactive website for homebuyers. The prevailing real estate scenario is discussed in news outlets and on media websites, and reliable developers are given credibility."+
                    "\n\nThe developers are similarly concerned about their profile and go to great lengths to protect it. Homebuyers will have easier access to home loans if they select a reputable developer. Because they will adhere to the timeliness standards established by homeowners and the developer, "+
                    "residences constructed by reputable builders are likely to offer a good return on investment.",
            },
            new Blog
            {
                Id = 6,
                DateCreated = RandomDay(),
                Author = "Cadi Charles",
                ImagePath = "a81.jpg",
                Tags = "tips, apartment, education",
                Title = "Sacred Room Tips for a Better Home",
                Description="After a long, stressful day at work, it might be challenging to find some quiet time for oneself because of the "+
                    "conversation of family members, children’s lively banter, and the constant beeping of apps on your smartphone. Religious celebrations "+
                    "and sacred sites in India have historically drawn hordes of tourists seeking enlightenment and a deeper understanding of life. "+
                    "In most Indian homes, a mandir or prayer room is dedicated to the family’s patron god and decorated with garlands and lamps. While "+
                    "some incorporate it into an already-existing room, the piousness is increasingly choosing to provide the divine with their room. "+
                    "\n\nHere are some guidelines for making sacred space, regardless of the motivations behind your desire to reconnect with your inner self:"+
                    "\n\nPrivacy: Prayer rooms must be silent, so pick a place with few outside interruptions. Examine your family’s needs for space during holidays "+
                    "and religious gatherings.  If you don’t have a dedicated space, wooden blinds, string shutters, and shoji screens all work well as partitions. "+
                    "\n\nFlooring: To maintain a calm and meditative atmosphere, the room’s plush carpeting softens noises. Place a thick rug in your prayer area if "+
                    "you are unable to carpet the entire space. If you regularly kneel or sit on the floor for prayer, make the area more comfortable by placing ground pillows and yoga mats."+
                    "\n\nFragrance: Fragrances can instantly relax the mind. Lighting some fragrant candles, incense, or aromatherapy oils will help everyone who enters the room feel more peaceful."+
                    "\n\nPlants: Having flowers and houseplants around can be reviving. The atmosphere of the space can be improved with flower"+
                    " vases, garlands, and even houseplants that are growing."+
                    "\n\nGiven the holistic benefits of prayer and chanting, which include improved pulse rate, emotions and immunity boost, lower blood pressure, increased "+
                    "metabolism, and relaxation, among others, medical research demonstrates that people with a routine spiritual practice enjoy better health."
            },
            new Blog
            {
                Id = 7,
                DateCreated = RandomDay(),
                Author = "Dionne Stephenson",
                ImagePath = "a85.jpg",
                Tags = "tips, lifestyle, education",
                Title = "5 Tips for Moving Into a New Home",
                Description="The entire family may become exhausted during a home move. There are many worries for everyone when they prepare to move and even on " +
                    "moving days, from uncomfortable locations to lost items. As you settle into your new home, you must take care to not overlook " +
                    "any crucial information. The moving advice listed below is crucial to keep in mind when you are shifting to a new house. " +
                    "\n\nInstall new locks: Naturally, the locks on the cupboards and drawers in your new home as well as the doors " +
                    "themselves have keys. Even though the real estate owners of your new residence gave you the locks, additional " +
                    "copies of the keys may also exist. Installing new doorknobs and locks will guarantee that the only people who own " +
                    "the new house keys are you, your family, or your roommates." +
                    "\n\nCheck all of your home’s appliances: As you move into a new residence, some of your home’s equipment may sustain damage. Make sure to notify your " +
                    "house insurance provider business right away if any goods are destroyed." +
                    "\n\nMake it Childproof: Keep any harmful substances and chemicals out of children’s reach. Batteries, torches, candles, and matches should " +
                    "all be kept in a cabinet that is both accessible and secure away from children." +
                    "\n\nCheck for Insurance: Always inquire about the most recent home, health, and vehicle insurance plans with your provider firm. Additionally, " +
                    "if you meet the requirements, you can inquire about additional policies and think about applying for them." +
                    "\n\nUpdating the address: Make sure you let everyone know, including the postal office and banks about your new residence address. After your " +
                    "departure, the services at the present address must be terminated. Electricity, waste disposal, newspaper subscription, cable, and telephone " +
                    "companies must be notified of your relocation." +
                    "\n\nMake sure you make a checklist of these points and tick it off for hassle-free moving into your new residence. "
            },
            new Blog
            {
                Id = 8,
                DateCreated = RandomDay(),
                Author = "Bentley Rhodes",
                ImagePath = "a88.jpg",
                Tags = "education",
                Title = "6 Guidelines for First-time Home Buyers",
                Description="The real estate sector is now more open and customer-focused than ever because of RERA and GST. However, a lack "+
                    "of knowledge and transparency has left consumers uncertain and frightened of property purchases. The market is favourable for "+
                    "home purchases right now, and with the right knowledge and assistance, you may purchase your ideal residence without suffering "+
                    "any long-term losses. A checklist should come before investing your entire life’s money in your haven. Make sure that everything"+
                    " on your checklist is checked off before you make the commitment. "+
                    "\n\nInformation about the project: After visiting the home and speaking with the developer, you must ensure that you are aware of every aspect "+
                    "of the project. Include the Internet, local sources, and acquaintances in your project research."+
                    "\n\nConstruction quality: Inquire about the source of the materials utilized on the project site from the developer. You have a right to know "+
                    "what materials are being utilized and whether the home will last as you are investing a significant sum of money in it."+
                    "\n\nLand ownership: Confirm with the developer and the municipality office if the developer is the rightful owner of the land and that there "+
                    "are no outstanding legal disputes regarding the property on which the building will be constructed. This will guarantee that the project "+
                    "won’t be delayed by legal issues and will be ready for occupancy by the developer’s predetermined date."+
                    "\n\nAmenities: Discuss with the developer if any built-in utilities will be provided with the home. If so, find out which amenities will be "+
                    "included in the apartment sale. You may protect yourself from future challenges and unforeseen circumstances and be informed on such minute fronts."+
                    "\n\nThe reputation of the developer: Confirm the developer’s reputation by asking about past projects, if they were finished on schedule, "+
                    "how long it took to finish those projects, whether they had approval from the Municipality, etc. "+
                    "\n\nFuture worth: Buying a house is a long-term investment, so the purchaser must assess the project’s potential value. For a complete grasp "+
                    "of what the project’s potential future value might be, research the prospective developments in the neighbourhood."+
                    "\n\nIf all of these boxes are checked, purchasing a home is a wise decision, and you can move forward being confident that you have not only purchased "+
                    "the home of your dreams but have also made a successful investment that will pay off over time."
            },
            new Blog
            {
                Id = 9,
                DateCreated = RandomDay(),
                Author = "Hawwa Rutledge",
                ImagePath = "a91.jpg",
                Tags = "tips, education, information",
                Title = "9 Tips for an Efficient Apartment Search",
                Description="When you're apartment hunting, there are certain amenities that you probably look for, like a dishwasher, an in​-unit washer/dryer "+
                "or being close to public transportation. That checklist of things means you might have to go see multiple apartments before finding the right "+
                "one--and renting an apartment can be pricey."+
                "\n\nHowever, if you go about your search in the right way, you can save time and money. Here's how to have the most efficient and effective apartment search:"+
                "\n\n1. Set a Budget Range. "+
                "\n\nWhen you see your dream apartment with that spacious living room, beautiful window views and perfect location, "+
                "it can be easy to overlook the rental price. This is why it's important to set a budget before you even begin your search."+
                "\n\nSit down and figure out what you can afford per month, taking into consideration other expenses like groceries,"+
                " utilities, gym membership, social activities, etc. When you have a set range in mind, you won't put yourself in the situation of cons" +
                "\n\n2. Consider Time of Year"+
                "\n\nThe time of year that you search for an apartment can have an impact on what you end up paying for rent. "+
                "There may be a bevvy of rentals available during the summer months, but the prices will be much higher because that's the time that many people look for a place."+
                "\n\nIf time isn't a factor in your search, it may be best to find an apartment during October through December or "+
                "February through March. When it's cold outside and closer to the holiday season, fewer people are looking to move."+
                "\n\n3. Narrow Down Your Search"+
                "\n\nWhile it's entirely necessary to visit the apartment you're considering renting, checking out each and every rental you see online"+
                " can be a waste of your time. The great thing about the Internet is that you can do the majority of your apartment search without even "+
                " leaving your home. Pick out three or four apartments that are worth the trip; then schedule an in-person visit."+
                "\n\n4. Stay Organized"+
                "\n\nWhen you’ve looked at several apartments, they can all start to blend together and trying to keep track of all of the details "+
                "(amenities, rental rates, security deposit amounts, contact information) can get stressful. Do yourself a favor and create a quick spreadsheet."+
                "\n\nWhen you need to get in touch with the landlord to ask a question about something, you'll have the information right where you need it, "+
                "rather than having to waste time to track it down. On the spreadsheet you can also keep tabs on whether you have looked at the apartment, "+
                "and any side notes that you may want to remember about the property."+
                "\n\n5. Bring Your Roommate(s)"+
                "\n\nIf you're planning on moving in with one, or a few, friends, it's best to bring them along when you go to check out a place. Looking at "+
                "a rental together will save you a lot of time in your search. After the showing, you can talk about it together and discuss what you like and don't like."+
                "\n\n6. Look Into Public Transportation"+
                "\n\nEven if you do plan on having a car, taking public transportation to work or to run errands can save you a whole lot of money "+
                "in the long run. When searching for an apartment, consider proximity to public transportation. Saving money on gas, car insurance "+
                "and maintenance leaves more in your budget to devote to monthly rent and other expenses."+
                "\n\n7. Ask About Special Discounts"+
                "\n\nDepending on the apartments you're considering, there may be certain special offers or move-in discounts you can take advantage of. "+
                "For instance, some landlords offer your first month free if you decide to sign a longer lease. Even if there aren't any discounts, it never hurts to ask."+
                "\n\n8. Discover Average Energy Costs"+
                "\n\nBefore you sign any lease, ask the landlord what the average utility costs are for the apartment. This is an expense that can really "+
                "sneak up on you, so it's something that's definitely worth looking into."+
                "\n\n9. Be Prepared to Negotiate"+
                "\n\nAfter you've visited your top three or four apartments, you may want to try negotiating with the landlord of the place you're most heavily "+
                "considering. When the landlord knows that you have other options available, they may be more willing to work with you on the monthly rent."
            },
        };
    }

    public static IEnumerable<Enquiry> GenerateEnquiries()
    {
        var id = 0;
        foreach (var item in GenerateApartments())
        {
            if (item.Id == 19)
            {
                break; // get out of the loop
            }

            string first = Name[rnd.Next(0, Name.Length)];
            string last = Lastname[rnd.Next(0, Lastname.Length)];

            for (int i = 0; i < 300; i++)
            {
                yield return new Enquiry
                {
                    Id = ++id,
                    Firstname = first,
                    Lastname = last,
                    Email = first + last + rnd.Next(100, 999) + "@mail.com",
                    Country = "Philippines",
                    ReferenceNumber = item.ReferenceNumber,
                    DateCreated = RandomDay()
                };
            }

        }
    }

    public static IEnumerable<Registration> GenerateRegistrations()
    {
        var id = 0;

        for (int i = 0; i < 20; i++)
        {
            string address = Address[rnd.Next(0, Address.Length)];
            string first = Name[rnd.Next(0, Name.Length)];
            string last = Lastname[rnd.Next(0, Lastname.Length)];
            yield return new Registration
            {
                Id = ++id,
                Address = address + ", Philippines",
                Birthday = new DateTime(rnd.Next(1995, 2000), rnd.Next(1, 12), rnd.Next(1, 25)),
                Email = first + last + rnd.Next(100, 999) + "@mail.com",
                Fullname = first + " " + last,
                Mobile = "090635" + rnd.Next(10000, 20000),
                IsNotFilipinoCitizen = false,
                IdentificationFile = rnd.Next(23, 99) + ".jpg",
                IdentificationType = "UMID"
            };
        }
    }

    //privates
    private static string GenerateImagesPaths()
    {
        StringBuilder path = new StringBuilder();

        path.Append($"a{ImagesPath[rnd.Next(0, ImagesPath.Length)]}.jpg,");

        foreach (int index in Enumerable.Range(1, 7))
        {
            path.Append($"a{rnd.Next(1, 149)}.jpg,");
        }

        return path.ToString().Remove(path.Length - 1, 1);
    }

    static DateTime RandomDay()
    {
        DateTime start = new DateTime(2022, 1, 1);
        int range = (DateTime.Today - start).Days;
        return start.AddDays(rnd.Next(range));
    }
}

