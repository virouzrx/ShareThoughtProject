import '../../../Home/Home.css';

function AuthorInfoAndCreateDate(props) {
    if (props.showInfo) {
    return (
        <div className="post-author-and-info">
            <img className="card-author-avatar" src={props.authorPic} />
            <p className="author-name-and-date">{props.authorName}</p>
            <div className="vr"></div>
            <p className="author-name-and-date">props</p>
        </div>
    );}
    else {
        return (<div></div>);
    }
}

export default AuthorInfoAndCreateDate;