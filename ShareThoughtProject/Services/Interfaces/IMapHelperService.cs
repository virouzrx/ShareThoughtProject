using ShareThoughtProjectApi.Contracts.V1.Responses;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ShareThoughtProjectApi.Services.Interfaces
{
    public interface IMapHelperService
    {
        public Task<List<PostResponse>> AddCreatorInfo(List<PostResponse> postResponse);
        public Task<List<CommentResponse>> AddAuthorInfoAndPostTitle(List<CommentResponse> commentResponse);
        public Task<List<PromotionRequestResponse>> AddRequesterInfo(List<PromotionRequestResponse> promotionRequestResponses);
    }
}
