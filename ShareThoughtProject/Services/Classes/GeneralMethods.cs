namespace ShareThoughtProjectApi.Services
{
    public static class GeneralMethods
    {
        public static int Vote(this int entityToVote, bool isUpvote)
        {
            if (isUpvote)
                entityToVote++;
            else
                entityToVote--;
            return entityToVote;
        }
    }
}
