// @ts-nocheck
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect, useRef } from "react";

type Props = {
  roomId: string;
  userId: string;
  userName: string;
  appId: number;
  serverSecret: string;
};

export default function CallPage({ roomId, userId, userName, appId, serverSecret }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      roomId,
      userId,
      userName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: containerRef.current,
      sharedLinks: [
        {
          name: "Copy Link",
          url: window.location.href,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
      showScreenSharingButton: true,
      turnOnCameraWhenJoining: true,
      turnOnMicrophoneWhenJoining: true,
      showTextChat: true,
      showUserList: true,
      layout: "Auto",
    });
  }, [roomId, userId, userName, appId, serverSecret]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "linear-gradient(135deg, #1e293b, #0f172a, #044568ff)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        overflow: "hidden",
      }}
    >
      <div
        ref={containerRef}
        style={{
          width: "90%",
          height: "90vh",
          borderRadius: "20px",
          backgroundColor: "rgba(255, 252, 252, 0.3)",
          boxShadow: "0 0 30px rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(10px)",
        }}
      />
    </div>
  );
}
