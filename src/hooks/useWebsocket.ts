import { useCallback, useEffect, useRef, createContext } from "react";
import { w3cwebsocket } from "websocket";

import { Packet } from "../serverTypes";

export type UseWebSocket<T> = {
  send: (msg: T) => void;
};

export function useWebsocket<T>({
  url,
  onOpen = () => null,
  onRecv = () => null,
}: {
  url: string;
  onOpen?: () => void;
  onRecv?: (msg: T) => void;
}): UseWebSocket<T> {
  const client = useRef<w3cwebsocket>();

  useEffect(() => {
    if (url && !client.current) {
      client.current = new w3cwebsocket(url);
      client.current.onopen = () => {
        console.log("WS connected");
        onOpen();
      };
      client.current.onmessage = (msg) => {
        console.log(`WS msg: ${msg.data}`);
        if (msg.data instanceof Blob) {
          msg.data.text().then((t) => console.log(t));
        } else {
          onRecv(JSON.parse(msg.data.toString()));
        }
      };
    }
  }, [url, onOpen, onRecv]);

  const send = useCallback((m: T) => {
    if (client.current?.readyState === w3cwebsocket.OPEN) {
      client.current.send(JSON.stringify(m));
    } else {
      console.log("WS not connected; not sending msg");
    }
  }, []);

  return {
    send,
  };
}

/*
export function useAF1Websocket<T extends Message>({
  url,
  onOpen = () => null,
  onRecv = () => null,
}: {
  url: string;
  onOpen?: () => void;
  onRecv?: (msg: T) => void;
}) {
  const ws = useRef<{ send: (m: T) => void }>();

  ws.current = useWebsocket<T>({ url, onOpen, onRecv });

  return ws.current;
}
*/

export const GlobalWebsocketContext = createContext({
  send: (m: Packet) => {},
});
