import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MatchRoundSignup } from './match_round_signup.model';
import { Match } from './match.model';
import { MatchRound } from './match_round.model';
import { User } from '../users/user.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class MatchService {
  constructor(
    @InjectModel(MatchRoundSignup)
    private matchRoundSignupModel: typeof MatchRoundSignup,
    @InjectModel(MatchRound)
    private matchRoundModel: typeof MatchRound,
    @InjectModel(Match)
    private matchModel: typeof Match,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async join(email: string): Promise<string> {
    const user = await this.findUserByEmail(email);
    if (user == null || user.id == null) {
      throw new BadRequestException('User not found');
    }
    const matchRound = await this.findOrCreateActiveMatchRound();
    const matchRoundSignup = await this.createMatchRoundSignup(
      user.id,
      matchRound.id,
    );
    if (matchRoundSignup == null || matchRoundSignup.id == null) {
      throw new BadRequestException('Database error');
    }
    return 'ok';
  }

  async assign(): Promise<any> {
    const matchRound = await this.findActiveMatchRound();
    if (matchRound == null || matchRound.id == null) {
      throw new BadRequestException('User match not found');
    }
    const signedUp = await this.findSignedUpMatchesByRoundId(matchRound.id);
    if (signedUp == null) {
      throw new BadRequestException('User match not found');
    }
    const signedUpIds = signedUp.map((e) => e.uid);
    shuffleIds(signedUpIds);
    const signedUpIds2 = signedUpIds.splice((signedUpIds.length + 1) / 2);
    const pairIds = signedUpIds.map((e, idx) => {
      return [e, signedUpIds2[idx] ?? null];
    });
    try {
      return await this.createMatches(matchRound.id, pairIds);
    } finally {
      await this.endMatchRound(matchRound);
    }
  }

  async view(email: string): Promise<any> {
    const user = await this.findUserByEmail(email);
    if (user == null || user.id == null) {
      throw new BadRequestException('User not found');
    }
    const matchRound = await this.findLastActiveMatchRound();
    if (matchRound == null || matchRound.id == null) {
      throw new BadRequestException('User match not found');
    }
    const matches = await this.findMatchesByRoundId(matchRound.id);
    if (matches == null) {
      throw new BadRequestException('User match not found');
    }
    const match = matches.find((val) => {
      return val.uid1 === user.id || val.uid2 === user.id;
    });
    if (match == null) {
      throw new BadRequestException('User match not found');
    }
    const matchedUserId = match.uid1 === user.id ? match.uid2 : match.uid1;
    const matchedUser =
      matchedUserId == null ? null : await this.findUserById(matchedUserId);
    return matchedUser == null
      ? 'No match found'
      : {
          name: matchedUser.name,
          id: matchedUser.id,
          email: matchedUser.email,
        };
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      return await this.userModel.findOne({
        where: {
          email: email,
        },
      });
    } catch (e) {
      console.error(e);
      throw new BadRequestException('Database error');
    }
  }

  async findUserById(id: number): Promise<User | null> {
    try {
      return await this.userModel.findOne({
        where: {
          id: id,
        },
      });
    } catch (e) {
      console.error(e);
      throw new BadRequestException('Database error');
    }
  }

  async findActiveMatchRound() {
    try {
      return await this.matchRoundModel.findOne({
        where: {
          end_time: null,
        },
      });
    } catch (e) {
      console.error(e);
      throw new BadRequestException('Database error');
    }
  }

  async findLastActiveMatchRound() {
    try {
      const lastActiveMatchTime = await this.matchRoundModel.findOne({
        attributes: [
          [Sequelize.fn('MAX', Sequelize.col('end_time')), 'end_time'],
        ],
      });
      return await this.matchRoundModel.findOne({
        where: {
          end_time: lastActiveMatchTime?.end_time,
        },
      });
    } catch (e) {
      console.error(e);
      throw new BadRequestException('Database error');
    }
  }

  async findMatchesByRoundId(matchRoundId: number) {
    try {
      return await this.matchModel.findAll({
        where: {
          round_id: matchRoundId,
        },
      });
    } catch (e) {
      console.error(e);
      throw new BadRequestException('Database error');
    }
  }

  async findOrCreateActiveMatchRound() {
    let matchRound = await this.findActiveMatchRound();
    if (matchRound == null || matchRound.id == null) {
      try {
        matchRound = await this.matchRoundModel.create({
          start_time: new Date(),
          end_time: null,
        });
      } catch (e) {
        console.error(e);
        throw new BadRequestException('Database error');
      }
      if (matchRound == null || matchRound.id == null) {
        throw new BadRequestException('Database error');
      }
    }
    return matchRound;
  }

  async endMatchRound(matchRound: MatchRound) {
    try {
      return await matchRound.update({
        end_time: new Date(),
      });
    } catch (e) {
      console.error(e);
      throw new BadRequestException('Database error');
    }
  }

  async createMatches(roundId: number, uids: number[][]) {
    try {
      return await this.matchModel.bulkCreate(
        uids.map((element) => {
          return { round_id: roundId, uid1: element[0], uid2: element[1] };
        }),
      );
    } catch (e) {
      console.error(e);
      throw new BadRequestException('Database error');
    }
  }

  async createMatchRoundSignup(uid: number, roundId: number) {
    try {
      return await this.matchRoundSignupModel.create({
        uid: uid,
        round_id: roundId,
      });
    } catch (e) {
      console.error(e);
      throw new BadRequestException('Database error');
    }
  }

  async findSignedUpMatchesByRoundId(roundId: number) {
    try {
      return await this.matchRoundSignupModel.findAll({
        where: {
          round_id: roundId,
        },
      });
    } catch (e) {
      console.error(e);
      throw new BadRequestException('Database error');
    }
  }
}

function shuffleIds(ids: number[]) {
  let currentIndex = ids.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [ids[currentIndex], ids[randomIndex]] = [
      ids[randomIndex],
      ids[currentIndex],
    ];
  }
}
