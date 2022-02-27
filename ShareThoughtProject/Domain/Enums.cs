namespace ShareThoughtProjectApi.Domain
{
    public class Enums
    {
        public enum GeneralFlagReason
        {
            Racism,
            Nudity,
            GraphicImagery,
            Fakenews,
            HatePropagation,
            Persecution,
            Spam
        }
        public enum FlagStatus
        {
            NotFlagged, 
            FlaggedAndWaiting, 
            FlaggedAndDeleted, 
            FlaggedAndLeft
        }
        public enum UserStatus
        {
            Normal, 
            Warned, 
            MutedTemporarily, 
            MutedPernamently
        }
        public enum ReportedEntityType
        {
            Post,
            Comment
        }
    }
}
