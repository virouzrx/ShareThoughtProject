import HorizontalPostList from "../../Home/PostsContainers/HorizontalPostList";

const NewPostsWrapper = () => {
    return (  <p><HorizontalPostList postAmount={3} pageSize={3} pageNumber={1} endpoint="new"></HorizontalPostList></p>);
}
 
export default NewPostsWrapper;