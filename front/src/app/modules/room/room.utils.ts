import { IVote } from 'src/app/modules/room/room.models';

export const calculateStatics = (votes: IVote[]) => {
  const pointsVote: { [key: string]: number } = {};

  for (const vote of votes) {
    Object.keys(pointsVote).includes(`${vote.point}`) ? pointsVote[`${vote.point}`] += 1 : pointsVote[`${vote.point}`] = 1;
  }

  Object.keys(pointsVote).map(point => {
    pointsVote[`${point}`] = (pointsVote[`${point}`]/votes.length) * 100;
    return point;
  })

  return pointsVote;
};
