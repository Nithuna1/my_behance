import Image from "next/image";

type PhoneMockupProps = {
  src: string;
  alt: string;
};

export default function PhoneMockup({ src, alt }: PhoneMockupProps) {
  return (
    <div className="relative w-[260px] h-[540px]">

      {/* APP SCREEN */}
      <div
        className="
          absolute
          top-[28px]
          left-[18px]
          w-[224px]
          h-[484px]
          rounded-[26px]
          overflow-hidden
          z-10
          bg-white
        "
      >
        <Image
          src={src}
          alt={alt}
          width={224}
          height={484}
          className="object-cover"
        />
      </div>

      {/* PHONE FRAME */}
      <Image
        src="/mockups/iphone-frame.png"
        alt=""
        width={260}
        height={540}
        className="relative z-20 pointer-events-none"
        priority
      />
    </div>
  );
}
