import { useState, useEffect } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Sidebar,
  Search,
  ConversationList,
  Conversation,
  ConversationHeader,
  Avatar,
  EllipsisButton,
  TypingIndicator,
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

function App() {
  const [message, setMessage] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("disconnect", () => {
      socket.off("test");
      console.log("disconnected");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const onChangeMessage = (e) => {
    if (e.length > 0 || e != null || e != undefined) {
      let newData = [...message, { sender: "me", message: e.toString() }];
      setMessage(newData);
      console.log(newData);
    }
  };

  const selectChat = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <div
      style={{
        height: "600px",
        position: "relative",
      }}
    >
      <MainContainer responsive>
        <Sidebar position="left" scrollable={true}>
          <Search placeholder="Search..." />
          <ConversationList>
            <Conversation
              name="Lilly"
              active={true}
              onClick={selectChat}
              lastSenderName="Lilly"
              info="Yes i can do it for you"
            ></Conversation>
          </ConversationList>
        </Sidebar>

        {selectedChat != null ? (
          <ChatContainer>
            <ConversationHeader>
              <ConversationHeader.Back />
              <ConversationHeader.Content />
            </ConversationHeader>
            <MessageList>
              {message.map(
                (data, index) =>
                  data.message.length > 0 && (
                    <Message
                      key={index}
                      model={{
                        message: data.message,
                        sentTime: "15 mins ago",
                        sender: data.sender,
                        direction: "outgoing",
                        position: "single",
                      }}
                    >
                      <Message.Header sentTime="just now" />
                    </Message>
                  )
              )}
            </MessageList>

            <MessageInput
              placeholder="Type message here"
              onSend={onChangeMessage}
            />
          </ChatContainer>
        ) : (
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p>NChat</p>
          </div>
        )}
      </MainContainer>
    </div>
  );
}

export default App;
