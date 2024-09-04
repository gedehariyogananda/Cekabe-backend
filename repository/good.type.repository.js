import prisma from '../lib/prisma.js';

class GoodTypeRepository {
    async getAllGoodType(){
        return await prisma.goods_types.findMany({
            where: {
                status: "Active"
            },
            select: {
                goods_type_id: true,
                goods_type: true
            }
        });
    }
}

const goodTypeRepository = new GoodTypeRepository();
export { goodTypeRepository };