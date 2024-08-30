import prisma from "../lib/prisma.js";
import { isValidDateFormat } from '../utils/date_format_utils.js';

export const getDateFormat = async () => {
    const formatDateFromDb = await prisma.date_formats.findFirst({
        where: {
            type: 'format_selected',
        }
    });

    const format = formatDateFromDb ? formatDateFromDb.format : process.env.DEFAULT_FORMAT_DATE;

    if (!isValidDateFormat(format)) {
        throw new Error("Invalid date format in database");
    }

    return format;
};
