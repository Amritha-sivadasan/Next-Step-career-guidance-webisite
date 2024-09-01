  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import Modal from "react-modal";
  import { toast } from "react-toastify";

  
  Modal.setAppElement("#root");

  const MeetingPage: React.FC = () => {
    const [meetingId, setMeetingId] = useState<string>("");
    const [inputMeetingId, setInputMeetingId] = useState<string>("");
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const createMeeting = () => {
    
      const newMeetingId = `meeting-${Math.random()
        .toString(36)
        .substring(2, 9)}`;
      const meetingUrl = `${window.location.origin}/meeting-start/${newMeetingId}`;

    
      setMeetingId(meetingUrl);
      setInputMeetingId(meetingUrl);
      setModalIsOpen(true); 
    };


    const copyToClipboard = () => {
      navigator.clipboard.writeText(meetingId);
      toast("Meeting link copied to clipboard!");
    };

   
    const joinMeeting = () => {
      if (inputMeetingId.startsWith("http")) {

        const extractedId = inputMeetingId.split("/").pop();
        navigate(`/meeting-start/${extractedId}`);
      } else {
        navigate(`/meeting-start/${inputMeetingId}`);
      }
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-[url('https://example.com/your-background-image.jpg')]  p-4">
        <h2 className="text-3xl font-bold mb-6">Create or Join a Meeting</h2>

     
        <div className="mb-6">
          <button
            onClick={createMeeting}
            className="bg-blue-950 text-white py-2 px-6 rounded-md hover:bg-blue-900"
          >
            Generate Meeting Link
          </button>
        </div>

        <hr className="border-white mb-6" />


        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter Meeting ID or Paste Link"
            value={inputMeetingId}
            onChange={(e) => setInputMeetingId(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          />
          <button
            onClick={joinMeeting}
            className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600"
          >
            Join Meeting
          </button>
        </div>

    
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Meeting Link Modal"
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              padding: "20px",
              maxWidth: "400px",
              width: "100%",
              borderRadius: "8px",
              backgroundColor: "#333", 
              color: "#fff",
            },
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.75)",
            },
          }}
        >
          <h2 className="text-xl font-semibold mb-4">Meeting Link Generated</h2>
          <p className="mb-2">Your meeting link:</p>
          <input
            type="text"
            readOnly
            value={meetingId}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md bg-gray-800 text-white"
          />
          <button
            onClick={copyToClipboard}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2"
          >
            Copy Link
          </button>
          <button
            onClick={() => setModalIsOpen(false)}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Close
          </button>
        </Modal>
      </div>
    );
  };

  export default MeetingPage;
