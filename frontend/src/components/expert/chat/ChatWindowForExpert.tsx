import React, { useEffect, useState, useRef } from "react";
import { useExpertChat } from "../../../hooks/useExpertChat";
import { useAppSelector } from "../../../hooks/useTypeSelector";
import { IAudio, IChat, IMessage } from "../../../@types/message";
import socket from "../../../config/socket";

import {
  getMessageByChatIdExpert,
  sendMessageByExpert,
  deleteMessageByExpert,
} from "../../../services/api/ChatApi";
import { IStudent } from "../../../@types/user";
import { FiTrash2 } from "react-icons/fi";
import ConfirmationModal from "../../common/modal/ConfirmationModal";
import { MdOutlineDoNotDisturb } from "react-icons/md";
import { FaImage } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import moment from "moment";
import { motion } from "framer-motion";
import { AiOutlineAudio, AiOutlineSend } from "react-icons/ai";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { MdDoneAll } from "react-icons/md";
import { ClipLoader } from "react-spinners";

const ChatWindowExpert: React.FC = () => {
  const {
    chatId,
    setLatestMessage,
    setChatId,
    setNotificationCount,
  } = useExpertChat();
  const { expert } = useAppSelector((state) => state.expert);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [student, setStudent] = useState<IStudent>();
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null
  );
  const [lastMessage, setLastMessage] = useState<string>("");
  const [isChatActive, setIsChatActive] = useState(false);
  const [recordingUrl, setRecordingUrl] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const userId = expert?._id;

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const isAutoScroll = useRef(true);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!expert) return;

    const fetchMessage = async () => {
      try {
        if (!chatId) return;
        const response = await getMessageByChatIdExpert(chatId?.toString());
        const notification = {
          chatId,
          count: 0,
        };
        setMessages(response.data.messages);
        setStudent(response.data.studentId);
        setLastMessage(response.data.latestMessage);
        setNotificationCount(notification);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessage();

    const handleReceiveMessage = (resultMessage: IMessage) => {
      if (resultMessage.senderId !== userId) {
        setMessages((prevMessages) => [...prevMessages, resultMessage]);
        if (resultMessage.text) {
          const latest = {
            studentId: resultMessage.senderId,
            lastMessage: resultMessage,
          };
          setLatestMessage(latest);
          setLastMessage(resultMessage._id);
        }
      }
    };
    const handleDeleteMessage = (message: IMessage) => {
      if (message.senderId !== userId) {
        if (message._id == lastMessage) {
          const deleteLatestMessage = {
            studentId: message.senderId,
            lastMessage: message,
          };
          setLatestMessage(deleteLatestMessage);
        }
        setMessages((prevMessages) =>
          prevMessages.map((existmessage) =>
            existmessage._id == message._id
              ? { ...existmessage, is_delete: true }
              : existmessage
          )
        );
      }
    };
    const handleSeenMessage = (Id: string, result: IMessage[]) => {
      if (Id !== userId) {
        setMessages((prevMessages) =>
          prevMessages.map((message) => {
            const updatedMessage = result.find(
              (msg) => msg._id.toString() === message._id.toString()
            );

            if (updatedMessage) {
              return { ...message, status: updatedMessage.status };
            }

            return message;
          })
        );
      }
    };

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server with id:", socket.id);
    });

    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("messageDeleted", handleDeleteMessage);
    socket.on("seenMessage", (userId, result) =>
      handleSeenMessage(userId, result)
    );

    if (chatId) {
      socket.emit("joinChat", { chatId, userId });
    }

    return () => {
      socket.off("seenMessage", handleSeenMessage);
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("messageDeleted", handleDeleteMessage);
      socket.emit("leaveChat", { chatId, userId });
    };
  }, [
    chatId,
    expert,
    isChatActive,
    lastMessage,
    setNotificationCount,
    setLatestMessage,
    userId,
  ]);

  useEffect(() => {
    if (chatId) {
      setIsChatActive(true);
    } else {
      setIsChatActive(false);
    }
  }, [chatId]);

  const sendMessage = async () => {
    if (newMessage && newMessage.trim() == "") return;

    setRecordingUrl("");
    setImagePreviewUrl("");
    const formData = new FormData();
    formData.append("text", newMessage);
    formData.append("senderId", userId || "");
    formData.append("chatId", chatId?.toString() || "");
    formData.append("timestamp", new Date().toISOString());
    if (audioBlob) {
      formData.append("audio", audioBlob, "audio.wav");
    }
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    const dummyMessage: IMessage = {
      _id: "",
      chatId: chatId!,
      senderId: userId!,
      text: newMessage,
      audio: audioBlob
        ? { url: URL.createObjectURL(audioBlob), type: "audio/wav" }
        : undefined,
      file: selectedFile ? URL.createObjectURL(selectedFile) : null,
      timestamp: new Date(),
      is_delete: false,
      status: "loading",
    };
    setMessages((prev) => [...prev, dummyMessage]);

    try {
      const response = await sendMessageByExpert(formData);
      setMessages((prev) =>
        prev.map((msg) => (msg._id === "" ? { ...response.data } : msg))
      );
      if (response.success) {
        const message = response.data;
        socket.emit("sendMessage", { chatId, message });

        const chat = response.data.chatId as IChat;
        const latest = {
          studentId: chat.studentId as string,
          lastMessage: message,
        };

        setNewMessage("");
        setLatestMessage(latest);
        setAudioBlob(null);
        setSelectedFile(null);
        setLastMessage(response.data._id);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const openDeleteConfirmationModal = (messageId: string) => {
    setSelectedMessageId(messageId);
    setIsModalOpen(true);
  };

  const deleteMessage = async (messageId: string) => {
    try {
      socket.emit("deleteMessage", { chatId, messageId });

      setMessages((prevMessages) => {
        const updatedMessages = prevMessages.map((message) =>
          message._id == messageId ? { ...message, is_delete: true } : message
        );
        if (
          updatedMessages.length === 1 &&
          updatedMessages[0]._id === messageId
        ) {
          return [
            {
              ...updatedMessages[0],
              text: "This message was deleted",
              is_delete: true,
            },
          ];
        }
        return updatedMessages;
      });

      const response = await deleteMessageByExpert(messageId);
      if (messageId == lastMessage) {
        const setLastDeletedMessage = {
          studentId: (response.data.chatId as IChat).studentId as string,
          lastMessage: response.data,
        };
        setLatestMessage(setLastDeletedMessage);
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer && isAutoScroll.current) {
      chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleScroll = () => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainer;
      if (scrollHeight - scrollTop > clientHeight + 50) {
        isAutoScroll.current = false;
      } else {
        isAutoScroll.current = true;
      }
    }
  };
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && file.size < 5000000) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      console.error("File is too large or of an invalid type.");
    }
  };

  const handleAudioRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        const audioChunks: BlobPart[] = [];
        mediaRecorder.ondataavailable = (event) => audioChunks.push(event.data);
        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks);
          setAudioBlob(audioBlob);
          setRecordingUrl(URL.createObjectURL(audioBlob));
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    }
  };

  const shouldShowSendIcon = newMessage || audioBlob || selectedFile;

  const groupedMessages = messages.reduce((acc, message) => {
    const date = moment(message.timestamp).format("YYYY-MM-DD");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(message);
    return acc;
  }, {} as Record<string, IMessage[]>);

  const handleChatId = () => {
    setChatId(null);
  };

  return (
    <div
      className={`flex-1 flex flex-col   ${
        !chatId ? "hidden sm:hidden lg:block  md:block" : ""
      }`}
    >
      <div className="md:hidden lg:hidden mb-3 cursor-pointer  ">
        <FaArrowAltCircleLeft size={24} onClick={handleChatId} />
      </div>
      {chatId ? (
        <div className="flex-1 flex flex-col">
          {student && (
            <div className="flex items-center bg-blue-950 h-16 text-white p-4">
              <div className="flex items-center max-w-11 h-11 rounded-full overflow-hidden ms-4">
                <img
                  src={student.profile_picture}
                  alt="userProfile"
                  className="w-11 h-11 object-cover rounded-full"
                />
              </div>
              <div className="ms-4 flex flex-col">
                <span className="text-lg font-semibold">
                  {student.user_name}
                </span>
              </div>
            </div>
          )}

          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 no-scrollbar"
            style={{ maxHeight: "calc(80vh - 120px)" }}
            onScroll={handleScroll}
          >
            {Object.keys(groupedMessages).map((date) => (
              <div key={date}>
                <div className="text-gray-500 text-center my-4">
                  {moment(date).format("MMMM D, YYYY")}
                </div>
                {groupedMessages[date].map((message) => (
                  <div
                    key={message._id}
                    className={`group flex ${
                      message.senderId === userId
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`relative flex p-2 rounded-lg shadow mb-1 ${
                        message.senderId !== userId
                          ? "bg-green-200 text-right"
                          : "bg-gray-200 text-left"
                      }`}
                    >
                      <div>
                        {message.is_delete ? (
                          <>
                            <span className="flex text-gray-500 gap-1">
                              <span className="mt-1">
                                <MdOutlineDoNotDisturb size={18} />
                              </span>
                              This message was deleted
                            </span>
                          </>
                        ) : (
                          <>
                            {message.text}
                            <div className="flex ">
                              {message.audio && (
                                <>
                                  <audio
                                    controls
                                    className="w-48 sm:w-64 md:w-72 lg:w-80"
                                  >
                                    <source
                                      src={(message.audio as IAudio).url}
                                      type="audio/wav"
                                    />
                                    Your browser does not support the audio
                                    element.
                                  </audio>
                                </>
                              )}
                            </div>

                            {message.file && (
                              <>
                                {message.status == "loading" && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-70">
                                    <ClipLoader color="#3498db" size={32} />
                                  </div>
                                )}
                                <img
                                  src={message.file}
                                  alt="uploaded file"
                                  className="w-32 h-32"
                                />
                              </>
                            )}
                          </>
                        )}
                      </div>
                      <div className="flex justify-end place-items-end gap-1">
                        <span className="ms-2 flex text-xs text-gray-500">
                          {moment(message.timestamp).fromNow()}
                        </span>
                        <span>
                          {message.senderId === userId &&
                            !message.is_delete &&
                            message.status !== "loading" && (
                              <>
                                {message.status == "seen" ? (
                                  <MdDoneAll color="green" />
                                ) : (
                                  <MdDoneAll />
                                )}
                              </>
                            )}
                        </span>
                      </div>
                      {/* Delete Button only for current user's messages */}
                      {message.senderId === userId &&
                        !message.is_delete &&
                        message.status !== "loading" && (
                          <button
                            className="absolute top-0 right-0 mt-1 mr-1 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() =>
                              openDeleteConfirmationModal(message._id)
                            }
                          >
                            <FiTrash2 />
                          </button>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <div ref={messagesEndRef} />
            <ConfirmationModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onConfirm={() => {
                if (selectedMessageId) {
                  deleteMessage(selectedMessageId);
                }
                setIsModalOpen(false);
              }}
              messageId={selectedMessageId || ""}
            />
          </div>
          <div className="relative w-5/12">
            {imagePreviewUrl && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={imagePreviewUrl}
                  alt="Image Preview"
                  className="max-w-full max-h-60 object-cover rounded-lg border"
                />
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setImagePreviewUrl("");
                  }}
                  className="absolute top-0 right-0 mt-2 mr-2 h-6 text-white w-6 rounded-lg bg-red-500"
                >
                  X
                </button>
              </motion.div>
            )}
          </div>
          <div className="flex items-center bg-blue-950 p-4">
            {!isRecording && !recordingUrl && (
              <div className="">
                <label htmlFor="file-upload">
                  <FaImage
                    className="text-gray-500 cursor-pointer"
                    size={24}
                    color="white"
                  />
                </label>
                <input
                  type="file"
                  accept="image/*, .pdf, .doc, .docx, .xlsx"
                  onChange={handleFileChange}
                  id="file-upload"
                  className="absolute opacity-0 cursor-pointer"
                  key={imagePreviewUrl}
                />
              </div>
            )}

            <div className="flex items-center flex-1 ms-2">
              {!recordingUrl && (
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message"
                  className="flex-1 border border-gray-300 rounded-lg p-2 mr-2"
                />
              )}

              <button
                onClick={handleAudioRecording}
                className={`mr-2  ${
                  isRecording ? "text-red-500" : "text-white"
                }`}
              >
                {isRecording ? (
                  <motion.div
                    className="relative flex items-center justify-center"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <AiOutlineAudio size={24} />
                  
                  </motion.div>
                ) : (
                  <>
                    {!recordingUrl && !newMessage && !imagePreviewUrl && (
                      <AiOutlineAudio size={24} />
                    )}
                  </>
                )}
              </button>
              {recordingUrl && (
                <div className="flex justify-end w-full">
                  <button
                    className="p-3"
                    onClick={() => {
                      setRecordingUrl(""), setAudioBlob(null);
                    }}
                  >
                    <MdDeleteForever size={24} color="white" />
                  </button>
                  <audio controls src={recordingUrl} className="mr-2">
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}

              {shouldShowSendIcon && (
                <button
                  onClick={sendMessage}
                  className="bg-blue-500 text-white p-2 rounded-full"
                >
                  <AiOutlineSend />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex justify-center items-center">
          <p>Select a chat to start messaging</p>
        </div>
      )}
    </div>
  );
};

export default ChatWindowExpert;
