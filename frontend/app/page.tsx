"use client";

import { useState } from "react";

export default function Home() {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // ファイル選択
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFileName(selectedFile.name);
      setFile(selectedFile);
    }
  };

  // アップロード
  const handleUpload = async () => {
    if (!file) {
      alert("ファイルを選択してください");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(
      "http://127.0.0.1:8000/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    alert("アップロード成功: " + data.filename);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          会議要約AI
        </h1>

        <p className="text-gray-600 mb-8">
          音声ファイルをアップロードしてください
        </p>

        <div className="border-2 border-dashed border-blue-300 rounded-2xl p-10 bg-blue-50 text-center">

          <input
            type="file"
            accept=".mp3,.wav,.m4a"
            onChange={handleFileChange}
            className="mb-4"
          />

          <p className="text-gray-700">
            {fileName || "ファイル未選択"}
          </p>
        </div>

        <button
          onClick={handleUpload}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-bold"
        >
          解析開始
        </button>
      </div>
    </div>
  );
}