using AutoMapper;
using ShareThoughtProject.Contracts.V1.Responses;
using ShareThoughtProject.Domain;

namespace ShareThoughtProject
{
    public class MapperProfile : Profile
    {
        public MapperProfile() 
        {
            CreateMap<Post, PostResponse>();
            CreateMap<Hashtag, HashtagResponse>();
            CreateMap<Comment, CommentResponse>();
        }
    }
}
