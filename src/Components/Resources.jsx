import React, { useState } from "react";

const Resources = ({IsCreating}) => {
  const [Preview, setPreview] = useState(false);
  const [IsEditing, setIsEditing] = useState(false);

  const [imageURL, setImageURL] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [resourceLink, setResourceLink] = useState('');
  const [uploadImage, setUploadImage] = useState(null);

  const handleImageUpload = (e) => {
      const file = e.target.files[0];
      setUploadImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log({ title, description, resourceLink, imageURL, uploadImage });
      setImageURL('');
      setTitle('');
      setDescription('');
      setResourceLink('');
      setUploadImage(null);
  };

  return (
    <div className="h-auto w-auto bg-red-5000 p-7 overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <div
          className="bg-white h-[350px] w-full rounded shadow overflow-hidden cursor-pointer"
        >
        <div onClick={() => setPreview(!Preview)}>

          <div className="w-full h-[55%] bg-yellow-500">
            <img
              className="h-full w-full object-cover"
              src="https://images.pexels.com/photos/879109/pexels-photo-879109.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
          </div>
          <div className="p-3 flex flex-col justify-start gap-3">
            <h1 className="font-bold">Title Node js and react</h1>
            <p className="Overflow-Text-Dot text-gray-500 text-sm ">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum,
              debitis rem nesciunt inventore voluptatem laborum cumque, sequi
              saepe nam dolor in ea, veritatis corrupti repellat exercitationem
              aspernatur id! Maiores, doloribus.
            </p>
            
         
          </div>
        </div>
            <button  className="bg-blue-400 ml-2 text-white px-2 rounded-md items-center">
              <a target="_blank" href="https://www.google.com" >Learn</a>
            </button>
        </div>







        {Preview && (
          <div className="bg-white absolute h-auto w-[300px]  left-[53%] top-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded shadow overflow-hidden ">
            <div className="w-full h-[250px] bg-yellow-500">
              <img
                className="h-full w-full object-cover"
                src="https://images.pexels.com/photos/879109/pexels-photo-879109.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
            </div>
            <div className="p-3 flex flex-col justify-start gap-3">
              {
                IsEditing?<input type="text" placeholder="Title" className="border p-2 border-gray-500 rounded-sm" />:<h1 className="font-bold">Title Node js and react</h1>}
              <div id="Para-Div" className="w-full h-[200px] overflow-scroll">
                {IsEditing ? (
                  <textarea
                    placeholder="Enter the discription"
                    className="border-gray-600 border w-[260px] h-[150px] p-2"
                    type=""
                  />
                ) : (
                  <p className=" text-gray-500 text-sm ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Omnis dolore voluptatem laborum cumque, sequi saepe nam
                    dolor in ea, veritatis corrupti repellat exercitationem
                    aspernatur id! Maiores, doloribus.
                  </p>
                )}
              </div>
              <div className="flex gap-4">
                {IsEditing ? (
                  <>
                    <button className="bg-blue-500 text-white px-2 rounded-md items-center">
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(!IsEditing)}
                      className="bg-gray-400 text-white px-2 rounded-md items-center"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button className="bg-red-500 text-white px-2 rounded-md items-center">
                      Delete
                    </button>
                    <button
                      onClick={() => setIsEditing(!IsEditing)}
                      className="bg-blue-400 text-white px-2 rounded-md items-center"
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
        {IsCreating&& <div className="bg-white absolute h-auto w-[350px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="w-full h-[100px] bg-gray-100 rounded-md overflow-hidden">
                    {uploadImage || imageURL ? (
                        <img
                            src={uploadImage || imageURL}
                            alt="Preview"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            No image selected
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-gray-600 font-semibold">Image URL</label>
                    <input
                        type="text"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                        placeholder="Enter Image URL"
                        className="border p-2 rounded-md border-gray-300"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-gray-600 font-semibold">Or Upload Image</label>
                    <input
                        type="file"
                        onChange={handleImageUpload}
                        className="p-2 border border-gray-300 rounded-md"
                        accept="image/*"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-gray-600 font-semibold">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter Title"
                        className="border p-2 rounded-md border-gray-300"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-gray-600 font-semibold">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter Description"
                        className="border p-2 rounded-md border-gray-300 h-[100px]"
                    ></textarea>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-gray-600 font-semibold">Resource Link</label>
                    <input
                        type="text"
                        value={resourceLink}
                        onChange={(e) => setResourceLink(e.target.value)}
                        placeholder="Enter Resource Link"
                        className="border p-2 rounded-md border-gray-300"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 transition-all"
                >
                    Submit
                </button>
            </form>
        </div>
}
      </div>
    </div>
  );
};

export default Resources;
