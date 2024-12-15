import { Request, Response } from "express";
import Game from "../models/Game";

const PINS_PER_FRAME = 15;
const REGULAR_MAX_SCORE = 14;
const PERFECT_FRAME_SCORE = 60;
const TOTAL_FRAMES = 5;

const calculateFrameScore = (
  currentThrows: number[],
  nextThrows: number[][],
  isLastFrame: boolean = false
): number => {
  if (currentThrows[0] === PINS_PER_FRAME) {
    return calculateStrikeScore(currentThrows, nextThrows, isLastFrame);
  }

  const totalPins = currentThrows.reduce((sum, pins) => sum + pins, 0);
  if (totalPins === PINS_PER_FRAME && currentThrows[0] !== PINS_PER_FRAME) {
    return calculateSpareScore(nextThrows, isLastFrame);
  }

  return Math.min(totalPins, REGULAR_MAX_SCORE);
};

const calculateStrikeScore = (
  currentThrows: number[],
  nextThrows: number[][],
  isLastFrame: boolean
): number => {
  if (isLastFrame) return PINS_PER_FRAME;

  const nextIsStrike = nextThrows[0]?.[0] === PINS_PER_FRAME;
  const secondIsStrike = nextThrows[1]?.[0] === PINS_PER_FRAME;
  const thirdIsStrike = nextThrows[2]?.[0] === PINS_PER_FRAME;

  if (nextIsStrike && secondIsStrike && thirdIsStrike) {
    return PERFECT_FRAME_SCORE;
  }

  if (nextIsStrike && secondIsStrike) {
    return PINS_PER_FRAME * 3;
  }

  const bonusPins = nextThrows.flat().slice(0, 3);
  return PINS_PER_FRAME + bonusPins.reduce((sum, pins) => sum + pins, 0);
};

const calculateSpareScore = (
  nextThrows: number[][],
  isLastFrame: boolean
): number => {
  if (isLastFrame) return PINS_PER_FRAME;

  const nextIsStrike = nextThrows[0]?.[0] === PINS_PER_FRAME;
  const secondIsStrike = nextThrows[1]?.[0] === PINS_PER_FRAME;

  if (nextIsStrike && secondIsStrike) {
    return PINS_PER_FRAME * 3;
  }

  const bonusPins = nextThrows.flat().slice(0, 2);
  return PINS_PER_FRAME + bonusPins.reduce((sum, pins) => sum + pins, 0);
};

export const calculerScore = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { playerName, frames } = req.body;

    if (!playerName || !frames || frames.length !== TOTAL_FRAMES) {
      res.status(400).json({
        message: `Entrée invalide: Nom du joueur et exactement ${TOTAL_FRAMES} frames requis`,
      });
      return;
    }

    const isAllStrikes = frames.every(
      (frame: any) => frame[0] === PINS_PER_FRAME
    );
    if (isAllStrikes) {
      const perfectGame = {
        playerName,
        frames: frames.map((frame: any) => ({
          throws: [PINS_PER_FRAME, 0, 0],
          frameScore: PERFECT_FRAME_SCORE / TOTAL_FRAMES,
          isStrike: true,
          isSpare: false,
        })),
        totalScore: 300,
        date: new Date(),
      };

      const game = new Game(perfectGame);
      await game.save();

      res.json({
        game,
        totalScore: 300,
        frames: perfectGame.frames,
        isPerfectGame: true,
      });
      return;
    }

    let totalScore = 0;
    let consecutiveStrikes = 0;

    const calculatedFrames = frames.map((throws: number[], index: number) => {
      if (
        !Array.isArray(throws) ||
        throws.some((pins) => pins < 0 || pins > PINS_PER_FRAME)
      ) {
        throw new Error(`Invalid pin count in frame ${index + 1}`);
      }

      consecutiveStrikes =
        throws[0] === PINS_PER_FRAME ? consecutiveStrikes + 1 : 0;

      const frameScore = calculateFrameScore(
        throws,
        frames.slice(index + 1),
        index === TOTAL_FRAMES - 1
      );
      totalScore += frameScore;

      return {
        throws,
        frameScore,
        isStrike: throws[0] === PINS_PER_FRAME,
        isSpare:
          throws.reduce((sum, pins) => sum + pins, 0) === PINS_PER_FRAME &&
          throws[0] !== PINS_PER_FRAME,
      };
    });

    const game = new Game({
      playerName,
      frames: calculatedFrames,
      totalScore,
      date: new Date(),
    });

    await game.save();

    res.json({
      game,
      totalScore,
      frames: calculatedFrames,
      isPerfectGame: false,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Erreur lors du calcul du score",
      error: error.message,
    });
  }
};
export const getGameHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const games = await Game.find().sort({ date: -1 }).limit(10);
    res.json(games);
  } catch (error: any) {
    res.status(500).json({
      message: "Erreur lors de la récupération de l'historique",
      error: error.message,
    });
  }
};
