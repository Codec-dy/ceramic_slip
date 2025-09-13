import React, { useState } from 'react';
import { sendEmail } from '../../crud';
import { Context } from '../../context/CeramicContext';
import { useContext } from 'react';


const Email = ({ onSubmit,to }) => {
  const [emailData, setEmailData] = useState({
    to: '',
    subject: 'Your Ceramic Slip Has Been Successfully Completed',
    message: 'Hi! \nThis is ArtHaus. Your ceramic(s) has been fired and is ready for pick up at ArtHaus on Washington and Broadway. We are open Monday - Saturday 10am - 6pm. Please tell those at the front desk which items you are picking up. \n\nThank you for your patience and we look forward to seeing you soon!\n\nBest,\nArtHaus Team',
  });
  const { api, adminAttachments,setAdminAttachments, } = useContext(Context);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({ ...emailData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    emailData.to = to;
    const retVal = await sendEmail(api+"api/sendEmail", emailData,adminAttachments); // Pass email data to the parent component or backend
    console.log(retVal)
    if (retVal) {
        setEmailData({ to: '', subject: '', message: '' });
        setAdminAttachments([])         
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Send an Email
        </h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="to"
          >
            To
          </label>
          <input
            type="email"
            id="to"
            name="to"
            value={to?to:''}
            onChange={handleChange}
            placeholder="Recipient's email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            disabled
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="subject"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={emailData.subject}
            onChange={handleChange}
            placeholder="Email subject"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={emailData.message}
            onChange={handleChange}
            placeholder="Write your message here..."
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
            required
          ></textarea>
        </div>
        {adminAttachments &&<div className='flex flex-row gap-2 mb-2 flex-wrap'>
            {adminAttachments.map((file, index) => (<img key={index} src={file} className='w-[30px]'/>))}
        </div>}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Send Email
          </button>
        </div>
      </form>
    </div>
  );
};

export default Email;