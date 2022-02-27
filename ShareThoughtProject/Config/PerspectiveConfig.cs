namespace ShareThoughtProjectApi.Config
{
    public class PerspectiveConfig : IPerspectiveConfig
    {
        public string Key; 
        public PerspectiveConfig(string key)
        {
            Key = key;
        }

        public string GetKey()
        {
            return Key;
        }
    }
}
