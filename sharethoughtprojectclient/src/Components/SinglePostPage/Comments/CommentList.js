import Comment from "./Comment";

const CommentList = (props) => {
    
    const comments = [];
    
    for (let index = 0; index < 5; index++) {
        comments.push(<Comment></Comment>)
    }

    return ( <div>{comments}</div> );
}
 
export default CommentList;