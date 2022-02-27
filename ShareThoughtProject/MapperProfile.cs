using AutoMapper;
using ShareThoughtProjectApi.Contracts.V1.Responses;
using ShareThoughtProjectApi.Domain;

namespace ShareThoughtProjectApi
{
    public class MapperProfile : Profile
    {
        public MapperProfile() 
        {
            CreateMap<Post, PostResponse>();
            CreateMap<Hashtag, HashtagResponse>();
            CreateMap<Comment, CommentResponse>();
            CreateMap<AppUser, UserInfoResponse>();
        }
    }
}
