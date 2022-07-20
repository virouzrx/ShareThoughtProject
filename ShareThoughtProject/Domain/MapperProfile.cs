using AutoMapper;
using ShareThoughtProjectApi.Contracts.V1.Requests;
using ShareThoughtProjectApi.Contracts.V1.Responses;
using ShareThoughtProjectApi.Data;
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
            CreateMap<PromotionRequest, PromotionRequestResponse>();
            CreateMap<CreatePostRequest, Post>();
        }
    }
}
