import { Request, Response } from "express";
import Game from "../models/Game";

const calculateFrameScore = (
  rolls: number[],
  nextRolls: number[] = [],
  isLastFrame: boolean = false
): number => {
  const totalPins = rolls.reduce((sum, roll) => sum + roll, 0);

  // Last frame special handling
  if (isLastFrame) {
    if (rolls[0] === 15) {
      // Strike
      return 15 + nextRolls.slice(0, 3).reduce((sum, roll) => sum + roll, 0);
    }
    if (totalPins === 15) {
      // Spare
      return 15 + nextRolls.slice(0, 2).reduce((sum, roll) => sum + roll, 0);
    }
    return Math.min(totalPins, 14); // Regular frame
  }

  // Strike (15 + next 3 rolls)
  if (rolls[0] === 15) {
    const nextThreeRolls = nextRolls.slice(0, 3);
    const bonusScore = nextThreeRolls.reduce((sum, roll) => sum + roll, 0);
    return 15 + bonusScore; // Maximum possible: 60 (15 + 15 + 15 + 15)
  }

  // Spare (15 + next 2 rolls)
  if (totalPins === 15) {
    const nextTwoRolls = nextRolls.slice(0, 2);
    const bonusScore = nextTwoRolls.reduce((sum, roll) => sum + roll, 0);
    return 15 + bonusScore; // Maximum possible: 45 (15 + 15 + 15)
  }

  // Regular frame (sum of pins, max 14)
  return Math.min(totalPins, 14);
};

export const calculateScore = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { playerName, frames } = req.body;

    // if (!frames || frames.length !== 5) {
    //   res.status(400).json({ message: "Invalid frames data" });
    //   return;
    // }

    let totalScore = 0;
    const processedFrames = frames.map((frame: number[], index: number) => {
      const isLastFrame = index === 4;
      const nextRolls = frames.slice(index + 1).flat();

      // Handle last frame bonus rolls
      let frameRolls = [...frame];
      if (isLastFrame) {
        if (frame[0] === 15) {
          // Strike in last frame - allow up to 4 rolls
          frameRolls = frame.slice(0, 4);
        } else if (frame.reduce((sum, roll) => sum + roll, 0) === 15) {
          // Spare in last frame - allow up to 4 rolls
          frameRolls = frame.slice(0, 4);
        } else {
          frameRolls = frame.slice(0, 3);
        }
      }

      const frameScore = calculateFrameScore(
        frameRolls,
        nextRolls,
        isLastFrame
      );
      totalScore += frameScore;

      return {
        rolls: frameRolls,
        score: frameScore,
        isStrike: frameRolls[0] === 15,
        isSpare:
          frameRolls.reduce((sum, roll) => sum + roll, 0) === 15 &&
          frameRolls[0] !== 15,
      };
    });

    // Perfect game validation (300 points)
    const isPerfectGame = totalScore === 300;

    const game = new Game({
      playerName,
      frames: processedFrames,
      totalScore,
      isPerfectGame,
    });

    await game.save();

    res.json({
      game,
      totalScore,
      frames: processedFrames,
      isPerfectGame,
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getGameHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const games = await Game.find().sort({ date: -1 });
    res.json(games);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
