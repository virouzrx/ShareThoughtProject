﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShareThoughtProjectApi.Contracts
{
    public static class ApiRoutes
    {
        public const string Root = "api";
        public const string Version = "v1";
        public const string Base = Root + "/" + Version;
        public static class Posts
        {
            public const string GetAll = Base + "/posts";
            public const string Get = Base + "/posts/{postId}";
            public const string GetUserLast5Posts = Base + "/posts/{userId}/last";
            public const string GetUserLast5LikedPosts = Base + "/posts/{userId}/lastliked";
            public const string Create = Base + "/posts";
            public const string Update = Base + "/posts/{postId}";
            public const string Delete = Base + "/posts/{postId}";
            public const string Vote = Base + "/posts/vote/{postId}/{userId}/{isUpvote}";
            public const string PopularToday = Base + "/posts/popularToday";
            public const string TopThisWeek = Base + "/posts/topThisWeek";
            public const string New = Base + "/posts/new/{pageSize}/{pageNumber}";
            public const string Search = Base + "/posts/search/{phrase}/{pageSize}/{pageNumber}";
        }

        public static class Moderation
        {
            public const string RequestPromotion = Base + "/requestPromotion";
            public const string GetRequestPromotion = Base + "/requestPromotion/{id}";
            public const string ResolvePromotionRequest = Base + "/resolvePromotionRequest";
            public const string PromotionRequests = Base + "/promotionRequests/{pageSize}/{pageNumber}/{resolved}";
        }

        public static class Identity
        {
            public const string Login = Base + "/identity/login";
            public const string Register = Base + "/identity/register";
            public const string Refresh = Base + "/identity/refresh";
            public const string Confirm = Base + "/identity/confirm/";
            public const string Promote = Base + "/identity/promote/";
        }

        public static class Hashtags
        {
            public const string GetAll = Base + "/allHashtags";
            public const string Follow = Base + "/follow/{hashtagId}";
        }

        public static class Comments
        {
            public const string GetAllPostsComments = Base + "/getPostComments/{postId}";
            public const string GetUserLast5Comments = Base + "/comments/user/{userId}";
            public const string GetAllPostsCommentsPaginated = Base + "/getPostCommentsPaginated/{postId}/{pageSize}/{pageNumber}";
            public const string CreateComment = Base + "/comments/{postId}";
            public const string CreateSubComment = Base + "/subcomments/{postId}";
            public const string Update = Base + "/comments/update/{commentId}";
            public const string Delete = Base + "/comments/{commentId}";
            public const string Vote = Base + "/comments/vote/{commentId}";
        }
        public static class Flags
        {
            public const string FlagEntity = Base + "/flag/{entityType}/{entityId}";
            public const string FlagComment = Base + "/flagComment{commentId}";
            public const string FlagPostResolve = Base + "/flagPostResolve{postId}";
            public const string FlagCommentResolve = Base + "/flagCommentResolve{commentId}";
        }

        public static class User
        {
            public const string GetAllUsers = Base + "/users/getall";
            public const string GetUserInfo = Base + "/users/{username}";
            public const string SearchUsers = Base + "/users/search/{phrase}/{pageSize}/{pageNumber}";
            public const string GetCreators = Base + "/users/creators/{pageSize}/{pageNumber}";
            public const string SetUserPhoto = Base + "/users/setuserphoto";
            public const string SetUserDescription = Base + "/users/setuserdescription";
        }

        public static class Health
        {
            public const string Ping = Base + "/ping";
        }

    }
}
