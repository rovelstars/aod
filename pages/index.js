import Head from "next/head";
import { useEffect, useRef } from "react";
import jsmediatags from "jsmediatags";
export default function Home() {
  let hour, minute;
  hour = useRef(null);
  minute = useRef(null);
  useEffect(() => {
    const date = new Date();
    //show time in digital format
    hour.current.innerHTML =
      date.getHours() > 12
        ? `0${date.getHours() - 12}`
        : date.getHours() < 10
        ? `0${date.getHours()}`
        : date.getHours();
    minute.current.innerHTML =
      date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
  }, [new Date().getMinutes()]);

  useEffect(() => {
    if (globalThis.window) {
      let playButton = document.querySelector("#play");
      let pauseButton = document.querySelector("#pause");
      //music file located at /burnthehouse.mp3
      //show visualizer and play music
      window.audio = new Audio("/burnthehouse.mp3");
      jsmediatags.read("http://localhost:3000/burnthehouse.mp3", {
        onSuccess: function (tag) {
          const { data, format } = tag.tags.picture;
          let base64String = "";
          for (let i = 0; i < data.length; i++) {
            base64String += String.fromCharCode(data[i]);
          }
          document.querySelector("#albumArt").src = `data:${
            data.format
          };base64,${window.btoa(base64String)}`;
          document.querySelector("#albumArt").classList.remove("hidden");
          document.querySelector("#songName").innerHTML = tag.tags.title;
          document.querySelector("#artist").innerHTML = tag.tags.artist;
          document.querySelector("#music").classList.remove("hidden");
        },
        onError: function (error) {
          console.log(error);
        },
      });
      playButton.addEventListener("click", () => {
        audio.play();
        playButton.style.display = "none";
        pauseButton.style.display = "block";
      });
      pauseButton.addEventListener("click", () => {
        audio.pause();
        playButton.style.display = "block";
        pauseButton.style.display = "none";
      });
      let fsc = () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        }
      };
      document.addEventListener("click", fsc);
      //change opacity of #main to opacity-20 after 5 seconds of no interaction like mousemovement or touch event, and change back to opacity-100 on interaction
      let darken = () => {
        document.querySelector("#main").classList.remove("opacity-100");
        document.querySelector("#main").classList.add("opacity-20");
        document.querySelector("#music").classList.add("hidden");
      };
      let brighten = () => {
        document.querySelector("#main").classList.remove("opacity-20");
        document.querySelector("#main").classList.add("opacity-100");
        document.querySelector("#music").classList.remove("hidden");
      };
      let noInteraction = setTimeout(darken, 5000);
      let timer = () => {
        clearTimeout(noInteraction);
        brighten();
        noInteraction = setTimeout(darken, 5000);
      };
      document.addEventListener("mousemove", timer);
      document.addEventListener("touchstart", timer);
      return () => {
        audio.pause();
        playButton.style.display = "block";
        pauseButton.style.display = "none";
        document.removeEventListener("click", fsc);
        document.removeEventListener("touchstart", fsc);
        document.removeEventListener("mousemove", timer);
        document.removeEventListener("touchstart", timer);
      };
    }
  }, [globalThis.window]);

  useEffect(() => {
    if (globalThis?.window) {
      let progress = document.querySelector("#progress");
      let interval = setInterval(() => {
        progress.style.width = `${
          (window?.audio?.currentTime / window?.audio?.duration) * 100
        }%`;
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [globalThis?.window?.audio?.duration]);
  return (
    <>
      <Head>
        <title>Always On Display</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <div className="flex min-h-screen bg-black opacity-100" id="main">
        <h1
          className="m-auto text-center text-white text-8xl"
          style={{
            fontFamily: ["Nothing", "sans-serif"],
          }}
        >
          <span ref={hour}></span>
          <br className="md:hidden" />
          <span className="inline-block pt-2 rotate-90 md:rotate-0 md:pt-0 md:px-4">
            :
          </span>
          <br className="md:hidden" />
          <span ref={minute}></span>
        </h1>
        <div className="absolute bottom-2 w-full hidden" id="music">
          <div className="flex md:max-w-md mx-auto justify-center">
            <img
              id="albumArt"
              className="w-12 h-12 mr-1 rounded-md opacity-75 hidden"
            />
            <div className="block ml-1">
              <p
                id="songName"
                className="text-white/70 text-lg md:text-md font-bold"
              ></p>
              <p id="artist" className="text-white/30 text-sm md:text-xs"></p>
              <div className="flex">
                <div className="w-32 h-1 bg-white/10 place-self-center mr-2 rounded-lg">
                  <div
                    id="progress"
                    className="bg-purple-700 h-1"
                    style={{ width: "0%" }}
                  ></div>
                </div>
                <button id="play" className="text-white/70">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                    />
                  </svg>
                </button>
                <button
                  id="pause"
                  className="text-white/70"
                  style={{ display: "none" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
