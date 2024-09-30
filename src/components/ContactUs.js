const ContactUs = () => {
  return (
    <div>
      <div className="font-bold text-3xl p-4 m-4">Contact Us</div>
      <div>
        <input
          type="text"
          placeholder="Name"
          className="border border-black p-2 m-2"
        />
        <input
          type="text"
          placeholder="Message"
          className="border border-black p-2 m-2"
        />
        <button className=" bg-black text-white  rounded-lg text-sm p-2 m-2">
          Submit
        </button>
      </div>
    </div>
  );
};
export default ContactUs;
