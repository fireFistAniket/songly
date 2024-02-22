import React, { useContext, useEffect, useState } from "react";
import LeftNav from "../components/LeftNav";
import RightNav from "../components/RightNav";
import { IoAdd } from "react-icons/io5";
import { FaFile } from "react-icons/fa";
import { MusicContext } from "../contexts/MusicContext";
import { initializeDB, saveAudio } from "../utils/db";

const Addmusic = ({ music, audio, setAudio, setIsUploaded }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { Musicstate, Musicdispatch } = useContext(MusicContext);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const audioBlob = await selectedFile.arrayBuffer();
        const audioUrl = URL.createObjectURL(
          new Blob([audioBlob], { type: "audio/mp3" })
        );
        const db = await initializeDB();
        await saveAudio(db, {
          musicData: new Blob([audioBlob], { type: "audio/mp3" }),
          musicName: selectedFile.name,
        });
        setIsUploaded(false);
        // Musicdispatch({
        //   type: "ADDMUSIC",
        //   payload: { musicData: audioUrl },
        // });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <main className="flex justify-evenly gap-8">
      <LeftNav />
      <div className="flex flex-col items-center gap-4 m-4">
        <h1 className="text-4xl capitalize font-bold">add a music</h1>
        <div className="w-[45vw]">
          <input
            type="file"
            accept=".mp3"
            id="mp3Upload"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="mp3Upload"
            className="flex items-center justify-center border rounded-lg border-slate-500 text-7xl cursor-pointer"
          >
            <IoAdd />
          </label>
        </div>
        {selectedFile && (
          <div className="flex items-center gap-2 text-xl text-neutral-300">
            <FaFile /> <h2 className="font-semibold">{selectedFile.name}</h2>
          </div>
        )}
        <button
          type="button"
          onClick={handleUpload}
          className="px-4 py-2 border rounded-lg border-slate-500 bg-gradient-to-r from-red-500 via-rose-500 to-white bg-clip-text text-transparent capitalize font-semibold text-lg"
        >
          add
        </button>
      </div>
      <RightNav music={music} setAudio={setAudio} />
    </main>
  );
};

export default Addmusic;
