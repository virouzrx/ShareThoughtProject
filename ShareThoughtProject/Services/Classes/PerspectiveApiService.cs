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
            double profanityScore = Convert.ToDouble(perspectiveEntity.attributeScores.PROFANITY.summaryScore.value);
            double identityAttackScore = Convert.ToDouble(perspectiveEntity.attributeScores.IDENTITY_ATTACK.summaryScore.value);
            double threatScore = Convert.ToDouble(Math.Round(perspectiveEntity.attributeScores.THREAT.summaryScore.value));
            double sexuallyExplicitScore = Convert.ToDouble(Math.Round(perspectiveEntity.attributeScores.SEXUALLY_EXPLICIT.summaryScore.value));

            if (profanityScore > 0.75 ||
                identityAttackScore > 0.75 ||
                threatScore > 0.75 ||
                sexuallyExplicitScore > 0.75)
            {
                return AutoModerationStatus.REJECT;
            }

            if (profanityScore > 0.6 && profanityScore < 0.75 ||
                identityAttackScore > 0.6 && identityAttackScore < 0.75 ||
                threatScore > 0.6 && threatScore < 0.75 ||
                sexuallyExplicitScore > 0.6 && sexuallyExplicitScore < 0.75)
            {
                return AutoModerationStatus.FLAG;
            }

            return AutoModerationStatus.OK;
        }
    }
}
