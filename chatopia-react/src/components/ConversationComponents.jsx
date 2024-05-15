import styled from "styled-components";
import { messagesList } from "../Data";
import { ProfileImage ,SearchContainer, SearchInput } from "./ContactListComponents";
import { FaAngleDoubleRight, FaRegGrinBeam } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";

const ChatBox =styled.div`
display: flex;
background: #f0f0f0;
padding: 10px;
align-items: center;
bottom : 0;
`;

const EmojiImage =styled.img`
width:30px;
height: 28px;
opacity: 0.4;
cursor: pointer;
`;
const MessageContainer = styled.div`
display: flex;
flex-direction: column;
height: 100%;
background: #e5ddd6;
`;

const MessageDiv = styled.div`
justify-content: ${(props) => (props.isYours ?'flex-end':'flex-start') };
display:flex;
margin: 5px 16px;
`;

const Message = styled.div`
background: ${(props) => (props.isYours ?"#daf8cb":"white" )};
max-width:50%;
color: #303030;
padding: 8px 10px;
font-size: 19px;
`;

function Container({children}){
    return (
        <div className="conversation">
            {children}
        </div>
    )
}

function ProfileHeader({src}){
    return (
        <div className="profile-header">
            <ProfileImage src={src}/>
            Anubhav Sharma
        </div>
    );
}

function InputContainer({children}){
    return (
        <div className="input-container">
            {children}
        </div>
    );
}

function MessageInput(){
    return (
        <input className="msg-input" placeholder="Type a message"/>
    );
}

const ConversationComponent = () => {
    return (
    <Container>
        <ProfileHeader src="/logo192.png"/>
        <MessageContainer>
            {messagesList.map((messageData) => (
                <MessageDiv isYours={messageData.senderID === 0}>
                  <Message isYours={messageData.senderID === 0}>{[messageData.text]} </Message>
                </MessageDiv>
            ))}
        </MessageContainer>
        <ChatBox>
            <InputContainer>
                <div className="btn-group add-btn-group">
                    <button> <FaRegGrinBeam /> </button>
                    <button><FaCirclePlus /></button>
                </div>

                <MessageInput />
                <div className="btn-group send-btn-group">
                    <button> <FaAngleDoubleRight /></button>
                </div>
            </InputContainer>
        </ChatBox>
        </Container>
    );
};
export default ConversationComponent;