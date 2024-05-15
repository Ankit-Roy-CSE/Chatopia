import styled from "styled-components";
import { contactList } from "../Data";
import { FaEllipsisV, FaCommentAlt, FaSearch } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";

function Container(){
    return(
        <div className="contact-list">
            <ProfileInfoDiv/>
            <SearchBox/>
            {contactList.map((userData)=>(
                <ContactComponent userData={userData}/>
            ))}
        </div>
    );
}

export function ProfileImage({src}){
    return(
        <img className="profile-image" src={src}/>
    );
}

function ProfileInfoDiv(){
    return(
        <div className="profile-info-div">
            <ProfileImage src="/logo192.png"/>
            <ControlIcons/>
        </div>
    );
}

function ControlIcons(){
    return(
        <div className="control-icons">
            <HiUserGroup title="Groups"/>
            <FaCommentAlt title="Messaging"/>
            <FaEllipsisV title="More"/>
        </div>
    );
}

function SearchBox(){
    return(
        <div className="search-box">
            <SearchContainer/>
            <SearchFilters />
        </div>
    );
}

export function SearchContainer(){
    return (
        <form className="search-container">
            <SearchInput/>
            <button><FaSearch /></button>
        </form>
    );
}

export function SearchInput(){
    return (
        <input className="search-input" placeholder="Search or start new chat"/>
    );
}

function SearchFilters(){
    return(
        <div className="search-filters">
            <span className="active">All</span>
            <span>Unread</span>
            <span>Groups</span>
        </div>
    );
}

function MessageText({children}){
    return (<span className="message-text">{children}</span>);
}

function ContactComponent(props){
    const { userData } = props;
    return ( 
    <div className="contact-item"> 
        <img className="profile-image profile-icon" src={userData.profilePic}/>
        <div className="contact-info">
            <span className="contact-name">{userData.name}</span>
            <MessageText>{userData.lastText}</MessageText>
        </div>
        <MessageText>{userData.lastTextTime}</MessageText>
    </div>
    );
};

function ContactListComponent(){
    return( 
        <Container>
            <ProfileInfoDiv/>
            <SearchBox/>
            {contactList.map((userData)=>(
            <ContactComponent userData={userData}/>
            ))}
        </Container>
    );
};

export default ContactListComponent;

