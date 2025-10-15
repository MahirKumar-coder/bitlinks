"use client"
import Link from 'next/link'
import React, { useState } from 'react'

// Icon for the copy button
const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zM-1 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/>
  </svg>
);


const Shorten = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState('');

  const generate = async () => {
    if (!url) {
      setError("Please enter a URL to shorten.");
      return;
    }
    setLoading(true);
    setError("");
    setGeneratedUrl("");
    setCopySuccess("");

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "url": url,
      "shorturl": shortUrl // This can be optional on the backend
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    try {
      const response = await fetch("/api/generate", requestOptions);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }
      
      // Make sure NEXT_PUBLIC_HOST is defined in your .env.local file
      const host = process.env.NEXT_PUBLIC_HOST || window.location.origin;
      setGeneratedUrl(`${host}/${result.shorturl}`);
      setUrl("");
      setShortUrl("");

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedUrl) {
      navigator.clipboard.writeText(generatedUrl).then(() => {
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(''), 2000); // Hide message after 2 seconds
      }, (err) => {
        setCopySuccess('Failed to copy');
      });
    }
  };

  return (
    // Responsive container
    <div className='w-full max-w-lg mx-auto my-12 sm:my-16 p-6 sm:p-8 rounded-lg bg-purple-100 shadow-xl flex flex-col gap-4'>
      
      {/* Responsive heading */}
      <h1 className='font-bold text-xl sm:text-2xl text-center text-gray-800'>Generate your short URLs</h1>
      
      <div className='flex flex-col gap-3'>
        <div>
            <label htmlFor="longUrl" className="text-sm font-medium text-gray-600 ml-1">Your URL</label>
            <input 
                id="longUrl"
                type="text"
                value={url}
                className='w-full p-3 border border-gray-300 focus:outline-purple-600 rounded-md transition-shadow'
                placeholder='https://example.com/very-long-url'
                onChange={e => setUrl(e.target.value)} 
            />
        </div>

        <div>
            <label htmlFor="shortUrl" className="text-sm font-medium text-gray-600 ml-1">Custom short name (optional)</label>
            <input 
                id="shortUrl"
                type="text"
                value={shortUrl}
                className='w-full p-3 border border-gray-300 focus:outline-purple-600 rounded-md transition-shadow'
                placeholder='e.g., my-cool-link'
                onChange={e => setShortUrl(e.target.value)} 
            />
        </div>
        
        <button 
            onClick={generate} 
            disabled={loading}
            className='bg-purple-500 rounded-lg shadow-lg p-3 my-3 font-bold text-white hover:bg-purple-600 transition-colors disabled:bg-purple-300 disabled:cursor-not-allowed'
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {error && <p className="text-red-500 text-center bg-red-100 p-2 rounded-md">{error}</p>}

      {generatedUrl && (
        <div className="mt-4 p-4 bg-purple-200 rounded-lg">
          <span className='font-bold text-lg text-gray-800'>Your Short Link:</span>
          <div className="flex items-center justify-between gap-2 mt-2 bg-white p-2 rounded-md">
            <code className="text-purple-700 break-all">
              <Link target='_blank' href={generatedUrl} className="hover:underline">
                {generatedUrl}
              </Link>
            </code>
            <button onClick={copyToClipboard} className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors" title="Copy to clipboard">
              <CopyIcon />
            </button>
          </div>
          {copySuccess && <p className="text-green-600 text-sm mt-2 text-right">{copySuccess}</p>}
        </div>
      )}
    </div>
  )
}

export default Shorten;
