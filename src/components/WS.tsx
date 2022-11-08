import { useEffect, useRef } from "react";
import { w3cwebsocket, w3cwebsocket as W3CWebSocket } from "websocket";

export default function WS({ url }: { url: string }) {
  const client = useRef<w3cwebsocket>();

  useEffect(() => {
    if (url && !client.current) {
      client.current = new W3CWebSocket(url);
      client.current.onopen = () => {
        console.log("WS connected");
        client.current?.send("test");
      };
      client.current.onmessage = (msg) => {
        console.log(`WS msg: ${msg}`);
      };
    }
  }, [url]);

  return <></>;
}
