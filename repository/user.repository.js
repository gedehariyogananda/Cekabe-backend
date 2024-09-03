import prisma from '../lib/prisma.js';

class UserRepository {
    async getRolesUser(id){
        return prisma.role_user.findFirst({
            where: {
                user_id: id
            },
            select: {
                role_id: true
            }
        });
    }
}

const userRepository = new UserRepository();
export { userRepository };