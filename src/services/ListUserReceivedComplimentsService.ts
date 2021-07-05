import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "./repositories/ComplimentsRepositories";

class ListUserReceivedComplimentsService {
  async execute(user_id: string) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);

    const compliments = await complimentsRepositories.findOne({
      where: {
        user_receiver: user_id,
      },
    });

    return compliments;
  }
}

export { ListUserReceivedComplimentsService };