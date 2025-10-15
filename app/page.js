import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-purple-100">
      {/* Layout Changes: 
        - Mobile default: 1 column (grid-cols-1)
        - Medium screens and up (md): 2 columns (md:grid-cols-2)
        - flex flex-col-reverse taki mobile par image upar dikhe
      */}
      <section className="flex flex-col-reverse md:grid md:grid-cols-2 min-h-[60vh] md:min-h-[50vh]">
        
        {/* Left Column: Text Content */}
        <div className="flex flex-col gap-6 p-8 items-center justify-center text-center md:items-start md:text-left">
          
          {/* Responsive Font Size */}
          <p className="text-3xl md:text-4xl font-bold text-gray-800">
            The best URL shortener in the Market.
          </p>
          
          {/* Padding Fix: 'px-56' hatakar max-w lagaya */}
          <p className="max-w-lg text-gray-600">
            We are the most straightforward URL Shortener in the world. Most URL shorteners will track you or ask for your details. We understand your needs and have created this privacy-focused URL shortener.
          </p>
          
          {/* Responsive Button Alignment */}
          <div className='flex gap-4 justify-center md:justify-start'>
            <Link href="/shorten">
                <button className='bg-purple-500 rounded-lg shadow-lg px-6 py-3 font-bold text-white hover:bg-purple-600 transition-transform hover:scale-105'>
                    Try Now
                </button>
            </Link>
            <Link href="/github">
                <button className='bg-gray-700 rounded-lg shadow-lg px-6 py-3 font-bold text-white hover:bg-gray-800 transition-transform hover:scale-105'>
                    GitHub
                </button>
            </Link>
          </div>
        </div>

        {/* Right Column: Image */}
        {/* Image Handling: Mobile par fixed height (h-64), desktop par full height */}
        <div className="relative h-64 w-full md:h-full">
          <Image 
            className="mix-blend-darken object-contain" 
            alt="A vector graphic illustrating URL shortening" 
            src={"/vector.png"} 
            fill={true} 
            priority={true} // Add priority for LCP image
          />
        </div>

      </section>
    </main>
  );
}