import React from "react";
import { useEffect, useState, useContext } from "react";
import { handleError, handleSuccess } from "../utils";
import { UserContext } from "./UserContext";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

function Chat() {
  const [users, setUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showMessages, setShowMessages] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [message, setMessage] = useState("");
  const { user } = useContext(UserContext);
  const [socketId, setSocketId] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const navigate = useNavigate();

  const getuser = async () => {
    try {
      const response = await fetch("http://localhost:3000/getuser", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();

      if (response.ok) {
        setUsers(result[0]);
        handleSuccess("All user display on the left side");
      }
    } catch (error) {
      console.error(error);
      handleError("Something went wrong");
    }
  };

  useEffect(() => {
    if (loggedInUser) {
      const socket = io("http://localhost:3000", {
        transports: ["websocket"],
        withCredentials: true,
        query: { userId: loggedInUser },
      });
      setSocketId(socket);

      socket?.on("getOnlineUsers", (onlineUser) => {
        setOnlineUsers(onlineUser);
      });

      return () => {
        socket.close();
      };
    }
  }, [loggedInUser]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(
        `http://localhost:3000/send/${selectedUser._id}`,
        {
          method: "POST",
          body: JSON.stringify({ message }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const resu = await resp.json();
      if (resp.ok) {
        setMessage("");
      } else {
        handleError("Unable to send any message at the moment");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!socketId) return;
    const handleIncomingMessage = (newMessage) => {
      setShowMessages((prev) => [...(prev || []), newMessage]);
    };
    socketId.on("newMessage", handleIncomingMessage);
    return () => socketId.off("newMessage", handleIncomingMessage);
  }, [socketId]);

  const handleselect = async (element) => {
    setSelectedUser(element);
    try {
      const response = await fetch(`http://localhost:3000/get/${element?._id}`, {
        credentials: "include",
        method: "GET",
      });
      const result = await response.json();
      if (response.ok) {
        setShowMessages(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getuser();
  }, []);

  useEffect(() => {
    const container = document.getElementById("message-container");
    container?.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  }, [showMessages]);

  useEffect(() => {
    if (user?._id) {
      localStorage.setItem("myUserId", user._id);
      setLoggedInUser(user._id);
    } else {
      const storedId = localStorage.getItem("myUserId");
      if (storedId) setLoggedInUser(storedId);
    }
  }, [user]);

  const Logout = async () => {
    try {
      const respo = await fetch("http://localhost:3000/logoutuser", {
        method: "GET",
        credentials: "include",
      });
      localStorage.removeItem("myUserId");
      navigate("/login");
      if (respo.ok) handleSuccess("User Logout");
    } catch (error) {
      console.error(error);
    }
  };

  const isUserOnline = (id) => onlineUsers?.some((userId) => userId.toString() === id?.toString());

  return (
    <div className="container mx-auto shadow-2xl rounded-xl h-screen flex flex-col bg-gradient-to-br from-yellow-100 to-orange-200">
      <div className="px-5 py-4 flex justify-between items-center bg-white border-b-2">
        <h1 className="font-bold text-3xl text-gray-700">GoingChat 🚀</h1>
        <button
          onClick={Logout}
          className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-2/5 border-r-2 bg-white overflow-y-auto max-h-full scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-orange-100">
          <div className="h-full">
            {users?.map((u, i) => {
              const isOnline = isUserOnline(u._id);
              return (
                <div
                  key={i}
                  onClick={() => handleselect(u)}
                  className="cursor-pointer p-4 hover:bg-orange-100 transition flex flex-col gap-1 border-b"
                >
                  <div className="font-semibold text-lg text-gray-800">{u.name}</div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isOnline ? "bg-green-500" : "bg-gray-400"
                      }`}
                    ></div>
                    <span className="text-sm text-gray-600">
                      {isOnline ? "Online" : "Offline"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {selectedUser && (
          <div className="flex flex-col flex-1">
            <div className="h-14 bg-white border-b flex items-center px-6 shadow-sm justify-between">
              <span className="font-medium text-gray-700">
                Chatting with: {selectedUser.name}
              </span>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isUserOnline(selectedUser._id) ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></div>
                <span className="text-sm text-gray-600">
                  {isUserOnline(selectedUser._id) ? "Online" : "Offline"}
                </span>
              </div>
            </div>

            <div
              id="message-container"
              className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-stone-100 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            >
              {showMessages?.map((ele, idx) => {
                const isMe =
                  loggedInUser?.toString() === ele.senderId.toString();
                return (
                  <div
                    key={idx}
                    className={`flex w-full ${
                      isMe ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`py-2 px-4 rounded-xl max-w-xs shadow-md text-sm ${
                        isMe
                          ? "bg-blue-600 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {ele.message}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="py-4 px-6 bg-white border-t shadow-md">
              <div className="relative flex items-center">
                <input
                  autoFocus
                  className="w-full pl-5 pr-14 py-3 rounded-full bg-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none"
                  type="text"
                  placeholder="Type your message here..."
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl text-blue-600 hover:text-blue-800"
                  onClick={handleSendMessage}
                >
                  ➤
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
