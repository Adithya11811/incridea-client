import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { AiFillSound, AiOutlineSound } from "react-icons/ai";
import { GiSoundOff, GiSoundOn } from "react-icons/gi";
import Button from "../button";
import Modal from "../modal";
import styles from "./audioPlayer.module.css";
// Adjust the path accordingly

interface AudioPlayerProps {
  mainTheme: string;
  isMuted: boolean;
  setIsMuted: Dispatch<SetStateAction<boolean>>;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  mainTheme,
  isMuted,
  setIsMuted,
}) => {
  const mainThemeAudioRef = useRef<HTMLAudioElement | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [modal, setModal] = useState<boolean>(true);

  const handleTogglePlayback = () => {
    if (mainThemeAudioRef.current) {
      if (!hasInteracted) {
        setHasInteracted(true);
      }
      mainThemeAudioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  function handleYes() {
    if (mainThemeAudioRef.current) {
      if (!hasInteracted) {
        setHasInteracted(true);
      }
      mainThemeAudioRef.current.muted = false;
      setIsMuted(false);
      setModal(false);
    }
  }

  function handleNo() {
    if (mainThemeAudioRef.current) {
      if (!hasInteracted) {
        setHasInteracted(true);
      }
      mainThemeAudioRef.current.muted = true;
      setIsMuted(true);
      setModal(false);
    }
  }

  const [volume, setVolume] = useState(30);
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(event.target.value);
    setVolume(newVolume);

    if (mainThemeAudioRef.current) {
      mainThemeAudioRef.current.volume = newVolume / 100;
    }
  };

  useEffect(() => {
    if (mainThemeAudioRef.current && hasInteracted) {
      mainThemeAudioRef.current.play();
      mainThemeAudioRef.current.volume = volume / 100;
    }
  }, [hasInteracted]);

  return (
    <div className={"sticky h-0 top-20 z-[60]"}>
      <audio ref={mainThemeAudioRef} loop muted={isMuted} autoPlay playsInline>
        <source src={mainTheme} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <button
        onClick={handleTogglePlayback}
        className={styles["audio-player-button"]}
      >
        {isMuted && (
          <AiOutlineSound className="w-8 h-8 transition-colors duration-150" />
        )}
        {!isMuted && (
          <AiFillSound className="w-8 h-8 transition-colors duration-150" />
        )}
      </button>
      <div className={styles["audio-player-volume"]}>
        <label htmlFor="volumeSlider"></label>
        <input
          id="volumeSlider"
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="w-28"
        />
      </div>
      <Modal
        size="small"
        title="Do you want audio?"
        showModal={modal}
        onClose={() => setModal(false)}
      >
        <div className="flex justify-center gap-x-4 py-4">
          <Button
            size={"small"}
            onClick={() => {
              handleYes();
            }}
          >
            Yes
          </Button>

          <Button size={"small"} onClick={() => handleNo()}>
            No
          </Button>
        </div>
      </Modal>
    </div>
    // </div>
  );
};

export default AudioPlayer;
