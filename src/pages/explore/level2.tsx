import React, { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { getProject } from "@theatre/core";
// import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import { SheetProvider, editable as e, PerspectiveCamera } from "@theatre/r3f";
// import dynamic from "next/dynamic";
import { ScrollControls } from "@react-three/drei";
// import { Scene1 } from "@/src/components/scene/scene1";
import scene1 from "../../../public/assets/3d/state4.json";
import studio from "@theatre/studio";
import dynamic from "next/dynamic";
import useStore from "@/src/components/store/store";
import BookModal from "@/src/components/explore/BookModal";
import Pokedex from "@/src/components/pokedex";
import {
  PublishedEventsDocument,
  PublishedEventsQuery,
} from "@/src/generated/generated";
import { client } from "@/src/lib/apollo";
import { useQuery } from "@apollo/client";
import ExploreNav from "@/src/components/explore/exploreNav";

const Scene1 = dynamic(() => import("@/src/components/scene/scene1"), {
  ssr: false,
});

// studio.extend(extension);
// studio.initialize();

const demoSheet = getProject("Scene 1", { state: scene1 }).sheet("Scene 1");
const App = () => {
  const {
    data: eventsData,
    loading: eventLoading,
    error: eventError,
  } = useQuery<PublishedEventsQuery>(PublishedEventsDocument);

  let tempFilteredEvents = eventsData?.publishedEvents;

  tempFilteredEvents = tempFilteredEvents?.filter(
    (event) => event.category === "CORE"
  );

  const events: Array<{ id: string; name: string; image: string }> =
    tempFilteredEvents?.map((event) => ({
      id: event.id,
      name: event.name || "",
      image: event.image || "",
    })) || [];

  const modalRef = useRef(null);
  const sponsorBookRef = useRef(null);
  const eventDex = useStore((state) => state.eventDex);
  const sponsor = useStore((state) => state.sponsor);
  // useEffect(() => {
  //   demoSheet.project.ready.then(() =>
  //     demoSheet.sequence.play({ iterationCount: Infinity, range: [0, 1] })
  //   );
  // }, []);

  return (
    <div className="w-full h-screen">
      <ExploreNav />
      <Suspense>
        <Canvas
          gl={{
            preserveDrawingBuffer: true,
          }}
          className="z-50"
        >
          <SheetProvider sheet={demoSheet}>
            <color attach={"background"} args={["#87CEEB"]} />
            <ScrollControls pages={6} damping={0.5}>
              <>
                <e.group theatreKey="cameraContainer" position={[0, 10, 0]}>
                  <PerspectiveCamera
                    theatreKey="Camera"
                    makeDefault
                    position={[0, 0, 0]}
                    rotation={[0.3, Math.PI, 0]}
                    fov={50}
                    near={0.1}
                    far={100}
                  />
                </e.group>
                <ambientLight intensity={0.5} />
                <fog attach={"fog"} args={["#87CEEB", 0.1, 100]} />
                <directionalLight
                  color={"#fff490"}
                  position={[0, 100, -100]}
                  intensity={0.5}
                />
                <Scene1 />
              </>
            </ScrollControls>
          </SheetProvider>
        </Canvas>
      </Suspense>
      <div className="" ref={modalRef}>
        {eventDex && <Pokedex data={events} />}
      </div>
      <div className="" ref={sponsorBookRef}>
        {sponsor && <BookModal />}
      </div>
    </div>
  );
};

export default App;
