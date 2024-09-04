import { ZodError } from 'zod'; // Pastikan ZodError diimport

export const validate = (schema, request) => {
    try {
        schema.parse(request); // Ini akan melemparkan error jika validasi gagal
        return {}; // Kembalikan objek kosong jika tidak ada error
    } catch (error) {
        if (error instanceof ZodError) {
            return { error }; // Kembalikan error jika validasi gagal
        }
        throw error; // Lemparkan error lain jika ada
    }
};

export default validate; //