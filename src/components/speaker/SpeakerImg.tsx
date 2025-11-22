"use client";
import React from "react";
import Image from "next/image";

export const SpeakerImg = ({src}: {src: string}) => {
    return (
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        <div className="h-[30rem] w-fit flex items-center justify-center ">
            <PinContainer
                title="Anant Bhardwaj"
                href="https://twitter.com/mannupaaji"
            >
                <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                    <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500">
                        <Image src={src} alt="anant" layout="fill" />
                    </div>
                </div>
            </PinContainer>
=======
=======
>>>>>>> Stashed changes
        <div className="relative w-full h-full">
            <Image
                src={src}
                alt="Speaker"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
            />
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
        </div>
    );
}
