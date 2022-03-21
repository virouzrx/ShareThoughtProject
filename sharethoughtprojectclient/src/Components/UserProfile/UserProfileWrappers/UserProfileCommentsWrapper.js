import UserProfileUserSingleComment from "../UserProfileSubComponents/UserProfileUserSingleComment";

const CommentList = (props) => {

    const comments = [];

    for (let index = 0; index < 5; index++) {
        comments.push(<UserProfileUserSingleComment></UserProfileUserSingleComment>)
    }

    return (<div>{comments}</div>);
}

export default CommentList;