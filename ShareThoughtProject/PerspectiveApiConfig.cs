using System.Collections.Generic;

namespace ShareThoughtProject
{
    public class PerspectiveApiConfig
    {
        public AttributeScores attributeScores { get; set; }
        public List<string> languages { get; set; }
        public List<string> detectedLanguages { get; set; }
    }
    public class Score
    {
        public double value { get; set; }
        public string type { get; set; }
    }

    public class SpanScore
    {
        public int begin { get; set; }
        public int end { get; set; }
        public Score score { get; set; }
    }

    public class SummaryScore
    {
        public double value { get; set; }
        public string type { get; set; }
    }

    public class TOXICITY
    {
        public List<SpanScore> spanScores { get; set; }
        public SummaryScore summaryScore { get; set; }
    }

    public class LIKELYTOREJECT
    {
        public List<SpanScore> spanScores { get; set; }
        public SummaryScore summaryScore { get; set; }
    }

    public class PROFANITY
    {
        public List<SpanScore> spanScores { get; set; }
        public SummaryScore summaryScore { get; set; }
    }

    public class INSULT
    {
        public List<SpanScore> spanScores { get; set; }
        public SummaryScore summaryScore { get; set; }
    }

    public class IDENTITYATTACK
    {
        public List<SpanScore> spanScores { get; set; }
        public SummaryScore summaryScore { get; set; }
    }

    public class THREAT
    {
        public List<SpanScore> spanScores { get; set; }
        public SummaryScore summaryScore { get; set; }
    }

    public class SEXUALLYEXPLICIT
    {
        public List<SpanScore> spanScores { get; set; }
        public SummaryScore summaryScore { get; set; }
    }

    public class SEVERETOXICITY
    {
        public List<SpanScore> spanScores { get; set; }
        public SummaryScore summaryScore { get; set; }
    }

    public class AttributeScores
    {
        public PROFANITY PROFANITY { get; set; }
        public IDENTITYATTACK IDENTITY_ATTACK { get; set; }
        public THREAT THREAT { get; set; }
        public SEXUALLYEXPLICIT SEXUALLY_EXPLICIT { get; set; }
    }
}
