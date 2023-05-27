export default function Page() {
  return (
    <div className="absolute inset-0 grid h-full w-full place-items-center overflow-clip">
      <video autoPlay controls className="h-full w-full object-cover">
        <source
          src="https://res.cloudinary.com/dprte0rm8/video/upload/v1685144622/ManzanarProject_Video01_003_k0bjul.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
