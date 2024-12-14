import mongoose, { Schema, Document } from "mongoose";

interface IFrame {
  rolls: number[];
  score: number;
  isStrike: boolean;
  isSpare: boolean;
}

export interface IGame extends Document {
  playerName: string;
  frames: IFrame[];
  totalScore: number;
  date: Date;
}

const FrameSchema = new Schema({
  rolls: [Number],
  score: Number,
  isStrike: Boolean,
  isSpare: Boolean,
});

const GameSchema = new Schema({
  playerName: { type: String, required: true },
  frames: [
    {
      rolls: {
        type: [Number],
        validate: {
          validator: function (rolls: number[]) {
            return rolls.every((roll) => roll >= 0 && roll <= 15);
          },
          message: "Each roll must be between 0 and 15 pins",
        },
      },
      score: Number,
      isStrike: Boolean,
      isSpare: Boolean,
    },
  ],
  totalScore: {
    type: Number,
    default: 0,
    max: 300, // Maximum possible score
  },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IGame>("Game", GameSchema);
