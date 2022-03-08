using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;
using RestSharp;
using ShareThoughtProjectApi.Config;
using static ShareThoughtProjectApi.Domain.AutoModerationResult;

namespace ShareThoughtProjectApi.Services
{
    public class PerspectiveApiService : IPerspectiveApiService
    {
        private readonly IPerspectiveConfig _perspectiveConfig;
        private readonly HttpClient _httpClient;
        public PerspectiveApiService(IPerspectiveConfig perspectiveConfig, HttpClient client)
        {
            _perspectiveConfig = perspectiveConfig;
            _httpClient = client;
        }
        public async Task<AutoModerationStatus> AutoModerateComment(string content)
        {
            var url = "https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=" + _perspectiveConfig.GetKey();
            _httpClient.BaseAddress = new Uri(url);
            var request = new HttpRequestMessage(new HttpMethod("POST"), url);
            request.Content = new StringContent("{comment: {text: \"" + content + "}\"},\n languages: [\"en\"],\n requestedAttributes: {PROFANITY:{},THREAT:{},IDENTITY_ATTACK:{},SEXUALLY_EXPLICIT:{}}}");
            request.Content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");
            var response = await _httpClient.SendAsync(request);
            var jsonResponse = await response.Content.ReadAsStringAsync();
            var perspectiveEntity = JsonConvert.DeserializeObject<PerspectiveApiEntity>(jsonResponse);
            int profanityScore = Convert.ToInt32(Math.Round(perspectiveEntity.attributeScores.PROFANITY.summaryScore.value));
            int identityAttackScore = Convert.ToInt32(Math.Round(perspectiveEntity.attributeScores.IDENTITY_ATTACK.summaryScore.value));
            int threatScore = Convert.ToInt32(Math.Round(perspectiveEntity.attributeScores.THREAT.summaryScore.value));
            int sexuallyExplicitScore = Convert.ToInt32(Math.Round(perspectiveEntity.attributeScores.SEXUALLY_EXPLICIT.summaryScore.value));

            if (profanityScore > 60 && profanityScore < 75 ||
                identityAttackScore > 60 && identityAttackScore < 75 ||
                threatScore > 60 && threatScore < 75 ||
                sexuallyExplicitScore > 60 && sexuallyExplicitScore < 75)
            {
                return AutoModerationStatus.FLAG;
            }
            if (profanityScore > 75 ||
                identityAttackScore > 75 ||
                threatScore > 75 ||
                sexuallyExplicitScore > 75)
            {
                return AutoModerationStatus.REJECT;
            }
            return AutoModerationStatus.OK;
        }
    }
}
