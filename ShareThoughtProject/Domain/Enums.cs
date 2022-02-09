namespace ShareThoughtProject.Domain
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
            Persecution
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
        public enum CommentFlag
        {
            Racism, 
            Vulgarisms, 
            Persecution, 
            Fakenews,
            HatePropagation,
            Spam
        }
    }
}
