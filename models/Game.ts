import mongoose, { Schema, Document } from "mongoose";

interface IFrame {
  throws: number[];
  frameScore: number;
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
  throws: [Number],
  frameScore: Number,
  isStrike: Boolean,
  isSpare: Boolean,
});

const GameSchema = new Schema({
  playerName: { type: String, required: true },
  frames: [
    {
      throws: {
        type: [Number],
        validate: {
          validator: function (pins: number[]) {
            return pins.every((pin) => pin >= 0 && pin <= 15);
          },
          message: "Chaque lancer doit abattre entre 0 et 15 quilles",
        },
      },
      frameScore: Number,
      isStrike: Boolean,
      isSpare: Boolean,
    },
  ],
  totalScore: {
    type: Number,
    default: 0,
    max: 300,
  },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IGame>("Game", GameSchema);
