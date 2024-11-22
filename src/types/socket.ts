import { Socket } from 'socket.io-client';
import { ChatDataType, IMessage, messageType } from './chat';

export interface ServerToClientEvents {
  basicEmit: (a: number, b: string, c: Buffer) => void;
  error: (error: Error) => void;
  message: (f: ChatDataType[]) => void;
}

export type ClientSocketType = Socket<ServerToClientEvents>;
