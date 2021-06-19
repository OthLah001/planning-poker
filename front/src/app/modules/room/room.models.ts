export interface IRoom {
  id: string;
  name: string;
  creationDate: IFirebaseDate;
  participants: IParticipant[];
  scrumMaster: string;
  isClosed: boolean;
  rounds: IRound[];
  votingSystemId: string;
}

export interface IParticipant {
  id: string;
  name: string;
  joinDate: IFirebaseDate;
}

export interface IRound {
  roomId: string;
  votes: IVote[];
  creationDate: IFirebaseDate;
}

export interface IVote {
  participantId: string;
  point: string;
  votingDate: IFirebaseDate;
}

export interface IFirebaseDate { // Firebase Date type -_-
  nanoseconds: number;
  seconds: number;
}
